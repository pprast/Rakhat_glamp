import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.location-el', {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="location"
      style={{
        background: '#F2E9D6',
        paddingTop: 'clamp(4rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        paddingLeft: 'clamp(1.25rem, 5vw, 5rem)',
        paddingRight: 'clamp(1.25rem, 5vw, 5rem)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          gap: '3rem',
        }}
        className="grid grid-cols-1 lg:grid-cols-2"
      >
        {/* Left: content */}
        <div className="flex flex-col justify-center gap-6">
          <div className="location-el">
            <p
              className="font-sans text-clay tracking-widest mb-4"
              style={{ fontSize: '0.7rem', letterSpacing: '0.35em' }}
            >
              КАК ДОБРАТЬСЯ
            </p>
            <h2
              className="font-display font-light text-ink leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 300 }}
            >
              Рахат Глэмпинг
            </h2>
          </div>

          {/* Address */}
          <div className="location-el flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#9A7A54" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 1C6.2 1 4 3.2 4 6c0 4.5 5 11 5 11s5-6.5 5-11c0-2.8-2.2-5-5-5z" />
                <circle cx="9" cy="6" r="1.8" />
              </svg>
            </div>
            <div>
              <p className="font-sans text-earth text-sm leading-relaxed">
                41-й разъезд, 120Б
              </p>
              <p className="font-sans text-clay" style={{ fontSize: '0.8rem' }}>
                Актобе, Казахстан
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="location-el flex items-center gap-3">
            <div className="shrink-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#9A7A54" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 2h3l2 4.5-2 1.5C7.5 10.5 7.5 10.5 11 12.5l1.5-2L17 12.5V15.5c0 .8-1.8 2.5-4.5 1C8.5 14.5 4 9.5 2.5 6.5 1.5 3.5 2.2 2 3 2z" />
              </svg>
            </div>
            <a
              href="tel:+77075042088"
              className="font-sans text-earth text-sm hover:text-sun transition-colors duration-200"
            >
              +7 707 504 20 88
            </a>
          </div>

          {/* WhatsApp */}
          <div className="location-el flex items-center gap-3">
            <div className="shrink-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#9A7A54" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 1C4.6 1 1 4.6 1 9c0 1.4.4 2.8 1 4L1 17l4-1c1.2.6 2.5 1 4 1 4.4 0 8-3.6 8-8s-3.6-8-8-8z" />
                <path d="M6.5 7.5c.2.5.7 1.5 1.5 2.5 1 1 2 1.5 2.5 1.5" strokeLinecap="round" />
              </svg>
            </div>
            <a
              href="https://wa.me/77075042088"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-earth text-sm hover:text-sun transition-colors duration-200"
            >
              WhatsApp
            </a>
          </div>

          {/* Transfer note */}
          <div
            className="location-el"
            style={{
              borderLeft: '2px solid #D4913A',
              paddingLeft: '1rem',
            }}
          >
            <p className="font-sans text-clay" style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>
              Трансфер на электромобиле Zeekr — по запросу
            </p>
          </div>

          {/* 2GIS button */}
          <div className="location-el">
            <a
              href="https://2gis.kz/aktobe/firm/70000001090131557"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-sun border border-sun hover:bg-sun hover:text-white transition-all duration-300"
              style={{
                padding: '0.65rem 1.5rem',
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
              }}
            >
              Открыть на карте 2ГИС ↗
            </a>
          </div>
        </div>

        {/* Right: map */}
        <div
          className="location-el"
          style={{
            background: '#E8DCCA',
            aspectRatio: '16/9',
            overflow: 'hidden',
            minHeight: '320px',
          }}
        >
          <iframe
            src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A50.285%2C%22lon%22%3A57.167%2C%22zoom%22%3A14%7D%7D"
            width="100%"
            height="100%"
            frameBorder={0}
            title="Рахат Глэмпинг на карте 2ГИС"
            loading="lazy"
            style={{ display: 'block', minHeight: '320px' }}
          />
        </div>
      </div>
    </section>
  )
}
