import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getAllBlogSlugs, getBlogBySlug, getRelatedBlogs } from '../../../lib/blogs';

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return { title: 'Blog Not Found | Viento' };
  return {
    title: `${blog.title} | Viento Blog`,
    description: blog.excerpt,
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  const related = getRelatedBlogs(slug, 3);

  return (
    <>
      <Navbar />
      <div className="page active">
        <div className="blog-detail-hero">
          <div
            className="blog-card-img"
            style={{
              position: 'absolute',
              inset: 0,
              height: '100%',
              opacity: 0.4,
              backgroundImage: `url('${blog.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="blog-detail-hero-content">
            <div
              aria-label="Breadcrumb"
              role="navigation"
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.55)',
                marginBottom: '1rem',
              }}
            >
              <Link href="/" style={{ color: 'inherit' }}>
                Home
              </Link>
              {' / '}
              <Link href="/blogs" style={{ color: 'inherit' }}>
                Blog
              </Link>
              {' / '}
              <span style={{ color: 'var(--gold)' }}>{blog.category}</span>
            </div>
            <span
              id="bd-date"
              className="blog-card-date"
              style={{ color: 'var(--gold)', letterSpacing: '0.2em', fontSize: '0.65rem' }}
            >
              {blog.date} · {blog.category}
            </span>
            <h1 id="bd-title">{blog.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.2rem' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--tan)',
                }}
              />
              <span
                style={{
                  fontSize: '0.72rem',
                  color: 'rgba(245,240,232,0.55)',
                  letterSpacing: '0.08em',
                }}
              >
                By Viento Editorial Team · {blog.readMinutes} min read
              </span>
            </div>
          </div>
        </div>

        <article
          className="blog-detail-body"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div
          className="blog-detail-body"
          style={{
            display: 'flex',
            gap: '1rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
            marginBottom: '3rem',
          }}
        >
          <Link className="btn-primary" href="/blogs">
            ← Back to Blogs
          </Link>
          <Link className="btn-outline" href="/contact">
            Book a Consultation
          </Link>
        </div>

        <section style={{ padding: '2rem 5vw 5rem', background: 'var(--cream)' }}>
          <span className="section-label">Continue Reading</span>
          <h2 className="section-title" style={{ fontSize: '1.8rem' }}>
            Related Articles
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 2,
              marginTop: '2.5rem',
            }}
          >
            {related.map((b) => (
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
        </section>

        <Footer variant="compact" />
      </div>
    </>
  );
}
