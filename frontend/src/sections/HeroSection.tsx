import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=85&auto=format&fit=crop'

export default function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const eyebrowRef   = useRef<HTMLDivElement>(null)
  const titleRef     = useRef<HTMLHeadingElement>(null)
  const lineRef      = useRef<HTMLDivElement>(null)
  const sloganRef    = useRef<HTMLParagraphElement>(null)
  const ctaRef       = useRef<HTMLDivElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [
        eyebrowRef.current,
        titleRef.current,
        lineRef.current,
        sloganRef.current,
        ctaRef.current,
      ]

      gsap.set(elements, { opacity: 0, y: 30 })
      gsap.set(scrollCueRef.current, { opacity: 0 })

      const tl = gsap.timeline({ delay: 0.4 })
      tl.to(eyebrowRef.current,   { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to(titleRef.current,     { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.4')
        .to(lineRef.current,      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.5')
        .to(sloganRef.current,    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to(ctaRef.current,       { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to(scrollCueRef.current, { opacity: 1, duration: 0.6 }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen min-h-[600px] flex items-center overflow-hidden"
    >
      {/* Full-bleed background photo */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url("${HERO_IMAGE}")` }}
        aria-hidden="true"
      />

      {/* Overlay: dark on left for text readability, fades to transparent on right */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(105deg, rgba(15,8,2,0.72) 0%, rgba(15,8,2,0.45) 45%, rgba(15,8,2,0.1) 75%, transparent 100%)',
        }}
      />
      {/* Bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to top, rgba(15,8,2,0.4) 0%, transparent 40%)' }}
      />

      {/* Main content — left-aligned, generous padding */}
      <div className="relative z-10 w-full px-8 sm:px-14 lg:px-24 xl:px-32 pt-28 pb-20">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <div ref={eyebrowRef} className="mb-7">
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                color: 'rgba(240,192,80,0.85)',
              }}
            >
              Актобе · Казахстан
            </span>
          </div>

          {/* Hero title */}
          <h1
            ref={titleRef}
            className="font-display leading-[0.9] mb-7"
            style={{
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: '#FFFDF8',
            }}
          >
            Рахат
            <br />
            Глэмпинг
          </h1>

          {/* Thin horizontal rule */}
          <div
            ref={lineRef}
            className="mb-7"
            style={{
              width: '4rem',
              height: '1px',
              background: 'rgba(255,253,248,0.4)',
            }}
          />

          {/* Slogan */}
          <p
            ref={sloganRef}
            className="font-display italic leading-snug"
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              fontWeight: 300,
              color: 'rgba(255,253,248,0.75)',
            }}
          >
            Место силы у берега реки
          </p>

          {/* CTA buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-5 mt-12">
            <Link to="/book">
              <button
                className="px-8 py-3.5 text-xs tracking-[0.25em] uppercase transition-all duration-300"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  border: '1px solid rgba(255,253,248,0.85)',
                  color: '#FFFDF8',
                  background: 'transparent',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#FFFDF8'
                  e.currentTarget.style.color = '#1A0F04'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#FFFDF8'
                }}
              >
                Забронировать
              </button>
            </Link>

            <a
              href="#cabins"
              className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-60"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(255,253,248,0.65)',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                paddingTop: '0.875rem',
              }}
            >
              Смотреть домики
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator — vertical line + text */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            color: 'rgba(255,253,248,0.45)',
          }}
        >
          Прокрути
        </span>
        <div
          className="w-px animate-bounce"
          style={{
            height: '2.5rem',
            background: 'linear-gradient(to bottom, rgba(255,253,248,0.4), transparent)',
          }}
        />
      </div>
    </section>
  )
}
