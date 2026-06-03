import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'outline' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-sans font-medium transition-all duration-300 cursor-pointer select-none'
    const sizes = {
      sm: 'px-4 py-2 text-sm tracking-wide',
      md: 'px-8 py-3.5 text-sm tracking-widest',
      lg: 'px-12 py-5 text-base tracking-widest',
    }
    const variants: Record<Variant, string> = {
      primary: 'bg-dawn text-abyss hover:bg-sunrise active:scale-95 font-semibold uppercase',
      outline: 'border border-dawn text-dawn hover:bg-dawn hover:text-abyss uppercase',
      ghost: 'text-mist hover:text-dawn uppercase',
    }
    return (
      <button ref={ref} className={cn(base, sizes[size], variants[variant], className)} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
