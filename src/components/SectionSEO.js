import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://saudeepadhikari.com.np';

/**
 * SectionSEO
 * ----------
 * Lightweight helper used by individual sections to publish a
 * CrawlableSection JSON-LD entry and reinforce semantic keywords
 * for that part of the page.
 *
 * Props:
 *   - name:       Short name (e.g. "Projects")
 *   - description:Plain-text description of the section
 *   - keywords:   Extra keyword string for this section
 */
const SectionSEO = ({ name, description, keywords }) => {
    const id = `section-${name.toLowerCase().replace(/\s+/g, '-')}`;
    const sectionUrl = `${SITE_URL}/#${name.toLowerCase()}`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPageElement',
        name: `${name} — Saudeep Adhikari Portfolio`,
        url: sectionUrl,
        description,
    };

    return (
        <Helmet>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={sectionUrl} />
            <script type="application/ld+json" data-seo-id={id}>
                {JSON.stringify(jsonLd)}
            </script>
        </Helmet>
    );
};

export default SectionSEO;
