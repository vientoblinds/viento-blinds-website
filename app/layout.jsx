import './globals.css';
import Script from 'next/script';
import WhatsAppBubble from './components/WhatsAppBubble';

const GA_ID = 'G-FBY4T4T0ST';

export const metadata = {
  title: 'Viento | Premium Blinds',
  description: 'Premium window blinds crafted for modern homes.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
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
