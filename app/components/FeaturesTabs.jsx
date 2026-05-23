'use client';

import Link from 'next/link';
import { useState } from 'react';

const FEATURES = [
  {
    label: 'Light Control & Privacy',
    imgText: 'LIGHT CONTROL',
    heading: 'Exceptional Light Control & Refined Privacy',
    body: 'Viento blinds are crafted to give you complete mastery over light — from soft ambient glow to full brightness or total blackout, tailored to your preference. As you curate the perfect atmosphere, your privacy remains effortlessly protected with premium fabrics designed to conceal while elevating the elegance of your space.',
  },
  {
    label: 'Premium Durability',
    imgText: 'MATERIAL',
    heading: 'Premium Material Integrity',
    body: 'Viento blinds are meticulously engineered using high-grade components and finely selected fabrics, ensuring exceptional strength and longevity. From precision-crafted mechanisms to resilient slats and advanced textile weaves, every element is designed to withstand daily use with ease. Resistant to fading, warping, and wear, they retain their refined appearance and flawless performance across seasons — delivering lasting beauty with uncompromising reliability.',
  },
  {
    label: 'Energy Efficiency',
    imgText: 'ENERGY',
    heading: 'Intelligent Insulation & Energy Efficiency',
    body: 'Viento blinds are designed to enhance more than just light — they elevate the comfort of your space. Crafted with advanced fabric technologies, they help minimise heat ingress during warmer months while preserving indoor warmth in cooler seasons. This natural insulation not only creates a consistently comfortable environment but also contributes to improved energy efficiency, allowing your space to feel refined, balanced, and effortlessly efficient all year round.',
  },
  {
    label: 'UV Protection',
    imgText: 'UV PROTECT',
    heading: 'UV Protection & Fade Resistance',
    body: 'Viento blinds block harmful UV rays while preserving the richness of your interiors. Fade-resistant fabrics protect your furniture, flooring, and décor — keeping your space vibrant and refined for years to come.',
  },
  {
    label: 'Smart Automation',
    imgText: 'SMART HOME',
    heading: 'Smart Automation Compatibility',
    body: 'Viento blinds are designed to integrate seamlessly with leading smart home systems, offering effortless control over light and privacy. Adjust your blinds with a simple voice command, a tap on your smartphone, or through automated schedules tailored to your routine. Create personalised scenes, operate them remotely, and enjoy a space that adapts intelligently to your lifestyle — delivering elevated comfort, convenience, and modern sophistication.',
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
            <Link className="btn-outline-light" href="/contact">
              Get a Free Quote →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
