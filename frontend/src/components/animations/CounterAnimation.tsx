import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/utils/cn'

gsap.registerPlugin(ScrollTrigger)

interface CounterAnimationProps {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  decimals?: number
}

export default function CounterAnimation({
  target,
  duration = 2,
  suffix = '',
  prefix = '',
  className,
  decimals = 0,
}: CounterAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obj = { val: 0 }

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = `${prefix}${obj.val
            .toFixed(decimals)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}${suffix}`
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      })
    }, el)

    el.textContent = `${prefix}0${suffix}`

    return () => ctx.revert()
  }, [target, duration, suffix, prefix, decimals])

  return <span ref={ref} className={cn(className)} />
}
