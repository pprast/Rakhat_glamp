import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Amenity data ────────────────────────────────────────────────────────────
const amenities = [
  {
    id: 'breakfast',
    label: 'Завтрак',
    desc: 'Утро начинается вкусно',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 28h16M6 24h20M10 24V16a6 6 0 0 1 12 0v8" />
        <path d="M13 10 Q12 8 13 6" strokeWidth="1.2" />
        <path d="M16 9 Q15 7 16 5" strokeWidth="1.2" />
        <path d="M19 10 Q18 8 19 6" strokeWidth="1.2" />
        <path d="M24 18c2 0 3.5 1 3.5 2.5S26 23 24 23" />
      </svg>
    ),
  },
  {
    id: 'bbq',
    label: 'Мангал и барбекю',
    desc: 'Шашлык у воды',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 18a10 10 0 0 0 20 0H6z" />
        <line x1="16" y1="28" x2="16" y2="32" />
        <line x1="11" y1="28" x2="9" y2="32" />
        <line x1="21" y1="28" x2="23" y2="32" />
        <line x1="8" y1="32" x2="24" y2="32" strokeWidth="1" />
        <path d="M12 15c0-3 2-5 4-3 1-4 5-4 5 0" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    id: 'bicycle',
    label: 'Велосипеды',
    desc: 'Прогулки по берегу',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="23" r="5" />
        <circle cx="24" cy="23" r="5" />
        <path d="M8 23l6-12h4l4 12" />
        <line x1="14" y1="11" x2="18" y2="11" />
        <path d="M18 11l2-3h3" />
        <line x1="20" y1="8" x2="24" y2="8" />
        <path d="M12 11h-2" />
      </svg>
    ),
  },
  {
    id: 'hammock',
    label: 'Гамаки',
    desc: 'Отдых в тени',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="6" x2="5" y2="28" />
        <line x1="27" y1="6" x2="27" y2="28" />
        <path d="M5 14 Q16 24 27 14" />
        <path d="M5 14 Q16 10 27 14" strokeDasharray="2.5 2" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 'fishing',
    label: 'Рыбалка',
    desc: 'Удочки бесплатно',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4 Q20 6 26 20" />
        <line x1="26" y1="20" x2="24" y2="28" strokeDasharray="2 1.5" strokeWidth="1.2" />
        <path d="M24 28 Q22 30 20 28 Q18 26 20 24 Q22 22 24 25" strokeWidth="1.3" />
        <path d="M11 24 Q15 21 18 24 Q15 27 11 24z" />
        <path d="M3 30 Q8 28 13 30 Q18 32 23 30" strokeWidth="0.9" />
      </svg>
    ),
  },
  {
    id: 'wifi',
    label: 'Wi-Fi',
    desc: 'Быстрый интернет',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14a17 17 0 0 1 24 0" />
        <path d="M8 18a11 11 0 0 1 16 0" />
        <path d="M12 22a6 6 0 0 1 8 0" />
        <circle cx="16" cy="26" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'pool',
    label: 'Бассейн',
    desc: 'Летом открыт',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="16" width="24" height="12" rx="2" />
        <path d="M4 22 Q8 19 12 22 Q16 25 20 22 Q24 19 28 22" />
        <path d="M10 16V10M22 16V10" />
        <line x1="10" y1="10" x2="22" y2="10" />
        <path d="M13 10 Q16 6 19 10" />
      </svg>
    ),
  },
  {
    id: 'playground',
    label: 'Детская площадка',
    desc: 'Для маленьких гостей',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="8" y2="28" />
        <line x1="24" y1="6" x2="24" y2="28" />
        <path d="M8 12 Q16 16 24 12" />
        <path d="M10 12 Q10 18 12 22" />
        <path d="M22 12 Q22 18 20 22" />
        <line x1="12" y1="22" x2="20" y2="22" />
      </svg>
    ),
  },
  {
    id: 'parking',
    label: 'Парковка',
    desc: 'Бесплатная',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="24" height="24" rx="3" />
        <path d="M12 24V8h5a5 5 0 0 1 0 10H12" />
      </svg>
    ),
  },
  {
    id: 'transfer',
    label: 'Трансфер',
    desc: 'На Zeekr по запросу',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22V18l3-7h18l3 7v4H4z" />
        <path d="M10 11l1-4h10l1 4" />
        <circle cx="9" cy="23" r="3" />
        <circle cx="23" cy="23" r="3" />
        <line x1="12" y1="23" x2="20" y2="23" />
      </svg>
    ),
  },
  {
    id: 'games',
    label: 'Настольные игры',
    desc: 'Вечера без экранов',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="10" width="20" height="14" rx="2" />
        <circle cx="11" cy="17" r="1.5" />
        <circle cx="16" cy="14" r="1.5" />
        <circle cx="21" cy="17" r="1.5" />
        <circle cx="16" cy="20" r="1.5" />
        <path d="M12 6h8M14 6V10M18 6V10" />
      </svg>
    ),
  },
  {
    id: 'bonfire',
    label: 'Костёр',
    desc: 'Под звёздным небом',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 28 Q8 26 8 20 Q8 14 16 10 Q14 18 20 18 Q26 18 24 12 Q28 18 24 24 Q22 28 16 28z" />
        <line x1="10" y1="28" x2="22" y2="28" />
        <line x1="7" y1="28" x2="25" y2="28" strokeWidth="1" />
      </svg>
    ),
  },
] as const

