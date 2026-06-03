import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export default function BookingCTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-el', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="book-cta"
      className="relative overflow-hidden"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
        paddingBottom: 'clamp(5rem, 10vw, 8rem)',
        paddingLeft: '2rem',
        paddingRight: '2rem',
      }}
    >
      {/* Warm dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(26, 15, 4, 0.55)' }}
      />

      {/* Content */}
      <div
        className="relative z-10 text-center mx-auto"
        style={{ maxWidth: '42rem' }}
      >
        {/* Eyebrow */}
        <p
          className="cta-el font-sans text-white/60"
          style={{ fontSize: '0.7rem', letterSpacing: '0.4em', marginBottom: '1.5rem' }}
        >
          БРОНИРОВАНИЕ
        </p>

        {/* Headline */}
        <h2
          className="cta-el font-display font-light text-white leading-tight"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 300,
            marginBottom: '1.5rem',
          }}
        >
          Забронируй своё место у воды
        </h2>

        {/* Thin line */}
        <div
          className="cta-el mx-auto"
          style={{
            width: '4rem',
            height: '1px',
            background: 'rgba(255,255,255,0.4)',
            marginBottom: '1.5rem',
          }}
        />

        {/* Subtext */}
        <p
          className="cta-el font-sans text-white/70 leading-relaxed"
          style={{ fontSize: '0.95rem', marginBottom: '2.5rem' }}
        >
          Выбирай даты и домик — подтвердим в течение 2 часов
        </p>

        {/* CTA Button */}
        <div className="cta-el" style={{ marginBottom: '1.25rem' }}>
          <Link to="/book">
            <button
              className="font-sans text-white border border-white hover:bg-white hover:text-ink transition-all duration-300"
              style={{
                padding: '1rem 2.5rem',
                fontSize: '0.78rem',
                letterSpacing: '0.3em',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              Забронировать
            </button>
          </Link>
        </div>

        {/* WhatsApp */}
        <div className="cta-el">
          <a
            href="https://wa.me/77075042088"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-white/50 hover:text-white/80 transition-colors duration-200 underline"
            style={{ fontSize: '0.82rem', textUnderlineOffset: '3px' }}
          >
            или напишите в WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
