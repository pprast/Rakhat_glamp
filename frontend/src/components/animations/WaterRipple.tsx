import { cn } from '@/utils/cn'

interface WaterRippleProps {
  className?: string
  color?: string
  count?: number
}

export default function WaterRipple({
  className,
  color = 'rgba(232,184,109,0.15)',
  count = 4,
}: WaterRippleProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* Primary ripple cluster — bottom-right */}
      <svg
        viewBox="0 0 400 300"
        className="absolute bottom-0 right-0 w-2/3 h-2/3 opacity-40"
        style={{ transform: 'translate(20%, 20%)' }}
        aria-hidden="true"
      >
        {Array.from({ length: count }).map((_, i) => (
          <ellipse
            key={i}
            cx="200"
            cy="150"
            rx={60 + i * 40}
            ry={30 + i * 20}
            fill="none"
            stroke={color}
            strokeWidth="1"
            style={{
              animation: `ripple ${3 + i * 0.8}s ease-out infinite`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </svg>

      {/* Secondary ripple cluster — top-left, subtler */}
      <svg
        viewBox="0 0 300 200"
        className="absolute top-1/4 left-0 w-1/3 h-1/3 opacity-20"
        style={{ transform: 'translate(-30%, 0)' }}
        aria-hidden="true"
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <ellipse
            key={i}
            cx="150"
            cy="100"
            rx={40 + i * 30}
            ry={20 + i * 15}
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            style={{
              animation: `rippleSlow ${4 + i}s ease-out infinite`,
              animationDelay: `${i * 0.9 + 0.5}s`,
            }}
          />
        ))}
      </svg>

      {/* Tertiary accent ripple — center-left, very faint */}
      <svg
        viewBox="0 0 200 150"
        className="absolute top-1/2 left-1/3 w-1/4 h-1/4 opacity-10"
        style={{ transform: 'translate(-50%, -50%)' }}
        aria-hidden="true"
      >
        {Array.from({ length: 2 }).map((_, i) => (
          <ellipse
            key={i}
            cx="100"
            cy="75"
            rx={30 + i * 25}
            ry={15 + i * 12}
            fill="none"
            stroke={color}
            strokeWidth="0.6"
            style={{
              animation: `ripple ${5 + i * 1.2}s ease-out infinite`,
              animationDelay: `${i * 1.1 + 1.2}s`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
