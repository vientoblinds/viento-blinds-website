'use client';

import { useEffect } from 'react';

export default function LegacyNavigator({ page, data }) {
  useEffect(() => {
    let tries = 0;
    const id = setInterval(() => {
      tries += 1;
      if (typeof window.navigate === 'function') {
        clearInterval(id);
        window.navigate(page, data || undefined);
      } else if (tries > 40) {
        clearInterval(id);
      }
    }, 50);
    return () => clearInterval(id);
  }, [page, data]);
  return null;
}
