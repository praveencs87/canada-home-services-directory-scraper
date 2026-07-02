# Canada Home Services Directory Scraper

**Extract verified plumbers, electricians, HVAC techs, and home service businesses across Canada.**

The Canada Home Services Directory Scraper extracts highly valuable local B2B leads from top Canadian directories like YellowPages.ca, providing you with verified business names, phone numbers, and ratings.

## What can Canada Home Services Directory Scraper do?

- ✅ **Extract Premium Leads** - Get business names, physical addresses, and direct phone numbers.
- ✅ **Assess Quality** - Scrape star ratings and review counts to target the best contractors.
- ✅ **Extract Services** - Identify specific services offered (e.g., HVAC Repair, Plumber, Roofing).
- ✅ **Export formats** - Download data in JSON, CSV, Excel, or HTML formats.
- ✅ **Integrations** - Connect seamlessly with API, webhooks, Make, or Zapier.
- ✅ **No coding required** - Use our simple interface to start scraping immediately.

## Why scrape Canadian Home Services?

Canadian home services directories contain incredibly valuable data for:

- 🎯 **B2B Suppliers** - Target local trades businesses that need tools, supplies, and vehicles.
- 📊 **Lead Gen Agencies** - Connect with local service providers to sell highly-qualified consumer leads.
- 📍 **Software Providers** - Pitch estimating, CRM, and scheduling software to local tradesmen.

## What data can you extract?

| Data Field | Description | Example |
|------------|-------------|---------|
| **businessName** | The name of the business | "Calgary Fast Plumbing" |
| **services** | Types of services offered | "Plumber, Drain Cleaning" |
| **address** | The full address | "123 Main St, Calgary, AB T2P 1J9" |
| **phone** | Direct contact number | "(403) 123-4567" |
| **rating** | User rating and review count | "5.0 (25 Reviews)" |
| **website** | Company website | "https://www.example.ca" |
| **listingUrl** | Link to the directory listing | "https://www.yellowpages.ca/..." |

## How to scrape Canada Home Services data

1. **Click "Try for free"** to start using the actor.
2. **Enter your input** - Provide a keyword (e.g., "plumber") and location (e.g., "Calgary, AB").
3. **Configure options** - Set the maximum number of leads you want to extract.
4. **Start the scraper** - Click Start and let the actor do the work.
5. **Download results** - Export your leads as JSON, CSV, or Excel.

## Input

Configure the scraper with these key settings:
- **Keyword** - The specific niche (e.g., 'plumber', 'hvac', 'electrician').
- **Location** - The Canadian City, Province (e.g., 'Calgary, AB', 'Montreal, QC').
- **Maximum Leads** - The total number of records to extract.
- **Proxy Configuration** - Apify Residential Proxy (Canada targeted) is highly recommended.

## Output

You can download data in multiple formats:
- **JSON** - For developers and programmatic access
- **CSV** - For easy import into Excel or CRM systems
- **Excel** - Ready-to-use spreadsheet

### Output example

```json
{
    "businessName": "Calgary Fast Plumbing",
    "services": "Plumber",
    "address": "123 Main St, Calgary, AB T2P 1J9",
    "phone": "403-123-4567",
    "website": "https://www.example.ca",
    "rating": "5.0 25 Reviews",
    "listingUrl": "https://www.yellowpages.ca/...",
    "scrapedAt": "2026-07-02T15:00:00Z"
}
```

## How much does it cost?

This actor uses a Pay-Per-Event (PPE) pricing model:
- **Base Fee**: $0.25 per start
- **Lead Fee**: $3.00 per 1,000 home service leads extracted ($0.003 per lead)

**Free tier**: Apify provides $5 in free monthly credits, allowing you to extract over 1,500 premium leads for free!

## Is it legal to scrape?

Yes, scraping publicly available data is generally legal. This Actor only extracts public information.

**Best practices**:
- Use the data ethically for B2B outreach.
- Respect the target site's Terms of Service.
- Ensure compliance with CASL (Canada's Anti-Spam Legislation) when handling contact information.

## Integrations

Connect with 1000+ apps:
- **Google Sheets** - Auto-update spreadsheets with new leads.
- **Slack** - Get notifications when scraping finishes.
- **Webhooks** - Send data directly to your CRM.
- **API** - Programmatic access for developers.

---

**License**: Apache-2.0 | **Version**: 1.0.0
