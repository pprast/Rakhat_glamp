import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { cn } from '@/utils/cn'

const NAV_LINKS = [
  { href: '/#cabins',    label: 'Домики'   },
  { href: '/#amenities', label: 'Удобства' },
  { href: '/#water',     label: 'Пляж'     },
  { href: '/#reviews',   label: 'Отзывы'   },
  { href: '/#location',  label: 'Контакты' },
] as const

export default function Navbar() {
  const { isScrolled } = useScrollPosition()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      role="navigation"
      aria-label="Главное меню"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'py-3 border-b border-stone/40' : 'py-5'
      )}
      style={
        isScrolled
          ? {
              background: 'rgba(250,247,241,0.95)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 20px rgba(90,58,24,0.08)',
            }
          : {}
      }
    >
      <div className="flex items-center justify-between px-8 sm:px-12 lg:px-16">

        {/* Logo */}
        <Link
          to="/"
          className="flex flex-col leading-none group"
          aria-label="Рахат Глэмпинг — на главную"
        >
          <span
            className="font-display text-ink transition-colors duration-300 group-hover:text-earth"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
          >
            Рахат
          </span>
          <span className="font-display-sc text-sun text-[10px] tracking-[0.4em]">
            Глэмпинг
          </span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden lg:flex items-center gap-8 list-none" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-display-sc text-clay hover:text-sun text-xs tracking-widest transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-sun transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link to="/book">
            <button
              className="font-display-sc text-xs tracking-[0.2em] px-6 py-3 transition-all duration-300"
              style={{ background: 'var(--color-sun)', color: '#FFFDF8' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#C07030')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-sun)')}
            >
              Забронировать
            </button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={cn(
              'block w-6 h-0.5 bg-ink transition-all duration-300 origin-center',
              menuOpen ? 'rotate-45 translate-y-[7px]' : ''
            )}
          />
          <span
            className={cn(
              'block w-6 h-0.5 bg-ink transition-all duration-300',
              menuOpen ? 'opacity-0 scale-x-0' : ''
            )}
          />
          <span
            className={cn(
              'block w-6 h-0.5 bg-ink transition-all duration-300 origin-center',
              menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            )}
          />
        </button>
      </div>

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-500 ease-in-out',
          menuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        )}
        aria-hidden={!menuOpen}
      >
        <div
          className="px-8 py-6 border-t border-stone/40 flex flex-col gap-5"
          style={{ background: 'rgba(250,247,241,0.98)' }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display-sc text-earth text-sm tracking-widest hover:text-sun transition-colors duration-200 py-1"
            >
              {link.label}
            </a>
          ))}

          <div className="h-px my-1" style={{ background: 'rgba(208,191,168,0.4)' }} />

          <Link to="/book" onClick={() => setMenuOpen(false)}>
            <button
              className="w-full py-4 font-display-sc text-xs tracking-[0.2em] transition-all duration-300"
              style={{ background: 'var(--color-sun)', color: '#FFFDF8' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#C07030')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-sun)')}
            >
              Забронировать
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
