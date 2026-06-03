import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reviews = [
  {
    author: 'Айгерим',
    location: 'Актобе',
    text: 'Отличное место для семейного отдыха, всё чисто и уютно, природа потрясающая',
    date: 'Август 2024',
  },
  {
    author: 'Рустам',
    location: 'Астана',
    text: 'Завтраки вкусные, домик просторный, дети в восторге от пляжа',
    date: 'Июль 2024',
  },
  {
    author: 'Дина',
    location: 'Актобе',
    text: 'Идеальное место для тех кто хочет отдохнуть от города. Рекомендуем!',
    date: 'Сентябрь 2024',
  },
]

// Star icon — filled or outlined
function Star({ filled }: { filled: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1l1.6 3.4 3.7.5-2.7 2.6.6 3.7L7 9.5l-3.2 1.7.6-3.7L1.7 4.9l3.7-.5z"
        fill={filled ? '#D4913A' : 'none'}
        stroke={filled ? '#D4913A' : '#D0BFA8'}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reviews-header', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
      gsap.from('.reviews-rating-block', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.reviews-rating-block',
          start: 'top 85%',
        },
      })
      gsap.from('.review-card', {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.review-card',
          start: 'top 85%',
        },
      })
      gsap.from('.reviews-instagram', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.reviews-instagram',
          start: 'top 90%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="reviews"
      style={{
        background: '#FAF7F1',
        paddingTop: 'clamp(4rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        paddingLeft: 'clamp(1.25rem, 5vw, 5rem)',
        paddingRight: 'clamp(1.25rem, 5vw, 5rem)',
      }}
    >
      {/* Header */}
      <div className="reviews-header text-center mb-14 max-w-xl mx-auto">
        <p
          className="font-sans text-clay tracking-widest mb-4"
          style={{ fontSize: '0.7rem', letterSpacing: '0.35em' }}
        >
          ОТЗЫВЫ
        </p>
        <h2
          className="font-display font-light text-ink leading-tight"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300 }}
        >
          Говорят гости
        </h2>
      </div>

      {/* Rating block */}
      <div
        className="reviews-rating-block mx-auto mb-14 flex flex-col items-center gap-2"
        style={{ maxWidth: '320px' }}
      >
        <div className="flex items-baseline gap-3">
          <span
            className="font-display font-light text-sun"
            style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 300, lineHeight: 1 }}
          >
            4.4
          </span>
          <span className="font-sans text-clay text-sm">из 5.0</span>
        </div>
        {/* Stars row: 4 filled, 1 outline */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} filled={i <= 4} />
          ))}
        </div>
        <p className="font-sans text-clay" style={{ fontSize: '0.72rem', letterSpacing: '0.1em' }}>
          2ГИС
        </p>
      </div>

      {/* Review cards */}
      <div
        className="mx-auto mb-16 grid grid-cols-1 md:grid-cols-3"
        style={{
          maxWidth: '1000px',
          gap: '1.25rem',
        }}
      >
        {reviews.map((review, i) => (
          <div
            key={i}
            className="review-card"
            style={{
              background: '#FFFDF8',
              border: '1px solid #E8DCCA',
              padding: 'clamp(1.25rem, 3vw, 2rem)',
            }}
          >
            {/* Quote text */}
            <p
              className="font-display italic text-earth leading-relaxed mb-6"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontStyle: 'italic' }}
            >
              &ldquo;{review.text}&rdquo;
            </p>
            {/* Footer */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-sans text-clay text-sm font-medium">
                  {review.author}
                  <span className="font-normal text-clay/70">, {review.location}</span>
                </p>
              </div>
              <p className="font-sans text-clay" style={{ fontSize: '0.7rem' }}>
                {review.date}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Instagram counter */}
      <div
        className="reviews-instagram text-center"
        style={{ maxWidth: '1000px', margin: '0 auto' }}
      >
        <div className="flex items-center justify-center gap-3">
          <span
            className="font-display font-light text-sun"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300 }}
          >
            16 000+
          </span>
          <span className="font-sans text-clay text-sm">подписчиков в Instagram</span>
        </div>
        <a
          href="https://www.instagram.com/rakhat_glamping"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-clay hover:text-sun transition-colors duration-200 underline"
          style={{ fontSize: '0.78rem', textUnderlineOffset: '3px' }}
        >
          @rakhat_glamping
        </a>
      </div>
    </section>
  )
}
