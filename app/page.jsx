import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FeaturesTabs from './components/FeaturesTabs';
import PanIndiaMap from './components/PanIndiaMap';
import { blogs } from '../lib/blogs';

export const metadata = {
  title: 'Viento | Premium Blinds',
  description:
    'Premium window blinds crafted for modern homes. Discover wooden, zebra, roller, and designer blinds from Viento.',
};

const HERO_PANELS = [
  {
    slug: 'wooden-blinds',
    tag: 'Discover Collection',
    title: 'Luxury',
    desc: 'Premium blinds crafted for modern homes, perfected for every mood.',
    img: '/assets/luxary.png?v=20260417-2125',
    alt: 'Luxury by Viento',
  },
  {
    slug: 'zebra-blinds',
    tag: 'Explore Design',
    title: 'Design',
    desc: 'From blackout to sheer, blend privacy and sunlight like never before.',
    img: '/assets/craft.png?v=20260417-2125',
    alt: 'Design by Viento',
  },
  {
    slug: 'shangri-la-blinds',
    tag: 'Fine Craft',
    title: 'Craft',
    desc: "Beauty and function in perfect balance with Viento's designer blinds.",
    img: '/assets/design.png?v=20260417-2125',
    alt: 'Craft by Viento',
  },
];

const HOME_PRODUCTS = [
  { href: '/products/wooden-blinds', img: '/assets/wooden%20blinds.png', alt: 'Wooden Blinds', name: 'Wooden Blinds' },
  { href: '/products/shangri-la-blinds', img: '/assets/tripleshadeblinds.png?v=20260425-1751', alt: 'Shangri-La Blinds', name: 'Shangri-La Blinds' },
  { href: '/products/zebra-blinds', img: '/assets/zebra-blinds.png', alt: 'Zebra Blinds', name: 'Zebra Blinds' },
  { href: '/products/roller-blinds', img: '/assets/Roller-blinds.png?v=20260417-2142', alt: 'Roller Blinds', name: 'Roller Blinds' },
  { href: '/products/exterior-blinds', img: '/assets/exterior-blinds.png?v=20260425-1738', alt: 'Exterior Blinds', name: 'Exterior Blinds' },
  { href: '/products/roman-style-blinds', img: '/assets/Roman.png', alt: 'Roman Blinds', name: 'Roman Blinds' },
];

const BLOGS = blogs.slice(0, 4);

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="page active">
        <section className="hero">
          {HERO_PANELS.map((panel) => (
            <Link key={panel.slug} href={`/products/${panel.slug}`} className="hero-panel">
              <img src={panel.img} alt={panel.alt} className="hero-panel-bg" />
              <div className="hero-panel-content">
                <span className="hero-tag">{panel.tag}</span>
                <h2>{panel.title}</h2>
                <p>{panel.desc}</p>
              </div>
            </Link>
          ))}
          <Link href="/about" className="hero-badge">
            <img
              src="/assets/viento-mark.png"
              alt="Viento"
              style={{ width: '46px', height: 'auto', objectFit: 'contain', marginBottom: '2px' }}
            />
            <span style={{ fontSize: '0.5rem' }}>Est. 2015</span>
          </Link>
        </section>

        <section className="section features-section">
          <span className="section-label">Why Viento</span>
          <h2 className="section-title">Features</h2>
          <p className="section-subtitle">
            Every Viento blind is engineered to deliver superior performance across five essential
            dimensions.
          </p>
          <FeaturesTabs />
        </section>

        <section className="section products-section">
          <div className="products-header">
            <div>
              <span className="section-label">Our Collection</span>
              <h2 className="section-title">Our Products</h2>
            </div>
            <Link className="btn-outline" href="/products">
              View All Products →
            </Link>
          </div>
          <div className="products-grid">
            {HOME_PRODUCTS.map((p) => (
              <Link key={p.name} href={p.href} className="product-card">
                <img src={p.img} alt={p.alt} className="product-card-img" />
                <div className="product-card-info">
                  <h3>{p.name}</h3>
                  <div className="explore-link">Explore ↗</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section factory-video-section">
          <span className="section-label">Inside Viento</span>
          <h2 className="section-title">Our Factory</h2>
          <p className="section-subtitle">
            A quick look at how we design, craft, and finish every blind with precision.
          </p>
          <div className="factory-video-wrap">
            <video autoPlay muted loop controls preload="metadata" playsInline>
              <source src="/assets/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <div className="marquee-section">
          <div className="marquee-track">
            {[
              'Premium Blinds',
              'Wooden Blinds',
              'Zebra Blinds',
              'Honeycomb Blinds',
              'Smart Automation',
              'Custom Fit',
              'Eco Blackout Series',
              'Shangri-La Collection',
            ]
              .concat([
                'Premium Blinds',
                'Wooden Blinds',
                'Zebra Blinds',
                'Honeycomb Blinds',
                'Smart Automation',
                'Custom Fit',
                'Eco Blackout Series',
                'Shangri-La Collection',
              ])
              .map((item, i) => (
                <span key={i} className="marquee-item">
                  {item}
                </span>
              ))}
          </div>
        </div>

        <section className="partners-section" style={{ textAlign: 'center' }}>
          <span className="section-label">Find Us</span>
          <h2 className="section-title" style={{ fontSize: '1.8rem' }}>
            Pan India Distributors
          </h2>
          <PanIndiaMap />
        </section>

        <section className="section blogs-section">
          <div className="blogs-header">
            <div>
              <span className="section-label">Insights</span>
              <h2 className="section-title">Latest Blogs</h2>
            </div>
            <Link className="btn-outline" href="/blogs">
              More Blogs →
            </Link>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
              marginTop: '2rem',
            }}
          >
            {BLOGS.map((b) => (
              <Link
                key={b.slug}
                href={`/blog/${b.slug}`}
                className="blog-card"
              >
                <div
                  className="blog-card-img"
                  style={{
                    backgroundImage: `url('${b.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="blog-card-body">
                  <span className="blog-card-date">{b.date}</span>
                  <h3 className="blog-card-title">{b.title}</h3>
                  <span className="blog-card-link">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
