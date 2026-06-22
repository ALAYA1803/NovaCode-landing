/* ─── Footer column ─── */

interface FooterCol {
  heading: string
  links: { label: string; href: string }[]
}

const COLS: FooterCol[] = [
  {
    heading: 'Servicios',
    links: [
      { label: 'Asesoría Tecnológica', href: '#servicios' },
      { label: 'Desarrollo a Medida', href: '#servicios' },
      { label: 'Rescate de Proyectos', href: '#servicios' },
    ],
  },
  {
    heading: 'Empresa',
    links: [
      { label: 'Metodología', href: '#proceso' },
      { label: 'Estimador', href: '#estimador' },
      { label: 'Contacto', href: '#contacto' },
    ],
  },
  {
    heading: 'Recursos',
    links: [
      { label: 'Casos de Estudio', href: '#' },
      { label: 'Blog Técnico', href: '#' },
      { label: 'Política de Privacidad', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        padding: '64px 0 36px',
      }}
    >
      <div className="max-w-[1160px] mx-auto px-6">
        {/* Grid */}
        <div
          className="grid gap-12 mb-14"
          style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}
        >
          {/* Brand */}
          <div>
            <a
              href="#hero"
              className="flex items-center gap-2.5 no-underline"
              aria-label="NovaCode — inicio"
            >
              <img
                src="./src/shared/logo-novacode-negro.png"
                alt="NovaCode"
                style={{ height: 32, width: 'auto', display: 'block' }}
              />
              <span
                className="font-bold"
                style={{ fontSize: 17, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
              >
                Nova<span style={{ color: 'var(--accent)' }}>Code</span>
              </span>
            </a>
            <p
              className="mt-4"
              style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 280 }}
            >
              Consultoría y desarrollo de software End-to-End. Transformamos problemas complejos de negocio en ecosistemas digitales escalables.
            </p>
          </div>

          {/* Nav columns */}
          {COLS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h4
                className="font-semibold uppercase mb-4"
                style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.06em',
                }}
              >
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5 list-none">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="no-underline transition-colors duration-150"
                      style={{ fontSize: 14, color: 'var(--text-muted)' }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)')
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)')
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between flex-wrap gap-3 pt-7"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            &copy; 2025{' '}
            <a
              href="#hero"
              className="no-underline transition-colors duration-150"
              style={{ color: 'var(--accent)' }}
            >
              NovaCode
            </a>
            . Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {['Privacidad', 'Términos', 'Cookies'].map((label) => (
              <a
                key={label}
                href="#"
                className="no-underline transition-colors duration-150"
                style={{ fontSize: 13, color: 'var(--text-muted)' }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)')
                }
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
