import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'About Viento | Our Story',
  description:
    "Founded in 2015, Viento is one of India's most trusted premium blinds brands. Learn about our craftsmanship, values, and process.",
};

const VALUES = [
  {
    num: '01',
    title: 'Craftsmanship',
    desc: 'Every blind is hand-finished by skilled artisans who have spent years mastering their craft. No shortcuts. No compromises.',
  },
  {
    num: '02',
    title: 'Sustainability',
    desc: 'We source responsibly and design for longevity. Our materials are chosen not just for beauty, but for their environmental footprint.',
  },
  {
    num: '03',
    title: 'Innovation',
    desc: "From smart-home integration to our proprietary weaving techniques, we're always seeking better ways to serve your living space.",
  },
  {
    num: '04',
    title: 'Precision',
    desc: 'Measured to the millimeter. Our installation team ensures every blind fits and functions exactly as designed — no gaps, no guesswork.',
  },
  {
    num: '05',
    title: 'Service',
    desc: "Our relationship with you doesn't end at installation. We offer lifetime support, regular maintenance, and a dedicated after-sales team.",
  },
  {
    num: '06',
    title: 'Elegance',
    desc: 'Design that endures. We create pieces that feel at home in any interior — from contemporary urban lofts to traditional heritage spaces.',
  },
];

const PROCESS = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'We visit your space, understand your needs, and recommend the perfect solutions.',
  },
  {
    num: '02',
    title: 'Measurement',
    desc: 'Precision measurements taken by our expert team for a perfect custom fit.',
  },
  {
    num: '03',
    title: 'Fabrication',
    desc: 'Handcrafted in our facility using the finest materials and rigorous QC checks.',
  },
  {
    num: '04',
    title: 'Installation',
    desc: 'Professional installation with zero-damage promise and post-install walkthrough.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="page active">
        <div className="about-hero">
          <div>
            <span className="section-label">Our Story</span>
            <h1>
              Crafting <em>Light</em>,<br />
              Framing <em>Life</em>
            </h1>
          </div>
        </div>

        <div className="about-content">
          <div className="about-grid">
            <div className="about-img-block">
              <div 
                className="about-main-img" 
                style={{ background: "url('/assets/founder.jpeg') top center / cover no-repeat" }}
              />
              <div className="about-accent-img img-placeholder img-placeholder-light">
                CRAFTSMANSHIP
              </div>
            </div>
            <div className="about-text-block">
              <span className="section-label">Who We Are</span>
              <h2 className="section-title">More Than Just Blinds</h2>
              <div className="divider" />
              <p>
                Founded in 2001, Viento was born from the visionary ambition of Mr. Sameer Jain -
                to redefine how light shapes and elevates living spaces. What began as a modest
                workshop in Mumbai has evolved into one of India's most trusted names in premium
                window solutions.
              </p>
              <p>
                In its early years, Viento specialized in importing high-quality fabrics to craft
                finely made blinds. As the brand grew, so did its commitment to excellence and
                innovation, leading to the establishment of a state-of-the-art manufacturing
                facility in GIDC, Gujarat - where Viento began producing its own superior fabrics
                with precision and control.
              </p>
              <p>
                At its core, Viento is a design-led window solutions brand, specializing in premium
                blinds that seamlessly blend functionality with refined aesthetics. From zebra
                blinds and roller systems to blackout and exterior solutions, we curate and
                manufacture products that enhance light control, privacy, and comfort - while
                elevating the overall character of a space. Every detail, from fabric selection to
                mechanism engineering, is thoughtfully considered to deliver a sophisticated and
                lasting experience.
              </p>
              <p>
                Mr. Sameer Jain was more than a founder - he was a guiding force who inspired and
                mentored countless professionals. His strategic foresight and relentless pursuit of
                innovation propelled Viento to new heights, leaving behind a legacy defined by
                excellence, resilience, and forward-thinking.
              </p>
              <p>
                He didn't just start a business - he built something he genuinely loved. Blinds
                were never just a product to him; they were a passion and a purpose - a way to bring
                beauty, comfort, and intention into people's homes. Every texture was chosen with
                care, every fitting perfected with pride, and every customer treated with utmost
                importance. To him, each fabric held the potential to transform a space, elevate a
                moment, and simply feel right - and that belief continues to shape the way we work
                today.
              </p>
              <p>
                We remain forever indebted to his vision, his values, and the foundation he so
                passionately built. Every milestone we achieve stands as a reflection of his
                dedication and unwavering belief in excellence. His spirit lives in every detail we
                create, every space we transform, and every experience we deliver.
              </p>
              <p>
                Today, that legacy continues to guide us forward. As we look ahead, we remain deeply
                grateful and committed to building a future that reflects his vision - timeless,
                refined, and enduring.
              </p>
              <Link className="btn-primary" href="/contact">
                Work With Us →
              </Link>
            </div>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-num">
              5000<sup style={{ fontSize: '1.5rem' }}>+</sup>
            </span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">10</span>
            <span className="stat-label">Years of Excellence</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">8</span>
            <span className="stat-label">Product Lines</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">98%</span>
            <span className="stat-label">Customer Satisfaction</span>
          </div>
        </div>

        <section className="section" style={{ background: 'var(--cream)' }}>
          <span className="section-label">Our Foundation</span>
          <h2 className="section-title">What We Stand For</h2>
          <p className="section-subtitle">
            Our values are the threads that weave through every blind we craft.
          </p>
          <div className="values-grid" style={{ marginTop: '3.5rem' }}>
            {VALUES.map((v) => (
              <div key={v.num} className="value-card">
                <div className="value-num">{v.num}</div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" style={{ background: 'var(--warm-white)' }}>
          <span className="section-label">How It Works</span>
          <h2 className="section-title">Our Process</h2>
          <div className="divider" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 0,
              marginTop: '3rem',
              border: '1px solid var(--border)',
            }}
          >
            {PROCESS.map((p, i) => (
              <div
                key={p.num}
                style={{
                  padding: '2.5rem',
                  borderRight:
                    i < PROCESS.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: '3rem',
                    color: 'var(--gold)',
                    opacity: 0.3,
                  }}
                >
                  {p.num}
                </div>
                <h4
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: '1.2rem',
                    margin: '0.8rem 0',
                  }}
                >
                  {p.title}
                </h4>
                <p
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--muted)',
                    lineHeight: 1.7,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Footer variant="compact" />
      </div>
    </>
  );
}
