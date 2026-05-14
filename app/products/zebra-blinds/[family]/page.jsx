import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import BackLink from '../../../components/BackLink';
import { getZebraFamilyBySlug, zebraFamilies } from '../../../../lib/zebraFamilies';

export function generateStaticParams() {
  return zebraFamilies.map((family) => ({ family: family.slug }));
}

export async function generateMetadata({ params }) {
  const { family: slug } = await params;
  const family = getZebraFamilyBySlug(slug);
  if (!family) return { title: 'Zebra Collection Not Found | Viento' };
  return {
    title: `${family.name} | Viento Zebra Blinds`,
    description: family.subtitle,
  };
}

export default async function ZebraFamilyPage({ params }) {
  const { family: slug } = await params;
  const family = getZebraFamilyBySlug(slug);
  if (!family) notFound();

  return (
    <>
      <Navbar />
      <div className="page active">
        <div className="pd-hero zebra-detail-hero">
          <div className="pd-hero-text">
            <BackLink fallback="/products/zebra-blinds">← Back</BackLink>
            <span className="section-label">{family.kicker}</span>
            <h1>{family.name}</h1>
            <p>{family.subtitle}</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <Link className="btn-primary" href="/contact">
                Request a Quote
              </Link>
              <Link className="btn-outline-light" href="/products/zebra-blinds">
                Compare Zebra Families
              </Link>
            </div>
          </div>
          <div className="pd-hero-img zebra-detail-sample-wrap">
            <div
              className="zebra-detail-sample"
              style={{
                '--zebra-a': family.colors[0],
                '--zebra-b': family.colors[1],
                '--zebra-c': family.colors[2],
                '--zebra-d': family.colors[3],
              }}
            />
          </div>
        </div>

        <div className="pd-details">
          <div>
            <span className="section-label">Collection Fit</span>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>
              Why This Zebra?
            </h2>
            <div className="divider" />
            <ul className="pd-feature-list">
              <li>{family.kicker} for {family.room.toLowerCase()}</li>
              <li>{family.light} through adjustable sheer and opaque bands</li>
              <li>{family.texture} fabric character</li>
              <li>Works with manual, cordless, or motorised controls</li>
              <li>Made-to-measure with matching cassette options</li>
              <li>Available as physical swatches before order</li>
            </ul>
          </div>
          <div>
            <span className="section-label">Available Colours</span>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>
              Choose Your Shade
            </h2>
            <div className="divider" />
            <div className="zebra-colour-row">
              {family.colors.map((color) => (
                <span key={color} className="swatch" style={{ background: color }} title={color} />
              ))}
            </div>
            <div className="zebra-spec-panel">
              <div>
                <span>Best for</span>
                <strong>{family.room}</strong>
              </div>
              <div>
                <span>Light feel</span>
                <strong>{family.light}</strong>
              </div>
              <div>
                <span>Texture</span>
                <strong>{family.texture}</strong>
              </div>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '1rem', lineHeight: 1.7 }}>
              All colours are directional guides. Request physical swatches to judge the true finish
              in your room lighting.
            </p>
          </div>
        </div>

        <section className="section" style={{ background: 'var(--cream)', paddingTop: '3rem' }}>
          <span className="section-label">Explore More</span>
          <h2 className="section-title" style={{ fontSize: '1.8rem' }}>
            Other Zebra Families
          </h2>
          <div className="zebra-related-grid">
            {zebraFamilies
              .filter((item) => item.slug !== family.slug)
              .slice(0, 4)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/products/zebra-blinds/${item.slug}`}
                  className="zebra-related-card"
                >
                  <span>{item.kicker}</span>
                  <strong>{item.name}</strong>
                </Link>
              ))}
          </div>
        </section>

        <Footer variant="compact" />
      </div>
    </>
  );
}
