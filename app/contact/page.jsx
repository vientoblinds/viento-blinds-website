import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from './ContactForm';

const DISTRIBUTOR_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSc4SaoNrQuKT9VUm8UFPtqcQFlOX2eOueEndG38rd5wwFcmBA/viewform';
const CAREERS_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSefAtpp_NH1hH4K3db6jYBU59uXxHzZh-zgY2wdgNOu-vq9Zw/viewform';

export const metadata = {
  title: 'Contact Viento | Request a Quote',
  description:
    "Whether you're outfitting a new home or specifying for a commercial project, our team is ready to help.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="page active">
        <div className="contact-page">
          <div className="contact-info">
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title">
              Let's Create Something{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>Beautiful</em>
            </h2>
            <div className="divider" />
            <p className="section-subtitle">
              Whether you're outfitting a new home, renovating a space, or specifying for a
              commercial project — our team is ready to help.
            </p>
            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="cd-icon">✉</div>
                <div className="cd-text">
                  <span className="cd-label">Email Us</span>
                  <span className="cd-value">artexoverseas.p@gmail.com</span>
                  <span className="cd-value">systemwindowinc@gmail.com</span>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="cd-icon">☎</div>
                <div className="cd-text">
                  <span className="cd-label">Call Us</span>
                  <span className="cd-value">+91 93204 27622</span>
                  <span className="cd-value">+91 83691 19423</span>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="cd-icon">◉</div>
                <div className="cd-text">
                  <span className="cd-label">Studio</span>
                  <span className="cd-value">Gala No. 30, Sona Udyog, Andheri East, Mumbai 400069</span>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="cd-icon">◷</div>
                <div className="cd-text">
                  <span className="cd-label">Working Hours</span>
                  <span className="cd-value">Mon – Sat, 9:00 AM – 7:00 PM</span>
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: '3rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(245,240,232,0.08)',
              }}
            >
              <span className="section-label">Follow Us</span>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.8rem' }}>
                {[
                  { label: 'in', href: 'https://www.linkedin.com/company/viento-blinds/' },
                  { label: 'ig', href: 'https://www.instagram.com/viento_blinds?igsh=MW1yOG1mNnFqNTkzaw%3D%3D&utm_source=qr' },
                  { label: 'fb', href: 'https://www.facebook.com/share/1EL6bSH4Jw/?mibextid=wwXIfr' },
                  { label: 'wa', href: "https://wa.me/919320427622?text=Hi%20Viento%20Blinds%2C%20I%27d%20like%20to%20know%20more%20about%20your%20blinds." },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: 40,
                      height: 40,
                      border: '1px solid rgba(200,169,110,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'var(--gold)',
                      fontSize: '0.8rem',
                      textDecoration: 'none',
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="contact-form-section">
            <span className="section-label">Send a Message</span>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>
              Request a Free Quote
            </h2>
            <div className="divider" />
            <ContactForm />
          </div>
        </div>

        <section
          className="section"
          style={{ background: 'var(--cream)', textAlign: 'center', padding: '5rem 5vw' }}
        >
          <span className="section-label">Grow With Us</span>
          <h2 className="section-title" style={{ fontSize: '2.4rem' }}>
            Join the Viento Family
          </h2>
          <div className="divider" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
          <p
            className="section-subtitle"
            style={{ maxWidth: '540px', margin: '0 auto 2.2rem' }}
          >
            Partner with us as a distributor or build your career on our factory floor — tell us
            about yourself and we'll get back to you.
          </p>
          <div
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <a
              className="btn-primary"
              href={DISTRIBUTOR_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a Distributor
            </a>
            <a
              className="btn-outline"
              href={CAREERS_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Work With Us
            </a>
          </div>
        </section>
        <Footer variant="compact" />
      </div>
    </>
  );
}
