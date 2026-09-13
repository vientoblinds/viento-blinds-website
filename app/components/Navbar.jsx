'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { products } from '../../lib/products';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const closeAll = useCallback(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleMobile = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    if (!next) setProductsOpen(false);
    document.body.style.overflow = next ? 'hidden' : '';
  };

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

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" id="scrollProgress" />
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/assets/viento-logo-transparent.png" alt="Viento Blinds Logo" style={{ height: 32 }} />
          VIENTO BLINDS
        </Link>
        <ul className={`nav-links${mobileOpen ? ' open' : ''}`}>
          <li>
            <Link href="/" onClick={closeAll}>Home</Link>
          </li>
          <li className={`has-dropdown${productsOpen ? ' open' : ''}`}>
            <button
              className="nav-btn"
              onClick={(e) => {
                e.preventDefault();
                setProductsOpen((o) => !o);
              }}
              aria-expanded={productsOpen}
            >
              Products ▾
            </button>
            <div className="dropdown-menu">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="dropdown-item"
                  onClick={closeAll}
                >
                  <img src={p.image} alt={p.name} className="di-img" />
                  <span>{p.name}</span>
                </Link>
              ))}
            </div>
          </li>
          <li>
            <Link href="/about" onClick={closeAll}>About</Link>
          </li>
          <li>
            <Link href="/our-factory" onClick={closeAll}>Our Factory</Link>
          </li>
          <li>
            <Link href="/blogs" onClick={closeAll}>Blogs</Link>
          </li>
          <li>
            <Link href="/contact" className="nav-cta" onClick={closeAll}>Contact Us</Link>
          </li>
        </ul>
        <button
          className="hamburger"
          onClick={toggleMobile}
          aria-expanded={mobileOpen}
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
