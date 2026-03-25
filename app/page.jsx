import fs from 'node:fs';
import path from 'node:path';
import Script from 'next/script';

const bodyContentPath = path.join(process.cwd(), 'content/home-body.html');
const bodyContent = fs.readFileSync(bodyContentPath, 'utf8');

export default function HomePage() {
  return (
    <>
      <main dangerouslySetInnerHTML={{ __html: bodyContent }} />
      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  );
}
