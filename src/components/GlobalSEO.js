import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://saudeepadhikari.com.np';

/**
 * GlobalSEO
 * ---------
 * Renders primary meta tags and structured data for the whole site.
 * Sits near the top of the React tree so that all child sections
 * inherit correct defaults and can override per-section tags via
 * their own <SectionSeo /> usage.
 */
const GlobalSEO = () => {
    return (
        <Helmet>
            {/* Identity defaults — individual <Helmet> in sections can override */}
            <html lang="en" />
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            <meta name="theme-color" content="#030712" />
            <meta name="color-scheme" content="dark" />

            {/* Author / owner */}
            <meta name="author" content="Saudeep Adhikari" />
            <meta name="language" content="English" />
            <meta name="geo.region" content="NP" />
            <meta name="geo.placename" content="Nepal" />

            {/* Open Graph defaults */}
            <meta property="og:site_name" content="Saudeep Adhikari — Portfolio" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={SITE_URL} />
            <meta property="og:locale" content="en_US" />

            {/* Twitter defaults */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@saudeepadhikari" />
            <meta name="twitter:creator" content="@saudeepadhikari" />

            {/* Verification placeholders (replace with your real codes after registering) */}
            {/* <meta name="google-site-verification" content="YOUR_CODE" /> */}
            {/* <meta name="msvalidate.01" content="YOUR_BING_CODE" /> */}

            {/* Global Person JSON-LD (re-affirmed client-side as a safety net) */}
            <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Person',
                    name: 'Saudeep Adhikari',
                    alternateName: ['Saudeep', 'Saaudeep', 'Saudeep Adhikari'],
                    url: SITE_URL,
                    image: `${SITE_URL}/assets/profile.jpg`,
                    jobTitle: 'Full Stack Web Developer',
                    description:
                        'Saudeep Adhikari is a Full Stack Web Developer and Designer from Nepal specializing in React, Node.js, MongoDB, and modern web technologies.',
                    email: 'mailto:saudeepadhikari543@gmail.com',
                    address: {
                        '@type': 'PostalAddress',
                        addressCountry: 'NP',
                        addressLocality: 'Nepal',
                    },
                    knowsAbout: [
                        'JavaScript',
                        'React',
                        'Node.js',
                        'MongoDB',
                        'MySQL',
                        'HTML5',
                        'CSS3',
                        'Tailwind CSS',
                        'Full Stack Development',
                        'Web Design',
                        'Figma',
                    ],
                    sameAs: [
                        'https://github.com/SaudeepAdhikari',
                        'https://www.linkedin.com/in/saudeep-adhikari-b558aa2a8/',
                        'https://www.facebook.com/saudeep.adhikariking',
                        'https://www.instagram.com/saudeep.adhikari/',
                    ],
                    worksFor: { '@type': 'Organization', name: 'Freelance' },
                })}
            </script>
        </Helmet>
    );
};

export default GlobalSEO;
