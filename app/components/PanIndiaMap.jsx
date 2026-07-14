'use client';

import { useEffect, useRef, useState } from 'react';

// Pin tips measured on the original 1254x1254 map, as % of image size.
const PINS = [
  { id: 'delhi', x: 36.84, y: 26.48 },
  { id: 'west-bengal', x: 67.54, y: 49.04 },
  { id: 'surat', x: 21.29, y: 51.75 },
  { id: 'jalgaon', x: 30.62, y: 56.7 },
  { id: 'mumbai', x: 19.78, y: 60.45 },
  { id: 'pune', x: 22.97, y: 64.59 },
  { id: 'bangalore', x: 31.34, y: 79.9 },
];

export default function PanIndiaMap() {
  const wrapRef = useRef(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={`india-map-wrap${live ? ' pins-live' : ''}`}>
      <img
        src="/assets/Map-nopins.jpeg"
        alt="Viento Pan India Distributors Map"
        style={{ width: '100%', display: 'block' }}
      />
      {PINS.map((pin, i) => (
        <span
          key={pin.id}
          className="map-pin"
          style={{ left: `${pin.x}%`, top: `${pin.y}%`, '--pin-delay': `${0.15 + i * 0.14}s` }}
        >
          <span className="map-pin-shadow" />
          <svg className="map-pin-svg" viewBox="0 0 24 36" aria-hidden="true">
            <path
              d="M12 0C5.4 0 0 5.4 0 12c0 8.8 12 24 12 24s12-15.2 12-24C24 5.4 18.6 0 12 0z"
              fill="#c42d28"
            />
            <circle cx="12" cy="11.5" r="4.6" fill="#fdf6ee" />
          </svg>
        </span>
      ))}
    </div>
  );
}
