'use client';

import { useState } from 'react';

export default function CatalogueTabs({ catalogues }) {
  const names = Object.keys(catalogues);
  const [active, setActive] = useState(names[0]);
  const [activeSwatch, setActiveSwatch] = useState(null);
  const designs = catalogues[active];

  return (
    <div id="pd-catalogues-container">
      <div className="catalogue-tabs">
        {names.map((name) => (
          <div
            key={name}
            className={'catalogue-tab' + (name === active ? ' active' : '')}
            onClick={() => setActive(name)}
          >
            {name}
          </div>
        ))}
      </div>
      <div>
        {Object.entries(designs).map(([designName, colors]) => (
          <div key={designName} className="catalogue-design-group">
            <h4 className="catalogue-design-title">{designName}</h4>
            <div className="catalogue-swatch-grid">
              {colors.map((color, i) => {
                const key = `${designName}-${i}`;
                return (
                  <div
                    key={key}
                    className={'swatch' + (activeSwatch === key ? ' active' : '')}
                    style={{ background: color }}
                    title={color}
                    onClick={() => setActiveSwatch(key)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
