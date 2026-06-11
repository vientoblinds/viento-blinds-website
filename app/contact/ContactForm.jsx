'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // Placeholder: hook up to real API/email service later
    setSubmitted(true);
  };

  return (
    <>
      <form className="contact-form" onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input id="first-name" name="firstName" type="text" placeholder="Aarav" required />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input id="last-name" name="lastName" type="text" placeholder="Sharma" required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input id="email" name="email" type="email" placeholder="aarav@email.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" type="tel" placeholder="+91 00000 00000" />
        </div>
        <div className="form-group">
          <label htmlFor="product">Product of Interest</label>
          <select id="product" name="product" defaultValue="">
            <option value="">Select a product...</option>
            <option>Wooden Blinds</option>
            <option>Honeycomb Blinds</option>
            <option>Shangri-La Blinds</option>
            <option>Zebra Blinds</option>
            <option>Roller Blinds</option>
            <option>Eco Blackout Blinds</option>
            <option>Roman Style Blinds</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="project-type">Project Type</label>
          <select id="project-type" name="projectType" defaultValue="">
            <option value="">Select type...</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Hospitality</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us about your project..."
          />
        </div>
        <button
          type="submit"
          className="btn-primary"
          style={{
            marginTop: '1rem',
            width: '100%',
            justifyContent: 'center',
            background: submitted ? 'var(--gold)' : undefined,
            color: submitted ? 'var(--charcoal)' : undefined,
          }}
          disabled={submitted}
        >
          {submitted ? 'Message Sent ✓' : 'Send Message →'}
        </button>
      </form>
      {submitted ? (
        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'var(--cream)',
            border: '1px solid var(--gold)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: '1.5rem',
              color: 'var(--charcoal)',
              marginBottom: '0.5rem',
            }}
          >
            Thank You
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
            We've received your message and will be in touch within 24 hours.
          </p>
        </div>
      ) : null}
    </>
  );
}
