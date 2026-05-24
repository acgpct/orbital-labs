/*
 * ORBITAL LABS — Contact CTA
 * Estimate (Alps calculator) flows into enquiries + form on white.
 */

import { useState } from 'react';
import ContactEstimate from '@/components/ContactEstimate';
import { HANDOFF } from '@shared/hero-about-handoff';

const LINKEDIN_URL = 'https://www.linkedin.com/company/orbitallabs';

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.477 20.452H4.155V9h2.322v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', company: '', tier: '' });
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
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: HANDOFF.paper }}
    >
      <ContactEstimate />

      <div id="contact-form" className="scroll-mt-[5rem]" style={{ background: '#ffffff' }}>
        <div className="container pt-14 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.58rem',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: '#92a4ac',
                  marginBottom: '14px',
                }}
              >
                Reach out
              </p>
              <h2
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 200,
                  fontSize: 'clamp(1.65rem, 3.2vw, 2.85rem)',
                  lineHeight: 1.12,
                  letterSpacing: '0.04em',
                  color: '#1e2830',
                  marginBottom: '14px',
                }}
              >
                Let&apos;s work together.
              </h2>
              <p
                className="lg:whitespace-nowrap"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.875rem',
                  lineHeight: 1.55,
                  color: '#586879',
                  fontWeight: 300,
                  marginBottom: '36px',
                }}
              >
                Strategy questions, product evaluation, or deployment — we&apos;re happy to talk.
              </p>
              <div style={{ borderBottom: '1px solid rgba(88,104,121,0.1)', paddingBottom: '14px' }}>
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
                  General Enquiries
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
                  hello@orbitallabs.ai
                </p>
              </div>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Orbital Labs on LinkedIn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '24px',
                  color: '#92a4ac',
                  transition: 'color 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#1e2830';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#92a4ac';
                }}
              >
                <LinkedInIcon size={22} />
              </a>
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
                        placeholder="Your name"
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
                        placeholder="work@company.com"
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
                      placeholder="Organisation"
                      style={inputStyle}
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      onFocus={(e) => ((e.target as HTMLInputElement).style.borderBottomColor = '#586879')}
                      onBlur={(e) => ((e.target as HTMLInputElement).style.borderBottomColor = 'rgba(88,104,121,0.2)')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>I&apos;m interested in</label>
                    <select
                      style={{
                        ...inputStyle,
                        cursor: 'pointer',
                        color: form.tier ? '#1e2830' : '#c6d1db',
                      }}
                      value={form.tier}
                      onChange={(e) => setForm({ ...form, tier: e.target.value })}
                      onFocus={(e) => ((e.target as HTMLSelectElement).style.borderBottomColor = '#586879')}
                      onBlur={(e) => ((e.target as HTMLSelectElement).style.borderBottomColor = 'rgba(88,104,121,0.2)')}
                    >
                      <option value="">Select a tier</option>
                      <option value="api">Tier 1 — API</option>
                      <option value="application">Tier 2 — Application</option>
                      <option value="managed">Tier 3 — Managed</option>
                      <option value="embedded">Tier 4 — Embedded</option>
                      <option value="demo">Just a demo first</option>
                    </select>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {['Privacy', 'Terms'].map((link) => (
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
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Orbital Labs on LinkedIn"
                style={{
                  display: 'inline-flex',
                  color: '#92a4ac',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#1e2830';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#92a4ac';
                }}
              >
                <LinkedInIcon size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        #contact-form input::placeholder {
          color: #c6d1db;
          opacity: 1;
        }
        #contact-form select {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%2392a4ac' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0 center;
          padding-right: 20px;
        }
      `}</style>
    </section>
  );
}
