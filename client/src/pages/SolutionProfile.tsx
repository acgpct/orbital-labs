/*
 * ORBITAL LABS — Solution profile detail page
 */
import { useEffect } from 'react';
import { Link, useParams } from 'wouter';
import type { CSSProperties } from 'react';
import Navbar from '@/components/Navbar';
import NotFound from '@/pages/NotFound';
import {
  getSolutionProfile,
  solutionProfilePath,
  solutionProfiles,
  type SolutionProfileId,
} from '@shared/solution-profiles';
import { HANDOFF } from '@shared/hero-about-handoff';

const linkMutedStyle: CSSProperties = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '0.78rem',
  letterSpacing: '0.08em',
  color: '#414d56',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'color 0.25s ease',
};

export default function SolutionProfilePage() {
  const { slug } = useParams<{ slug: SolutionProfileId }>();
  const profile = slug ? getSolutionProfile(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [slug]);

  if (!profile) return <NotFound />;

  const otherProfiles = solutionProfiles.filter((p) => p.id !== profile.id);

  return (
    <div style={{ background: HANDOFF.paper, minHeight: '100vh' }}>
      <Navbar />

      <main className="container pt-28 pb-20 md:pt-32 md:pb-28">
        <Link
          href="/#solutions"
          style={{ ...linkMutedStyle, marginBottom: '32px' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#1e2830';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#414d56';
          }}
        >
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden style={{ transform: 'rotate(180deg)' }}>
            <path d="M1 5h14M10 1l5 4-5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to solutions
        </Link>

        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.58rem',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#414d56',
            marginBottom: '16px',
          }}
        >
          Solutions · {profile.shortLabel}
        </p>

        <h1
          style={{
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 200,
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            lineHeight: 1.1,
            letterSpacing: '0.04em',
            color: '#1e2830',
            margin: '0 0 clamp(20px, 3vw, 28px)',
            maxWidth: '820px',
          }}
        >
          {profile.title}
        </h1>

        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.95rem',
            lineHeight: 1.65,
            color: '#414d56',
            fontWeight: 300,
            maxWidth: '720px',
            margin: '0 0 clamp(36px, 5vw, 52px)',
          }}
        >
          {profile.who}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.88rem',
              color: '#414d56',
              lineHeight: 1.6,
              padding: '20px 22px',
              background: '#f9fbfd',
              borderLeft: '2px solid rgba(88,104,121,0.2)',
            }}
          >
            <strong
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.5rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#414d56',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              Pain point
            </strong>
            {profile.pain}
          </div>

          <div className="flex flex-col gap-4">
            {[
              { label: 'Economic buyer', value: profile.buyer },
              { label: 'Procurement velocity', value: profile.velocity },
              { label: 'Recommended tier', value: profile.tier },
            ].map((item) => (
              <div key={item.label} style={{ borderBottom: '1px solid rgba(88,104,121,0.08)', paddingBottom: '14px' }}>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#687a86',
                    marginBottom: '6px',
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.88rem',
                    color: '#1e2830',
                    fontWeight: 400,
                    margin: 0,
                    lineHeight: 1.45,
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <section style={{ marginBottom: '56px' }}>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.52rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#687a86',
              marginBottom: '20px',
            }}
          >
            What you get
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', borderTop: '1px solid rgba(88,104,121,0.1)' }}>
            {profile.outcomes.map((outcome) => (
              <li
                key={outcome}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  color: '#414d56',
                  fontWeight: 300,
                  padding: '18px 0',
                  borderBottom: '1px solid rgba(88,104,121,0.08)',
                  paddingLeft: '20px',
                  position: 'relative',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '1.35em',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#92a4ac',
                  }}
                />
                {outcome}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap items-center gap-6 mb-20">
          <Link
            href="/#contact"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#ffffff',
              background: '#586879',
              border: '1px solid #586879',
              padding: '14px 32px',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#1e2830';
              (e.currentTarget as HTMLElement).style.borderColor = '#1e2830';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#586879';
              (e.currentTarget as HTMLElement).style.borderColor = '#586879';
            }}
          >
            Book a demo
          </Link>
          <Link
            href="/#products"
            style={linkMutedStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#1e2830';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#414d56';
            }}
          >
            View platform &amp; lifecycle
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
              <path d="M1 5h14M10 1l5 4-5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <section>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.52rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#687a86',
              marginBottom: '20px',
            }}
          >
            Other buyer profiles
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherProfiles.map((other) => (
              <Link
                key={other.id}
                href={solutionProfilePath(other.id)}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.82rem',
                  color: '#414d56',
                  textDecoration: 'none',
                  padding: '16px 18px',
                  border: '1px solid rgba(88,104,121,0.12)',
                  background: '#ffffff',
                  transition: 'border-color 0.25s ease, color 0.25s ease',
                  lineHeight: 1.45,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(88,104,121,0.35)';
                  (e.currentTarget as HTMLElement).style.color = '#1e2830';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(88,104,121,0.12)';
                  (e.currentTarget as HTMLElement).style.color = '#414d56';
                }}
              >
                {other.shortLabel}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
