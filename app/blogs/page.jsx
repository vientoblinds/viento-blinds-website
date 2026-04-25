import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogs } from '../../lib/blogs';

export const metadata = {
  title: 'Our Blog | Viento Blinds',
  description:
    'Inspiration, guides, and trends from the world of premium window treatments.',
};

export default function BlogsPage() {
  const [featured, ...rest] = blogs;
  return (
    <>
      <Navbar />
      <div className="page active">
        <div className="blogs-page-hero">
          <span className="section-label">Viento Insights</span>
          <h2 className="section-title">Our Blog</h2>
          <p className="section-subtitle">
            Inspiration, guides, and trends from the world of premium window treatments.
          </p>
        </div>
        <div className="blogs-page-grid">
          <Link
            href={`/blog/${featured.slug}`}
            className="blog-card blog-card-featured"
          >
            <div
              className="blog-card-img"
              style={{
                backgroundImage: `url('${featured.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div
              className="blog-card-body"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <span className="blog-card-date">
                {featured.date} · {featured.category}
              </span>
              <h3 className="blog-card-title">{featured.title}</h3>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'rgba(245,240,232,0.5)',
                  lineHeight: 1.7,
                  marginBottom: '1.2rem',
                }}
              >
                {featured.excerpt}
              </p>
              <span
                className="blog-card-link"
                style={{ color: 'rgba(245,240,232,0.5)' }}
              >
                Read Full Article →
              </span>
            </div>
          </Link>
          {rest.map((b) => (
            <Link key={b.slug} href={`/blog/${b.slug}`} className="blog-card">
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
        <Footer variant="compact" />
      </div>
    </>
  );
}
