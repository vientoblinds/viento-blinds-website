import './globals.css';
import Script from 'next/script';
import WhatsAppBubble from './components/WhatsAppBubble';
import { SITE_URL } from '../lib/site';

const GA_ID = 'G-FBY4T4T0ST';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};


export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Viento | Premium Blinds',
  description: 'Premium window blinds crafted for modern homes.',
  applicationName: 'Viento Blinds',
  openGraph: {
    siteName: 'Viento Blinds',
    title: 'Viento | Premium Blinds',
    description: 'Premium window blinds crafted for modern homes.',
    url: SITE_URL,
    type: 'website',
    images: [{ url: '/assets/viento-logo.jpg', width: 1024, height: 1024, alt: 'Viento Blinds' }],
  },
};

// Structured data: Google uses WebSite.name for the site name shown in search results
// and Organization.logo for the brand logo.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Viento Blinds',
      alternateName: ['Viento', 'vientoblinds.com'],
      url: `${SITE_URL}/`,
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Viento Blinds',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/assets/viento-logo-square.png`,
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <WhatsAppBubble />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
