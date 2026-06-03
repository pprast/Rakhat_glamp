import { cn } from '@/utils/cn'

interface SectionDividerProps {
  fromColor?: string
  toColor?: string
  flip?: boolean
  className?: string
  variant?: 'wave' | 'slope' | 'curve' | 'gentle'
}

export default function SectionDivider({
  fromColor = '#F2E9D6',
  toColor = '#FAF7F1',
  flip = false,
  className,
  variant = 'gentle',
}: SectionDividerProps) {
  const paths: Record<string, string> = {
    wave:   'M0,40 C240,0 480,80 720,40 C960,0 1200,60 1440,30 L1440,80 L0,80 Z',
    slope:  'M0,80 L1440,20 L1440,80 L0,80 Z',
    curve:  'M0,60 Q720,-20 1440,60 L1440,80 L0,80 Z',
    gentle: 'M0,50 C360,80 720,20 1080,50 C1260,65 1380,35 1440,50 L1440,80 L0,80 Z',
  }

  return (
    <div
      className={cn('w-full overflow-hidden leading-none', className)}
      style={{
        background: fromColor,
        transform: flip ? 'scaleY(-1)' : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height: 70, fill: toColor }}
      >
        <path d={paths[variant]} />
      </svg>
    </div>
  )
}