const extras = [
  {
    id: 'fishing-instructor',
    label: 'Рыбалка с инструктором',
    price: 'по запросу',
  },
  {
    id: 'firewood',
    label: 'Дрова',
    price: 'платно',
  },
  {
    id: 'child-seat',
    label: 'Детское кресло',
    price: 'по запросу',
  },
]

// ─── Section ──────────────────────────────────────────────────────────────────
export default function AmenitiesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.amenities-header', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
      gsap.from('.amenity-item', {
        opacity: 0,
        y: 30,
        stagger: { each: 0.06, from: 'start' },
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.amenity-grid',
          start: 'top 80%',
        },
      })
      gsap.from('.amenities-extras', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.amenities-extras',
          start: 'top 90%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="amenities"
      style={{
        background: '#F2E9D6',
        paddingTop: 'clamp(4rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        paddingLeft: 'clamp(1.25rem, 5vw, 5rem)',
        paddingRight: 'clamp(1.25rem, 5vw, 5rem)',
      }}
    >
      {/* Header */}
      <div className="amenities-header text-center mb-16 max-w-2xl mx-auto">
        <p
          className="font-sans text-clay tracking-widest mb-4"
          style={{ fontSize: '0.7rem', letterSpacing: '0.35em' }}
        >
          УДОБСТВА
        </p>
        <h2
          className="font-display font-light text-ink leading-tight"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300 }}
        >
          Всё для вашего комфорта
        </h2>
      </div>

      {/* Grid */}
      <div
        className="amenity-grid mx-auto grid grid-cols-2 md:grid-cols-3"
        style={{
          maxWidth: '1000px',
          gap: '2rem',
        }}
      >
        {amenities.map((item) => (
          <div
            key={item.id}
            className="amenity-item flex items-start gap-4"
          >
            {/* Icon square */}
            <div
              className="shrink-0 flex items-center justify-center text-sun"
              style={{
                width: '32px',
                height: '32px',
                marginTop: '2px',
              }}
            >
              {item.icon}
            </div>
            {/* Text */}
            <div>
              <p className="font-sans text-earth text-sm font-medium leading-snug">
                {item.label}
              </p>
              <p className="font-sans text-clay mt-0.5" style={{ fontSize: '0.72rem' }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div
        className="mx-auto mt-16 mb-12"
        style={{
          maxWidth: '1000px',
          height: '1px',
          background: '#D0BFA8',
        }}
      />

      {/* Extras */}
      <div className="amenities-extras mx-auto" style={{ maxWidth: '1000px' }}>
        <p
          className="font-sans text-clay mb-6"
          style={{ fontSize: '0.7rem', letterSpacing: '0.3em' }}
        >
          ДОПОЛНИТЕЛЬНО
        </p>
        <div
          className="flex flex-col sm:flex-row flex-wrap"
          style={{ gap: '0.75rem 2.5rem' }}
        >
          {extras.map((extra) => (
            <div key={extra.id} className="flex items-center gap-3">
              <div
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#D4913A',
                  flexShrink: 0,
                }}
              />
              <span className="font-sans text-earth text-sm">{extra.label}</span>
              <span className="font-sans text-clay" style={{ fontSize: '0.72rem' }}>
                — {extra.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
