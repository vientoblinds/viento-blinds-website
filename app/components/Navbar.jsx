'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { products } from '../../lib/products';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const bar = document.getElementById('scrollProgress');
      if (!bar) return;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      bar.style.width = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 + '%' : '0%';
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress" id="scrollProgress" />
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/assets/viento-logo.jpg" alt="Viento Blinds Logo" style={{ height: 32 }} />
          VIENTO BLINDS
        </Link>
        <ul
          className="nav-links"
          data-open={mobileOpen ? 'true' : undefined}
          style={
            mobileOpen
              ? {
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'fixed',
                  top: 72,
                  left: 0,
                  right: 0,
                  background: 'var(--warm-white)',
                  padding: '2rem',
                  borderTop: '1px solid var(--border)',
                  zIndex: 999,
                  gap: '1.5rem',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                }
              : undefined
          }
        >
          <li>
            <Link href="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
          </li>
          <li className="has-dropdown">
            <span className="nav-btn">Products ▾</span>
            <div className="dropdown-menu">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="dropdown-item"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="di-img img-placeholder" style={{ height: 55 }}>
                    {p.name.split(' ')[0].slice(0, 4).toUpperCase()}
                  </div>
                  <span>{p.name}</span>
                </Link>
              ))}
            </div>
          </li>
          <li>
            <Link href="/legacy?page=about" onClick={() => setMobileOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link href="/legacy?page=blogs" onClick={() => setMobileOpen(false)}>
              Blogs
            </Link>
          </li>
          <li>
            <Link
              href="/legacy?page=contact"
              className="nav-cta"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </Link>
          </li>
        </ul>
        <button
          className="hamburger"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </>
  );
}
