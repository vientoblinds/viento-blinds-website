import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BackLink from '../../components/BackLink';
import { zebraFamilies } from '../../../lib/zebraFamilies';

export const metadata = {
  title: 'Zebra Blinds | Viento Blinds',
  description:
    'Explore Viento Zebra Blind families by light control, texture, colour, and room fit.',
};

export default function ZebraBlindsPage() {
  const featured = zebraFamilies[0];

  return (
    <>
      <Navbar />
      <div className="page active">
        <section className="zebra-hub">
          <div className="zebra-hero-copy">
            <BackLink fallback="/products">← Back</BackLink>
            <span className="section-label">Zebra Studio</span>
            <h1>Zebra Blinds</h1>
            <p>
              Instead of a single flat product page, this studio helps customers compare the zebra
              families by mood, opacity, texture, and best room fit. Each option opens into a
              focused collection page, so the category can scale without making the navigation feel
              heavy.
            </p>
            <div className="zebra-stats">
              <div>
                <strong>08</strong>
                <span>families</span>
              </div>
              <div>
                <strong>60+</strong>
                <span>colourways</span>
              </div>
              <div>
                <strong>01</strong>
                <span>guided path</span>
              </div>
            </div>
          </div>
          <div className="zebra-preview" aria-hidden="true">
            <div className="zebra-window">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="zebra-preview-note">
              <span>{featured.name}</span>
              <small>{featured.subtitle}</small>
            </div>
          </div>
        </section>

        <section className="zebra-browser">
          <div className="zebra-browser-head">
            <div>
              <span className="section-label">Choose by use case</span>
              <h2 className="section-title">Find the right stripe story</h2>
            </div>
            <Link className="btn-outline" href="/contact">
              Request Swatches →
            </Link>
          </div>

          <div className="zebra-family-grid">
            {zebraFamilies.map((family, index) => (
              <Link
                key={family.slug}
                href={`/products/zebra-blinds/${family.slug}`}
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
                <div
                  className="zebra-family-sample"
                  style={
                    family.image
                      ? { background: `url('${family.image}') center / cover no-repeat` }
                      : {}
                  }
                />
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
                  <span className="zebra-card-link">Open Collection →</span>
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
