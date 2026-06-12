import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BackLink from '../../components/BackLink';
import ImageCarousel from '../../components/ImageCarousel';
import { rollerFamilies } from '../../../lib/rollerFamilies';

export const metadata = {
  title: 'Roller Blinds | Viento Blinds',
  description:
    'Explore Viento Roller Blind families by light control, texture, colour, and room fit.',
};

export default function RollerBlindsPage() {
  const featured = rollerFamilies[0];

  return (
    <>
      <Navbar />
      <div className="page active">
        <section className="zebra-hub">
          <div className="zebra-hero-copy">
            <BackLink fallback="/products">← Back</BackLink>
            <span className="section-label">Roller Studio</span>
            <h1>Roller Blinds</h1>
            <p>
              <strong>Contemporary Style. Exceptional Comfort.</strong><br /><br />
              Discover a curated collection of Roller Blinds designed to balance privacy, light, and aesthetics bringing sophistication to every room.
            </p>
            <div className="zebra-stats">
              <div>
                <strong>05</strong>
                <span>premium collections</span>
              </div>
              <div>
                <strong>90+</strong>
                <span>colorways</span>
              </div>
              <div>
                <strong>10000+</strong>
                <span>windows transformed</span>
              </div>
            </div>
          </div>
          <div className="zebra-preview" aria-hidden="true">
            <div 
              className="zebra-window"
              style={{
                background: "url('/assets/rollermain.jpeg') top / cover no-repeat",
                border: "1px solid rgba(245, 240, 232, 0.32)"
              }}
            />
            <div className="zebra-preview-note">
              <span>{featured.name}</span>
            </div>
          </div>
        </section>

        <section className="zebra-browser">
          <div className="zebra-browser-head">
            <div>
              <span className="section-label">Choose by use case</span>
              <h2 className="section-title">Find your roller story</h2>
            </div>
            <Link className="btn-outline" href="/contact">
              Request Swatches →
            </Link>
          </div>

          <div className="zebra-family-grid">
            {rollerFamilies.map((family, index) => (
              <div
                key={family.slug}
                className="zebra-family-card"
                style={
                  family.image
                    ? {}
                    : {
                        '--zebra-a': family.colors[0],
                        '--zebra-b': family.colors[1],
                        '--zebra-c': family.colors[2],
                        '--zebra-d': family.colors[3],
                      }
                }
              >
                {family.images ? (
                  <div className="zebra-family-sample" style={{ padding: 0, background: 'none' }}>
                    <ImageCarousel images={family.images} />
                  </div>
                ) : (
                  <div
                    className="zebra-family-sample"
                    style={
                      family.image
                        ? { background: `url('${family.image}') center / cover no-repeat` }
                        : {}
                    }
                  />
                )}
                <div className="zebra-family-content">
                  <span className="zebra-family-code">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{family.name}</h3>
                  <p>{family.subtitle}</p>
                  <div className="zebra-fit-grid">
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
                  {family.catalog && (
                    <a 
                      href={family.catalog} 
                      className="btn-outline" 
                      style={{ marginTop: '1.5rem', display: 'inline-block' }}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      Download Catalog
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer variant="compact" />
      </div>
    </>
  );
}
