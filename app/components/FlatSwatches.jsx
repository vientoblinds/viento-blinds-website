'use client';

import { useState } from 'react';

const DEFAULT_SHADES = [
  { cls: 'swatch-w1', title: 'Natural', img: '/assets/Woodenshade1.png' },
  { cls: 'swatch-w2', title: 'Honey Oak', img: '/assets/Woodenshade2.png' },
  { cls: 'swatch-w3', title: 'Walnut', img: '/assets/Woodenshade3.png' },
  { cls: 'swatch-w4', title: 'Ebony', img: '/assets/Woodenshade4.png' },
  { cls: 'swatch-w5', title: 'Gilded', img: '/assets/Woodenshade5.png' },
  { cls: 'swatch-w6', title: 'Washed', img: '/assets/woodenshade6.png' },
];

export default function FlatSwatches({ shades = DEFAULT_SHADES, aspectRatio = '16/10', fit = 'cover' }) {
  const [active, setActive] = useState(0);
  const current = shades[active];

  return (
    <div>
      <div
        style={{
          width: '100%',
          aspectRatio,
          background: 'var(--cream)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          marginBottom: '1rem',
        }}
      >
        <img
          src={current.img}
          alt={current.title}
          style={{ width: '100%', height: '100%', objectFit: fit, display: 'block' }}
        />
      </div>
      <p
        style={{
          fontSize: '0.72rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '0.75rem',
        }}
      >
        {current.title}
      </p>
      <div className="color-swatches">
        {shades.map((s, i) => (
          <div
            key={s.title}
            className={`swatch ${s.cls || ''}` + (active === i ? ' active' : '')}
            style={s.color ? { background: s.color } : undefined}
            title={s.title}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}
