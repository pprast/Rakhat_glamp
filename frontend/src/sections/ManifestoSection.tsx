import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MANIFESTO_IMAGE =
  'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?w=900&q=80&auto=format&fit=crop'

const THESES = [
  'Собственный пляж и выход к реке',
  'Авторский интерьер от приглашённого архитектора',
  'Завтрак, BBQ и велосипеды включены',
  'Отдых без алкоголя — осознанный и настоящий',
]

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        opacity: 0,
        x: -48,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftRef.current,
          start: 'top 78%',
        },
      })

      gsap.from(rightRef.current, {
        opacity: 0,
        x: 48,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 78%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-sand-white"
      style={{
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
      }}
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        style={{
          paddingLeft: 'var(--section-px)',
          paddingRight: 'var(--section-px)',
        }}
      >

        {/* Left column */}
        <div ref={leftRef} className="flex flex-col justify-center">

          {/* Label */}
          <span
            className="text-xs tracking-widest uppercase mb-8 block"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              color: '#9A7A54',
            }}
          >
            О НАС
          </span>

          {/* Heading */}
          <h2
            className="font-display font-light leading-[1.08] mb-8"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#1A0F04',
              letterSpacing: '-0.01em',
            }}
          >
            Место, где отдыхают
            <br />по-настоящему
          </h2>

          {/* Body paragraph */}
          <p
            className="leading-relaxed mb-10 max-w-md"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '1rem',
              color: '#5A3A18',
              lineHeight: '1.75',
            }}
          >
            Рахат Глэмпинг — это авторские домики у берега реки в Актобе. Мы создали
            пространство, где природа становится главным впечатлением: шум воды,
            открытое небо и настоящая тишина. Здесь нет суеты — только отдых, который
            ощущается как подарок себе.
          </p>

          {/* Theses list */}
          <ul className="space-y-4">
            {THESES.map((thesis, i) => (
              <li
                key={i}
                className="flex items-start gap-4"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.9375rem',
                  color: '#5A3A18',
                }}
              >
                <span
                  className="flex-shrink-0 mt-[0.35em]"
                  style={{
                    display: 'inline-block',
                    width: '1rem',
                    height: '1px',
                    background: '#D4913A',
                    marginTop: '0.7em',
                  }}
                  aria-hidden="true"
                />
                {thesis}
              </li>
            ))}
          </ul>
        </div>

        {/* Right column — photo */}
        <div
          ref={rightRef}
          className="relative"
          style={{ marginTop: '-2.5rem' }}
        >
          <div
            className="overflow-hidden w-full"
            style={{
              aspectRatio: '4 / 5',
              boxShadow: '0 8px 48px rgba(90,58,24,0.16)',
            }}
          >
            <img
              src={MANIFESTO_IMAGE}
              alt="Природа у реки — Рахат Глэмпинг"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
