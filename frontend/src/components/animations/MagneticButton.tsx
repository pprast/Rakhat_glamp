import { useRef } from 'react'
import type { ReactNode, MouseEvent } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  strength?: number
  className?: string
}

export default function MagneticButton({
  children,
  strength = 0.3,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    el.style.transition = 'transform 0.1s ease'
  }

  const handleMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
    el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ display: 'inline-block' }}
    >
      {children}
    </div>
  )
}
