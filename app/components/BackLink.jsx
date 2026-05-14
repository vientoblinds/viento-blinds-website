'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BackLink({ fallback = '/products', children = '← Back' }) {
  const router = useRouter();

  function handleClick(event) {
    event.preventDefault();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  }

  return (
    <Link className="back-link" href={fallback} onClick={handleClick}>
      {children}
    </Link>
  );
}
