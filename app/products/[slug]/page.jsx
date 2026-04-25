import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CatalogueTabs from '../../components/CatalogueTabs';
import FlatSwatches from '../../components/FlatSwatches';
import { getAllSlugs, getProductBySlug, getRelatedProducts } from '../../../lib/products';

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
            <div
              aria-label="Breadcrumb"
              role="navigation"
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '1rem',
              }}
            >
              <Link href="/" style={{ color: 'inherit' }}>
                Home
              </Link>
              {' / '}
              <Link href="/products" style={{ color: 'inherit' }}>
                Products
              </Link>
              {' / '}
              <span style={{ color: 'var(--charcoal)' }}>{product.name}</span>
            </div>
            <Link className="back-link" href="/products">
              ← Back to Products
            </Link>
            <h1>{product.name}</h1>
            <p>{product.subtitle}</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <Link className="btn-primary" href="/contact">
                Request a Quote
              </Link>
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
          </div>
          <div>
            <span className="section-label">Available Colours</span>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>
              Choose Your Shade
            </h2>
            <div className="divider" />
            {product.catalogues ? (
              <CatalogueTabs catalogues={product.catalogues} />
            ) : (
              <FlatSwatches />
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
        </div>

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
