import { Actor, log } from 'apify';
import { PlaywrightCrawler } from 'crawlee';

await Actor.init();

try {
    const input = await Actor.getInput();
    const { 
        keyword = 'plumber', 
        location = 'Calgary, AB', 
        maxLeads = 100,
        proxyConfiguration 
    } = input || {};

    const proxyConfig = await Actor.createProxyConfiguration(proxyConfiguration || { 
        useApifyProxy: true,
        apifyProxyGroups: ['RESIDENTIAL'],
        apifyProxyCountry: 'CA'
    });

    log.info(`Searching YellowPages Canada for "${keyword}" in "${location}"`);
    await Actor.charge({ eventName: 'apify-actor-start', count: 1 });

    let extractedCount = 0;

    const crawler = new PlaywrightCrawler({
        proxyConfiguration: proxyConfig,
        maxConcurrency: 2,
        navigationTimeoutSecs: 90,
        browserPoolOptions: {
            useFingerprints: true,
        },
        async requestHandler({ page, request, log, enqueueLinks }) {
            log.info(`Parsing directory page: ${request.url}`);
            
            await page.waitForSelector('.listing, .result, .jsListing', { timeout: 30000 }).catch(() => log.warning('Timeout waiting for DOM'));

            const title = await page.title();
            if (title.includes('Attention Required') || title.includes('Just a moment')) {
                throw new Error('Blocked by Cloudflare/WAF. Retrying with residential proxy...');
            }

            const items = await page.$$('.listing, .result, .jsListing');
            
            for (const item of items) {
                if (extractedCount >= maxLeads) break;

                const nameElement = await item.$('.listing__name--link, .jsListingName, h2, .business-name, .listing__title a');
                if (!nameElement) continue;
                const businessName = (await nameElement.innerText()).trim().replace(/^\d+\s*\n+/, '');

                const addressElement = await item.$('.listing__address, .address');
                const address = addressElement ? (await addressElement.innerText()).trim().replace(/\s+/g, ' ').replace(/ Get directions$/i, '') : '';

                // Phones
                const phoneElement = await item.$('.mlr__submenu__item h4, [data-phone], .listing__phone, .phone, a[href^="tel:"]');
                let phone = '';
                if (phoneElement) {
                    phone = await phoneElement.getAttribute('data-phone');
                    if (!phone) {
                        phone = (await phoneElement.innerText()).trim();
                    }
                }

                // Ratings
                const ratingElement = await item.$('.rating__value, .merchant-rating');
                const rating = ratingElement ? (await ratingElement.innerText()).trim() : '';
                
                // Reviews count
                const reviewElement = await item.$('.rating__count, .reviews-count');
                const reviews = reviewElement ? (await reviewElement.innerText()).trim() : '';

                // Services
                const categoriesElement = await item.$('.listing__category, .categories');
                const services = categoriesElement ? (await categoriesElement.innerText()).trim() : keyword;
                
                // Website
                const websiteElement = await item.$('.listing__website a, a.website');
                const website = websiteElement ? await websiteElement.getAttribute('href') : '';
                
                const urlElement = await item.$('a.listing__title, .listing__name a');
                const listingUrl = urlElement ? await urlElement.getAttribute('href') : '';
                const fullListingUrl = listingUrl && !listingUrl.startsWith('http') ? new URL(listingUrl, 'https://www.yellowpages.ca').toString() : listingUrl;

                if (businessName && businessName.length > 1) {
                    const record = {
                        businessName,
                        services,
                        address,
                        phone,
                        website,
                        rating: `${rating} ${reviews}`.trim(),
                        listingUrl: fullListingUrl,
                        scrapedAt: new Date().toISOString()
                    };

                    await Actor.pushData(record);
                    await Actor.charge({ eventName: 'lead-extracted', count: 1 });
                    extractedCount++;
                    log.info(`✅ Extracted: ${businessName} (${extractedCount}/${maxLeads})`);
                }
            }

            // Pagination
            if (extractedCount < maxLeads) {
                const hasNextPage = await page.$('.pageCount .next, a.next, a:has-text("Next")');
                if (hasNextPage) {
                    const nextUrl = await hasNextPage.getAttribute('href');
                    if (nextUrl) {
                        const absoluteUrl = new URL(nextUrl, 'https://www.yellowpages.ca').toString();
                        log.info(`Enqueuing next page: ${absoluteUrl}`);
                        await enqueueLinks({
                            urls: [absoluteUrl],
                        });
                    }
                }
            }
        },
        async failedRequestHandler({ request, log }) {
            log.error(`Failed request: ${request.url}`);
        }
    });

    // Formatting for YP CA: spaces become +
    const formatLocation = location.replace(/\s+/g, '+');
    const startUrl = `https://www.yellowpages.ca/search/si/1/${encodeURIComponent(keyword)}/${formatLocation}`;
    
    await crawler.addRequests([{
        url: startUrl
    }]);

    await crawler.run();

    log.info(`🎉 Done! Extracted ${extractedCount} Canada home services leads.`);

} catch (error) {
    console.error('CRASH:', error);
    throw error;
} finally {
    await Actor.exit();
}
