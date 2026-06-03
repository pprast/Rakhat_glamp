import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WATER_IMAGE =
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=85&auto=format&fit=crop'

export default function WaterSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef      = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax: background moves at 30% of scroll speed
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Content reveal
      if (contentRef.current) {
        gsap.from(contentRef.current.querySelectorAll('.w-reveal'), {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 72%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="water"
      className="relative overflow-hidden"
      style={{ minHeight: '80vh' }}
    >
      {/* Background photo — slightly oversized for parallax headroom */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${WATER_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          top: '-15%',
          bottom: '-15%',
        }}
      />

      {/* Very thin warm overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(250,247,241,0.25)' }}
      />

      {/* Bottom darkening gradient so text is readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(26,15,4,0.55) 0%, rgba(26,15,4,0.18) 40%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-end text-center"
        style={{
          minHeight: '80vh',
          padding: 'var(--section-py) var(--section-px)',
          paddingBottom: 'clamp(60px, 7vw, 100px)',
          gap: '1rem',
        }}
      >
        {/* Eyebrow */}
        <p
          className="w-reveal font-sans uppercase tracking-widest text-white"
          style={{ fontSize: '10px', letterSpacing: '0.28em', opacity: 0.8 }}
        >
          ПЛЯЖ И ВОДА
        </p>

        {/* Heading */}
        <h2
          className="w-reveal font-display font-light text-white"
          style={{
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontStyle: 'italic',
            lineHeight: 1.05,
          }}
        >
          Живая вода
        </h2>

        {/* Thin white line */}
        <div
          className="w-reveal"
          style={{
            width: '40px',
            height: '1px',
            background: 'rgba(255,255,255,0.5)',
            margin: '0.5rem auto',
          }}
        />

        {/* Description */}
        <p
          className="w-reveal font-sans"
          style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.78)',
            maxWidth: '26rem',
            lineHeight: 1.65,
          }}
        >
          Собственный пляж у реки. Рыбалка на рассвете, прогулки на лодке, купание — природа
          в шаговой доступности от домика.
        </p>

        {/* Instagram link */}
        <a
          className="w-reveal font-sans inline-flex items-center gap-2 transition-opacity duration-300"
          href="https://www.instagram.com/rakhat_glamping"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '12px',
            letterSpacing: '0.05em',
            marginTop: '0.75rem',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
        >
          {/* Instagram icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
          </svg>
          @rakhat_glamping
        </a>
      </div>
    </section>
  )
}
