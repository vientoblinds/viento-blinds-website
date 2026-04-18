'use client';

import { useState } from 'react';

const SHADES = [
  { cls: 'swatch-w1', title: 'Natural' },
  { cls: 'swatch-w2', title: 'Honey Oak' },
  { cls: 'swatch-w3', title: 'Walnut' },
  { cls: 'swatch-w4', title: 'Ebony' },
  { cls: 'swatch-w5', title: 'Gilded' },
  { cls: 'swatch-w6', title: 'Washed' },
];

export default function FlatSwatches() {
  const [active, setActive] = useState(0);
  return (
    <div className="color-swatches">
      {SHADES.map((s, i) => (
        <div
          key={s.cls}
          className={`swatch ${s.cls}` + (active === i ? ' active' : '')}
          title={s.title}
          onClick={() => setActive(i)}
        />
      ))}
    </div>
  );
}
