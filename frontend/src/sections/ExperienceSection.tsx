import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FRAMES = [
  {
    num: '01',
    title: 'Пляж и река',
    desc: 'Собственный берег, рыбалка на рассвете, прогулки на лодке — вода всегда рядом.',
    bg: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1400&q=80&auto=format&fit=crop',
  },
  {
    num: '02',
    title: 'Уютный домик',
    desc: 'Авторский интерьер, тёплый пол, панорамные окна с видом на воду. Каждая деталь — с заботой.',
    bg: 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=1400&q=80&auto=format&fit=crop',
  },
  {
    num: '03',
    title: 'Отдых и природа',
    desc: 'Завтраки, велосипеды, BBQ с дровами, гамаки — всё для настоящего отдыха у природы.',
    bg: 'https://images.unsplash.com/photo-1496080174650-637e3f22fa03?w=1400&q=80&auto=format&fit=crop',
  },
]

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)
  const introRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const ctx = gsap.context(() => {
      // Intro header fade-in
      if (introRef.current) {
        gsap.from(introRef.current.querySelectorAll('.intro-reveal'), {
          opacity: 0,
          y: 22,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 80%',
          },
        })
      }

      // Horizontal pin — same mechanism as original
      const totalW = track.scrollWidth - window.innerWidth

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1.5,
          start: 'top top',
          end: () => `+=${totalW + window.innerHeight * 0.5}`,
          invalidateOnRefresh: true,
        },
      })

      tl.to(track, { x: -totalW, ease: 'none' })

      // Content reveal per frame
      FRAMES.forEach((_, i) => {
        const frame = document.querySelector(`.exp-frame-${i}`)
        if (!frame) return
        gsap.from(frame.querySelectorAll('.exp-content > *'), {
          opacity: 0,
          y: 25,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: frame,
            containerAnimation: tl,
            start: 'left 65%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div style={{ background: '#FAF7F1' }}>
      {/* Intro text before the pin */}
      <div
        ref={introRef}
        style={{
          padding: 'clamp(60px, 8vw, 120px) var(--section-px) clamp(40px, 5vw, 80px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <h2
          className="intro-reveal font-display font-light text-ink"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1 }}
        >
          Три дня у воды
        </h2>
        <p
          className="intro-reveal font-sans text-clay"
          style={{ fontSize: '13px', letterSpacing: '0.06em' }}
        >
          прокрутите →
        </p>
      </div>

      {/* Pinned horizontal scroll */}
      <div ref={containerRef} id="experience" className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ width: `${FRAMES.length * 100}vw` }}
        >
          {FRAMES.map((f, i) => (
            <div
              key={i}
              className={`exp-frame-${i} relative w-screen h-screen flex-shrink-0 overflow-hidden`}
            >
              {/* Full-bleed background photo */}
              <img
                src={f.bg}
                alt={f.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ display: 'block' }}
              />

              {/* Bottom gradient overlay — warm cream fade */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(250,247,241,0.92) 0%, rgba(250,247,241,0.3) 35%, transparent 55%)',
                }}
              />

              {/* Text content — bottom aligned */}
              <div
                className="exp-content absolute bottom-0 left-0 right-0 flex flex-col"
                style={{
                  padding: 'clamp(40px, 6vw, 80px) var(--section-px)',
                  gap: '0.75rem',
                }}
              >
                {/* Progress counter */}
                <span
                  className="font-sans tracking-widest"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.3em',
                    color: 'rgba(26,15,4,0.45)',
                  }}
                >
                  {f.num} / 03
                </span>

                {/* Title */}
                <h3
                  className="font-display font-light"
                  style={{
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    fontStyle: 'italic',
                    color: '#1A0F04',
                    lineHeight: 1.1,
                  }}
                >
                  {f.title}
                </h3>

                {/* Description */}
                <p
                  className="font-sans"
                  style={{
                    fontSize: '14px',
                    color: 'rgba(26,15,4,0.65)',
                    maxWidth: '28rem',
                    lineHeight: 1.6,
                  }}
                >
                  {f.desc}
                </p>

                {/* Frame dots */}
                <div className="flex items-center gap-2" style={{ marginTop: '0.5rem' }}>
                  {FRAMES.map((_, j) => (
                    <div
                      key={j}
                      style={{
                        width: j === i ? 22 : 5,
                        height: 5,
                        borderRadius: '3px',
                        background: j === i ? '#1A0F04' : 'rgba(26,15,4,0.2)',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
