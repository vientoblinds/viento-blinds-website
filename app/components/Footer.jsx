import Link from 'next/link';
import { products } from '../../lib/products';

export default function Footer({ variant = 'full' }) {
  const productLinks = products.slice(0, 6);
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/assets/viento-logo.jpg" alt="Viento Blinds Logo" style={{ height: 32 }} />
            VIENTO BLINDS
          </Link>
          <p className="footer-desc">
            {variant === 'full'
              ? 'Premium window blinds crafted for modern homes. Discover the perfect balance of beauty, function, and innovation.'
              : 'Premium window blinds crafted for modern homes.'}
          </p>
        </div>
        <div>
          <p className="footer-title">Products</p>
          <ul className="footer-links">
            {productLinks.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-title">Company</p>
          <ul className="footer-links">
            <li>
              <Link href="/about">About Viento</Link>
            </li>
            <li>
              <Link href="/our-factory">Our Factory</Link>
            </li>
            <li>
              <Link href="/blogs">Our Blog</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>Privacy Policy</li>
            <li>Sitemap</li>
          </ul>
        </div>
        <div>
          <p className="footer-title">Contact</p>
          <ul className="footer-links">
            <li>artexoverseas.p@gmail.com</li>
            <li>systemwindowinc@gmail.com</li>
            <li>+91 93204 27622</li>
            <li>+91 83691 19423</li>
            <li>Mumbai, India</li>
            <li style={{ marginTop: '1.2rem' }}>
              <a href="https://www.facebook.com/share/1EL6bSH4Jw/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>Facebook</a>
            </li>
            <li>
              <a href="https://www.instagram.com/viento_blinds?igsh=MW1yOG1mNnFqNTkzaw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>Instagram</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/viento-blinds/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>LinkedIn</a>
            </li>
            <li>
              <a href="https://wa.me/919320427622?text=Hi%20Viento%20Blinds%2C%20I%27d%20like%20to%20know%20more%20about%20your%20blinds." target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>WhatsApp</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Viento Blinds. All Rights Reserved.</p>
        <p>Crafted with precision.</p>
      </div>
    </footer>
  );
}
