import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products } from '../../lib/products';

export const metadata = {
  title: 'All Products | Viento Blinds',
  description:
    'Eight distinct blind collections, each engineered for a specific mood, function, and aesthetic.',
};

export default function AllProductsPage() {
  return (
    <>
      <Navbar />
      <div className="page active">
        <div className="all-products-hero">
          <span className="section-label">Full Collection</span>
          <h2 className="section-title">All Products</h2>
          <p
            className="section-subtitle"
            style={{ color: 'rgba(245,240,232,0.45)' }}
          >
            Eight distinct collections, each engineered for a specific mood, function, and
            aesthetic.
          </p>
        </div>
        <div className="all-products-grid">
          {products.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="product-card">
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
        <Footer variant="compact" />
      </div>
    </>
  );
}
