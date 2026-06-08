SEO Checklist & Next Steps

- Verify ownership in Google Search Console and add the `google-site-verification` meta tag in `public/index.html` or use DNS verification.
- Verify ownership in Bing Webmaster Tools (add `msvalidate.01` meta tag).
- Create a high-quality Open Graph image (`public/assets/og-image.png`) sized 1200x630 and a square favicon/logo variants. Update `public/index.html` OG/Twitter image paths if needed.
- Submit `https://<your-domain>/sitemap.xml` to Google Search Console and Bing.
- In Google Search Console: request indexing after deployment and monitor Coverage & Performance reports for keywords like "Saudeep" and "Saudeep Adhikari".
- Ensure social profiles (`sameAs`) are accurate and link back to your site.
- Use the `react-snap` prerendered `build` output for deployment to static hosts (Cloudflare Pages, Netlify, Vercel static, GitHub Pages).
- Consider migrating to an SSG framework (Next.js) for stronger long-term SEO if you need per-page SSR.
- Monitor and fix accessibility and performance issues flagged by Lighthouse — fast page loads and good UX help SEO.

Quick deploy reminder:

- Build locally: `npm run build`
- Deploy `build/` directory to your hosting provider.

Resources:

- Google Search Console: https://search.google.com/search-console
- Sitemap spec: https://www.sitemaps.org/protocol.html
- Structured data testing: https://search.google.com/test/rich-results

If you want, I can:

- Add `google-site-verification` and `msvalidate.01` placeholders to `public/index.html` now.
- Create a minimal OG image using an automated template.
- Set up a CI/CD workflow to auto-deploy and ping Search Console.
