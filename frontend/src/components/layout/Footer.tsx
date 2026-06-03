const SOCIAL_LINKS = [
  {
    href: 'https://www.instagram.com/rakhat_glamping',
    handle: '@rakhat_glamping',
    platform: 'Instagram',
  },
  {
    href: 'https://www.instagram.com/na__paxate',
    handle: '@na__paxate',
    platform: 'Instagram',
  },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#2A1A08' }}>

      {/* Smooth transition from LocationSection (#F2E9D6) into dark footer */}
      <div className="w-full overflow-hidden leading-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: 60, fill: '#F2E9D6' }}
        >
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="px-8 sm:px-12 lg:px-24 py-16">

        {/* Three-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand column */}
          <div className="space-y-4">
            <div>
              <h2
                className="font-display text-3xl leading-tight"
                style={{ color: '#FAF7F1' }}
              >
                Рахат
              </h2>
              <p
                className="font-display-sc text-xs tracking-[0.4em]"
                style={{ color: '#D4913A' }}
              >
                Глэмпинг
              </p>
            </div>
            <p
              className="font-display text-sm italic leading-relaxed max-w-xs"
              style={{ color: 'rgba(250,247,241,0.55)' }}
            >
              «Место силы, где сплетается шум воды, комфорт и красивые рассветы»
            </p>

            {/* No-alcohol badge */}
            <div className="flex items-center gap-2 pt-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <circle cx="6" cy="6" r="5" stroke="#7A9E68" strokeWidth="1" />
                <circle cx="6" cy="6" r="2" fill="#7A9E68" />
              </svg>
              <span
                className="font-display-sc text-xs tracking-widest"
                style={{ color: '#7A9E68' }}
              >
                Без алкоголя
              </span>
            </div>
          </div>

          {/* Contacts column */}
          <div>
            <h3
              className="font-display-sc text-xs tracking-[0.35em] mb-5"
              style={{ color: '#D4913A' }}
            >
              Контакты
            </h3>
            <address className="not-italic space-y-3">
              <p className="text-sm" style={{ color: 'rgba(250,247,241,0.6)' }}>
                41-й разъезд, 120Б, Актобе
              </p>
              <a
                href="tel:+77075042088"
                className="block text-sm transition-opacity hover:opacity-90"
                style={{ color: 'rgba(250,247,241,0.7)' }}
              >
                +7 (707) 504-20-88
              </a>
              <a
                href="https://2gis.kz/aktobe/firm/70000001090131557"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-display-sc text-xs tracking-wider transition-opacity hover:opacity-90"
                style={{ color: 'rgba(212,145,58,0.75)' }}
              >
                2ГИС &#9733; 4.4 / 5
              </a>
            </address>
          </div>

          {/* Socials column */}
          <div>
            <h3
              className="font-display-sc text-xs tracking-[0.35em] mb-5"
              style={{ color: '#D4913A' }}
            >
              Соцсети
            </h3>
            <ul className="space-y-3 list-none" role="list">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.platform}: ${s.handle}`}
                    className="flex items-center gap-3 font-display-sc text-xs tracking-wider transition-opacity hover:opacity-90 group"
                    style={{ color: 'rgba(250,247,241,0.6)' }}
                  >
                    {/* Instagram icon */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-50 group-hover:opacity-80 transition-opacity"
                      aria-hidden="true"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                    {s.handle}
                  </a>
                </li>
              ))}
              <li>
                <p
                  className="flex items-center gap-3 font-display-sc text-xs tracking-wider"
                  style={{ color: 'rgba(250,247,241,0.35)' }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="opacity-40"
                    aria-hidden="true"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
                  </svg>
                  TikTok: @rakhat_glamping
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(250,247,241,0.1)' }}
        >
          <p
            className="font-display-sc text-xs tracking-wider"
            style={{ color: 'rgba(250,247,241,0.25)' }}
          >
            &copy; {year} Рахат Глэмпинг
          </p>
          <p
            className="font-display-sc text-xs tracking-wider"
            style={{ color: 'rgba(250,247,241,0.2)' }}
          >
            2 филиала &middot; Актобе
          </p>
        </div>
      </div>
    </footer>
  )
}
