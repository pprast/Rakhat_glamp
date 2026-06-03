import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const cabins = [
  {
    id: 'floor-1',
    name: 'Домик у воды',
    type: '1-этажный',
    price: '40 000 ₸',
    period: 'ночь',
    capacity: 'До 6 взрослых + дети',
    image: 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=800&q=80&auto=format&fit=crop',
    amenities: [
      'Спальня, гостиная, кухня',
      'Санузел с душем',
      'Мангал и барбекю',
      'Wi-Fi',
      'Выход к воде',
    ],
    imageLeft: true,
  },
  {
    id: 'floor-2',
    name: 'Панорамный домик',
    type: '2-этажный',
    price: '50 000 ₸',
    period: 'ночь',
    capacity: 'До 6 взрослых (без детей)',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80&auto=format&fit=crop',
    amenities: [
      'Два этажа, панорамный вид',
      'Спальня, гостиная, кухня',
      'Санузел с душем',
      'Мангал и барбекю',
      'Wi-Fi',
    ],
    imageLeft: false,
  },
] as const

export default function CabinsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.cabins-eyebrow', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
      gsap.from('.cabins-title', {
        opacity: 0,
        y: 35,
        duration: 1,
        ease: 'power3.out',
        delay: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Each cabin row: photo + text animate in
      document.querySelectorAll('.cabin-row').forEach((row) => {
        const photo = row.querySelector('.cabin-photo')
        const text = row.querySelector('.cabin-text')
        const isLeft = row.classList.contains('photo-left')

        if (photo) {
          gsap.from(photo, {
            opacity: 0,
            x: isLeft ? -50 : 50,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 75%',
            },
          })
        }
        if (text) {
          gsap.from(text.querySelectorAll('.text-reveal'), {
            opacity: 0,
            y: 28,
            stagger: 0.1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 72%',
            },
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="cabins"
      style={{
        background: '#FAF7F1',
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
      }}
    >
      {/* Section header */}
      <div
        className="text-center"
        style={{
          paddingLeft: 'var(--section-px)',
          paddingRight: 'var(--section-px)',
          marginBottom: 'clamp(60px, 8vw, 120px)',
        }}
      >
        <p
          className="cabins-eyebrow font-sans text-clay tracking-widest uppercase mb-4"
          style={{ fontSize: '11px', letterSpacing: '0.25em' }}
        >
          ДОМИКИ
        </p>
        <h2
          className="cabins-title font-display font-light text-ink leading-tight"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          Ваш дом у воды
        </h2>
      </div>

      {/* Cabin rows */}
      <div className="flex flex-col" style={{ gap: 'clamp(80px, 10vw, 140px)' }}>
        {cabins.map((cabin) => (
          <div
            key={cabin.id}
            className={`cabin-row ${cabin.imageLeft ? 'photo-left' : 'photo-right'} flex flex-col ${
              cabin.imageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } items-center`}
            style={{ gap: 'clamp(40px, 5vw, 80px)', paddingLeft: 'var(--section-px)', paddingRight: 'var(--section-px)' }}
          >
            {/* Photo */}
            <div
              className="cabin-photo w-full lg:w-[58%] flex-shrink-0"
              style={{
                aspectRatio: '4/3',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 16px 56px rgba(26, 15, 4, 0.14)',
              }}
            >
              <img
                src={cabin.image}
                alt={cabin.name}
                className="w-full h-full object-cover"
                style={{ display: 'block' }}
              />
            </div>

            {/* Text */}
            <div className="cabin-text flex flex-col w-full lg:w-[42%]" style={{ gap: '1.5rem' }}>
              <div className="text-reveal">
                <p
                  className="font-sans text-clay uppercase tracking-widest mb-2"
                  style={{ fontSize: '10px', letterSpacing: '0.22em' }}
                >
                  {cabin.type}
                </p>
                <h3
                  className="font-display font-light text-ink"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontStyle: 'italic', lineHeight: 1.15 }}
                >
                  {cabin.name}
                </h3>
              </div>

              <div className="text-reveal flex items-baseline gap-2">
                <span
                  className="font-sans font-medium"
                  style={{ color: '#D4913A', fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)' }}
                >
                  {cabin.price}
                </span>
                <span className="font-sans text-clay text-sm">/ {cabin.period}</span>
              </div>

              <p className="text-reveal font-sans text-clay" style={{ fontSize: '13px' }}>
                {cabin.capacity}
              </p>

              {/* Divider */}
              <div
                className="text-reveal"
                style={{ height: '1px', background: 'rgba(154,122,84,0.2)', width: '100%' }}
              />

              {/* Amenities */}
              <ul className="text-reveal flex flex-col" style={{ gap: '0.55rem' }}>
                {cabin.amenities.map((item, i) => (
                  <li
                    key={i}
                    className="font-sans flex items-start gap-3"
                    style={{ color: '#5A3A18', fontSize: '13.5px', lineHeight: 1.5 }}
                  >
                    <span style={{ color: '#9A7A54', flexShrink: 0, marginTop: '2px' }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="text-reveal" style={{ marginTop: '0.5rem' }}>
                <Link to={`/book?cabin=${cabin.id}`}>
                  <button
                    className="font-sans tracking-widest uppercase transition-all duration-300"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.2em',
                      border: '1px solid #1A0F04',
                      color: '#1A0F04',
                      background: 'transparent',
                      padding: '14px 36px',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = '#1A0F04'
                      el.style.color = '#FAF7F1'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = 'transparent'
                      el.style.color = '#1A0F04'
                    }}
                  >
                    Забронировать
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
