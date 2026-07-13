import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BackLink from '../../components/BackLink';
import CatalogueTabs from '../../components/CatalogueTabs';
import FlatSwatches from '../../components/FlatSwatches';
import { getAllSlugs, getProductBySlug, getRelatedProducts } from '../../../lib/products';

const HONEYCOMB_SHADES = [
  { color: '#A9AB98', title: 'Sage', img: '/assets/honeycomb-color-picker1.jpeg' },
  { color: '#5C4C3E', title: 'Espresso', img: '/assets/honeycomb-color-picker2.jpeg' },
  { color: '#B0A28E', title: 'Taupe', img: '/assets/honeycomb-color-picker3.jpeg' },
  { color: '#EDE2C9', title: 'Vanilla Cream', img: '/assets/honeycomb-color-picker4.jpeg' },
];

const TRIPLESHADE_SHADES = [
  { color: '#E4D9BE', title: 'Floral Gold', img: '/assets/Tripleshade-color-picker1.png' },
];

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found | Viento' };
  return {
    title: `${product.name} | Viento Blinds`,
    description: product.subtitle,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, 4);

  return (
    <>
      <Navbar />
      <div className="page active">
        <div className="pd-hero">
          <div className="pd-hero-text">
            <BackLink fallback="/products">← Back</BackLink>
            <h1>{product.name}</h1>
            <p>{product.subtitle}</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <Link className="btn-primary" href="/contact">
                Request a Quote
              </Link>
              <a className="btn-primary" href={`/catalogs/${product.slug}.pdf`} download>
                Download Catalog
              </a>
            </div>
          </div>
          {product.image ? (
            <div className="pd-hero-img">
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div className="pd-hero-img img-placeholder">{product.name.toUpperCase()}</div>
          )}
        </div>

        <div className="pd-details">
          <div>
            <span className="section-label">Product Features</span>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>
              Why This Collection?
            </h2>
            <div className="divider" />
            <ul className="pd-feature-list">
              {product.features.map((feat) => (
                <li key={feat}>{feat}</li>
              ))}
            </ul>
            <div
              style={{
                marginTop: '2rem',
                padding: '2rem',
                background: 'var(--cream)',
                border: '1px solid var(--border)',
              }}
            >
              <span className="section-label" style={{ marginBottom: '0.5rem' }}>
                Technical Specs
              </span>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.8rem 2rem',
                  marginTop: '1rem',
                }}
              >
                {Object.entries(product.specs).map(([label, value]) => (
                  <div key={label}>
                    <p
                      style={{
                        fontSize: '0.6rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--muted)',
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--charcoal)',
                        marginTop: '0.2rem',
                      }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {(product.catalogues || product.slug === 'wooden-blinds' || product.slug === 'honeycomb-blinds' || product.slug === 'shangri-la-blinds') && (
            <div>
              <span className="section-label">Available Colours</span>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>
                Choose Your Shade
              </h2>
              <div className="divider" />
              {product.catalogues ? (
                <CatalogueTabs catalogues={product.catalogues} />
              ) : (
                <FlatSwatches
                  shades={
                    product.slug === 'honeycomb-blinds'
                      ? HONEYCOMB_SHADES
                      : product.slug === 'shangri-la-blinds'
                      ? TRIPLESHADE_SHADES
                      : undefined
                  }
                />
              )}
              <p
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--muted)',
                  marginTop: '1rem',
                  lineHeight: 1.7,
                }}
              >
                All colours available as samples. Request physical swatches to see the true finish in
                your light conditions.
              </p>
            </div>
          )}
        </div>

        <section className="section" style={{ paddingTop: '3rem' }}>
          <span className="section-label">In Real Homes</span>
          <h2 className="section-title" style={{ fontSize: '2rem' }}>
            Customer Images
          </h2>
          <div className="divider" />
          <p className="section-subtitle">
            Real {product.name.toLowerCase()} installations from our clients.
          </p>
          <div className="customer-images-grid">
            {(product.customerImages?.length
              ? product.customerImages
              : [null, null, null, null]
            ).map((img, i) => (
              <div key={i} className="customer-image-item">
                {img ? (
                  img.src.endsWith('.mp4') ? (
                    <video
                      src={img.src}
                      controls
                      playsInline
                      preload="metadata"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <img
                      src={img.src}
                      alt={img.alt || `${product.name} installation ${i + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )
                ) : (
                  <div
                    className="img-placeholder"
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                    }}
                  >
                    PHOTO COMING SOON
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="section" style={{ background: 'var(--cream)', paddingTop: '3rem' }}>
          <span className="section-label">Explore More</span>
          <h2 className="section-title" style={{ fontSize: '1.8rem' }}>
            Related Products
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5px',
              marginTop: '2.5rem',
            }}
          >
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="product-card"
                style={{ aspectRatio: '3/4' }}
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="product-card-img"
                    style={{ height: '100%' }}
                  />
                ) : (
                  <div
                    className="product-card-img img-placeholder"
                    style={{ height: '100%' }}
                  >
                    {p.name.toUpperCase()}
                  </div>
                )}
                <div className="product-card-info">
                  <h3>{p.name}</h3>
                  <div className="explore-link">Explore ↗</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Footer variant="compact" />
      </div>
    </>
  );
}
