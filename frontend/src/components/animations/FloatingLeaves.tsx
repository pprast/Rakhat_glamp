import { cn } from '@/utils/cn'

interface FloatingLeavesProps {
  className?: string
  count?: number
}

const SHAPES = [
  'M10 2C10 2 4 8 4 13a6 6 0 0012 0C16 8 10 2 10 2z',
  'M10 1C6 1 3 5 3 9c0 3 5 8 7 8s7-5 7-8C17 5 14 1 10 1z',
  'M10 3C10 3 5 7 5 11a5 5 0 0010 0C15 7 10 3 10 3z',
]

const COLORS = ['rgba(122,158,104,0.35)', 'rgba(88,120,72,0.25)', 'rgba(212,145,58,0.2)']

export default function FloatingLeaves({ className, count = 8 }: FloatingLeavesProps) {
  const items = Array.from({ length: count }, (_, i) => ({
    top:   `${15 + Math.sin(i * 1.9) * 35 + 35}%`,
    left:  `${(i / count) * 92 + 3}%`,
    size:  14 + (i % 3) * 7,
    dur:   7 + (i % 4) * 2.5,
    delay: i * 0.7,
    path:  i % SHAPES.length,
    color: COLORS[i % COLORS.length],
    anim:  i % 2 === 0 ? 'floatY' : 'driftSlow',
  }))

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none select-none', className)}>
      {items.map((el, i) => (
        <svg
          key={i}
          width={el.size}
          height={el.size}
          viewBox="0 0 20 20"
          className="absolute"
          style={{
            top: el.top,
            left: el.left,
            fill: el.color,
            animation: `${el.anim} ${el.dur}s ease-in-out infinite`,
            animationDelay: `${el.delay}s`,
          }}
        >
          <path d={SHAPES[el.path]} />
        </svg>
      ))}
    </div>
  )
}
