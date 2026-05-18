/*
 * ORBITAL LABS — Contact CTA
 * Estimate (Alps calculator) flows into enquiries + form on white.
 */

import { useState } from 'react';
import ContactEstimate from '@/components/ContactEstimate';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(88,104,121,0.2)',
    padding: '12px 0',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.9rem',
    color: '#1e2830',
    outline: 'none',
    transition: 'border-color 0.25s ease',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.52rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase' as const,
    color: '#92a4ac',
    display: 'block',
    marginBottom: '8px',
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-white">
      <ContactEstimate />

      <div id="contact-form" className="scroll-mt-[5rem]" style={{ background: '#ffffff' }}>
        <div className="container py-24 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.58rem',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: '#92a4ac',
                  marginBottom: '24px',
                }}
              >
                Reach out
              </p>
              <h2
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 200,
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  lineHeight: 1.1,
                  letterSpacing: '0.04em',
                  color: '#1e2830',
                  marginBottom: '24px',
                }}
              >
                {"Let's work"}
                <br />
                together.
              </h2>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.95rem',
                  lineHeight: 1.85,
                  color: '#586879',
                  fontWeight: 300,
                  maxWidth: '400px',
                  marginBottom: '56px',
                }}
              >
                Whether you're exploring AI strategy, evaluating our products, or ready to deploy — we'd like to hear from you.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  { label: 'General Enquiries', value: 'hello@orbitallabs.ai' },
                  { label: 'Partnerships', value: 'partnerships@orbitallabs.ai' },
                  { label: 'Press & Media', value: 'press@orbitallabs.ai' },
                ].map((item) => (
                  <div key={item.label} style={{ borderBottom: '1px solid rgba(88,104,121,0.1)', paddingBottom: '20px' }}>
                    <p
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.52rem',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: '#c6d1db',
                        marginBottom: '6px',
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Exo 2', sans-serif",
                        fontWeight: 300,
                        fontSize: '0.95rem',
                        letterSpacing: '0.04em',
                        color: '#586879',
                        margin: 0,
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {sent ? (
                <div style={{ padding: '48px', border: '1px solid rgba(88,104,121,0.12)', textAlign: 'center' }}>
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.58rem',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: '#92a4ac',
                      marginBottom: '16px',
                    }}
                  >
                    Message received
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 200,
                      fontSize: '1.8rem',
                      color: '#1e2830',
                      letterSpacing: '0.04em',
                      marginBottom: '12px',
                    }}
                  >
                    Thank you.
                  </h3>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: '#92a4ac', lineHeight: 1.7 }}>
                    We'll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div>
                      <label style={labelStyle}>Name</label>
                      <input
                        required
                        style={inputStyle}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onFocus={(e) => ((e.target as HTMLInputElement).style.borderBottomColor = '#586879')}
                        onBlur={(e) => ((e.target as HTMLInputElement).style.borderBottomColor = 'rgba(88,104,121,0.2)')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input
                        required
                        type="email"
                        style={inputStyle}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onFocus={(e) => ((e.target as HTMLInputElement).style.borderBottomColor = '#586879')}
                        onBlur={(e) => ((e.target as HTMLInputElement).style.borderBottomColor = 'rgba(88,104,121,0.2)')}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input
                      style={inputStyle}
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      onFocus={(e) => ((e.target as HTMLInputElement).style.borderBottomColor = '#586879')}
                      onBlur={(e) => ((e.target as HTMLInputElement).style.borderBottomColor = 'rgba(88,104,121,0.2)')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      required
                      rows={4}
                      style={{ ...inputStyle, resize: 'none' }}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderBottomColor = '#586879')}
                      onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderBottomColor = 'rgba(88,104,121,0.2)')}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      alignSelf: 'flex-start',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.62rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#1e2830',
                      border: '1px solid rgba(88,104,121,0.35)',
                      padding: '14px 32px',
                      background: 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = '#1e2830';
                      (e.currentTarget as HTMLElement).style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = '#1e2830';
                    }}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(88,104,121,0.1)' }}>
          <div className="container py-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <span
              style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 300,
                fontSize: '0.85rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#1e2830',
              }}
            >
              Orbital Labs
            </span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.14em', color: '#92a4ac' }}>
              © 2026 Orbital Labs. All rights reserved.
            </span>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Privacy', 'Terms', 'LinkedIn'].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.52rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#92a4ac',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#1e2830')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#92a4ac')}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
