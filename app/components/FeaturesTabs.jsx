'use client';

import Link from 'next/link';
import { useState } from 'react';

const FEATURES = [
  {
    label: 'Light Control & Privacy',
    imgText: 'LIGHT CONTROL',
    heading: 'Superior Light Control & Privacy',
    body: 'Viento blinds offer precise control over how light enters your space — whether you want brightness, softness, or complete blackout. And while you shape the mood, your privacy stays protected with fabrics designed to shield without compromising style.',
  },
  {
    label: 'Premium Durability',
    imgText: 'MATERIAL',
    heading: 'Premium Material Durability',
    body: "Crafted from high-quality, tested materials, Viento blinds are built to last. Our fabrics resist fading, warping, and wear — ensuring they stay as beautiful and functional as the day they're installed, even with daily use and changing seasons.",
  },
  {
    label: 'Energy Efficiency',
    imgText: 'ENERGY',
    heading: 'Energy Efficiency & Insulation',
    body: 'Viento blinds do more than control light — they help regulate temperature too. By reducing heat gain in summer and retaining warmth in winter, our fabrics improve insulation and lower energy costs, making your space more comfortable year-round.',
  },
  {
    label: 'UV Protection',
    imgText: 'UV PROTECT',
    heading: 'UV Protection & Fade Resistance',
    body: 'Viento blinds are designed to block harmful UV rays, protecting your interiors from sun damage. Our fade-resistant fabrics help preserve the color and quality of your furniture, flooring, and décor so your space stays vibrant, longer.',
  },
  {
    label: 'Smart Automation',
    imgText: 'SMART HOME',
    heading: 'Smart Automation Compatibility',
    body: 'Viento blinds integrate seamlessly with leading smart home systems, allowing you to control light and privacy with a simple voice command or tap. Set schedules, automate scenes, and adjust your blinds remotely for comfort, convenience, and modern living at its finest.',
  },
];

export default function FeaturesTabs() {
  const [active, setActive] = useState(0);
  const f = FEATURES[active];
  return (
    <div className="features-tabs">
      <div className="features-nav">
        {FEATURES.map((feat, i) => (
          <div
            key={feat.label}
            className={'feature-tab' + (i === active ? ' active' : '')}
            onClick={() => setActive(i)}
          >
            <span className="feature-tab-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="feature-tab-title">{feat.label}</span>
          </div>
        ))}
      </div>
      <div className="features-content">
        <div className="feature-panel active">
          <div className="feature-panel-img img-placeholder">{f.imgText}</div>
          <div className="feature-panel-text">
            <h3>{f.heading}</h3>
            <p>{f.body}</p>
            <Link className="btn-outline-light" href="/legacy?page=contact">
              Get a Free Quote →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
