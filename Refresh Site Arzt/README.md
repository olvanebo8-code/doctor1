# Refresh Site Arzt

A German-language, responsive website template for a medical practice. It is a static site with reusable content in config.js, the Site Refresh logo, locally stored photos, an accessible mobile menu, service cards, opening hours, legal pages, and an appointment request that opens the visitor's email client. Photo source and license notes are in assets/IMAGE-CREDITS.md.

## Run locally

- Open index.html directly, or run npm start with Node.js 18 or newer and visit http://localhost:4173.
- No package installation or third-party front-end service is required.

## Customize for a practice

1. Update config.js with the practice name, responsible physician, exact qualifications, address, verified services, contact details, opening hours, chamber, authority, and professional rules. Add a tax identifier only when applicable.
2. Replace all sample data and review each service description for factual accuracy and applicable professional rules.
3. Complete impressum.html and datenschutz.html for the actual operator, host, mail provider, retention, legal bases, and any required data-protection contact.
4. Update the SEO title and descriptions in index.html, then add a canonical URL and sitemap URL for the chosen domain.
5. Confirm that the actual practice phone and email work. The appointment form opens a prefilled email draft; the visitor must send it in their email application. No symptoms or diagnoses are requested or stored by the page.

## Static publishing

The workflow in .github/workflows/pages.yml publishes the folder contents to GitHub Pages after a push to main. Enable GitHub Pages with GitHub Actions as its build and deployment source in the repository settings.

## Data protection and medical advertising

The sample avoids outcome guarantees, patient testimonials, before-and-after images, external font requests, embedded maps, tracking scripts, and nonessential cookies. The privacy and imprint pages are starting points, not a legal determination. Each practice must check its actual content and data processing before publication.

Reference texts: [DDG § 5](https://www.gesetze-im-internet.de/ddg/__5.html), [HWG § 3](https://www.gesetze-im-internet.de/heilmwerbg/__3.html), [HWG § 11](https://www.gesetze-im-internet.de/heilmwerbg/__11.html), and the [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=de).
