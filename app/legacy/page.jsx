import fs from 'node:fs';
import path from 'node:path';
import Script from 'next/script';
import LegacyNavigator from './LegacyNavigator';

export const metadata = {
  title: 'Viento | Premium Blinds',
  description: 'Premium window blinds crafted for modern homes.',
};

export default async function LegacyPage({ searchParams }) {
  const params = await searchParams;
  const initialPage = typeof params?.page === 'string' ? params.page : 'home';
  const initialData = typeof params?.data === 'string' ? params.data : null;

  const bodyContentPath = path.join(process.cwd(), 'content/home-body.html');
  const bodyContent = fs.readFileSync(bodyContentPath, 'utf8');

  return (
    <>
      <main dangerouslySetInnerHTML={{ __html: bodyContent }} />
      <Script src="/js/main.js" strategy="afterInteractive" />
      <LegacyNavigator page={initialPage} data={initialData} />
    </>
  );
}
