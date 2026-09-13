'use client';

import { useRef } from 'react';

export default function ImageCarousel({ images }) {
  const scrollRef = useRef(null);

  const scrollLeft = (e) => {
    e.preventDefault();
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, offsetWidth } = scrollRef.current;
      if (scrollLeft <= 0) {
        // At the beginning, loop to the end
        scrollRef.current.scrollTo({ left: scrollWidth - offsetWidth, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: -offsetWidth, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = (e) => {
    e.preventDefault();
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, offsetWidth } = scrollRef.current;
      // Use a small buffer (5px) for subpixel precision
      if (Math.abs(scrollLeft + offsetWidth - scrollWidth) < 5) {
        // At the end, loop to the beginning
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: offsetWidth, behavior: 'smooth' });
      }
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '100%' }} className="image-carousel">
      <div
        ref={scrollRef}
        className="hide-scrollbar"
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          width: '100%',
          height: '100%',
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            style={{
              flex: '0 0 100%',
              minHeight: '100%',
              scrollSnapAlign: 'start',
              background: `url('${img}') center / cover no-repeat`,
            }}
          />
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={scrollLeft}
            style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              zIndex: 10,
              padding: 0,
            }}
          >
            ←
          </button>
          <button
            onClick={scrollRight}
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              zIndex: 10,
              padding: 0,
            }}
          >
            →
          </button>
          
          <div style={{
            position: 'absolute',
            bottom: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 10,
          }}>
            {images.map((_, i) => (
              <div 
                key={i} 
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.8)',
                  boxShadow: '0 0 3px rgba(0,0,0,0.5)'
                }} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
