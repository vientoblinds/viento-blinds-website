import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from './ContactForm';

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
        <Footer variant="compact" />
      </div>
    </>
  );
}
