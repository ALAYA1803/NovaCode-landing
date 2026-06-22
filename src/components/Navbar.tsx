import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Estimador', href: '#estimador' },
  { label: 'Contacto', href: '#contacto' },
] as const


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] px-6 transition-all duration-300"
      style={
        scrolled
          ? {
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border)',
          }
          : undefined
      }
      aria-label="Navegación principal"
    >
      <div
        className="max-w-[1160px] mx-auto flex items-center justify-between"
        style={{ height: 72 }}
      >
        {/* Logo */}
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
            style={{
              fontSize: 17,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Nova<span style={{ color: 'var(--accent)' }}>Code</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-9 list-none">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium no-underline transition-colors duration-150"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--text-primary)')
                }
                onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--text-secondary)')
                }
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contacto"
              className="text-sm font-semibold rounded-md no-underline transition-all duration-150"
              style={{
                background: 'var(--text-primary)',
                color: 'var(--bg-primary)',
                padding: '9px 20px',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = '#2a2a2a'
                el.style.transform = 'translateY(-1px)'
                el.style.boxShadow = '0 6px 20px rgba(217,119,87,0.25)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'var(--accent)'
                el.style.transform = ''
                el.style.boxShadow = ''
              }}
            >
              Agendar Asesoría
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex items-center justify-center rounded-md text-nc-text transition-colors"
          style={{ width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden mobile-nav-open flex flex-col gap-5 px-6 pb-6 pt-2"
          style={{
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium no-underline"
              style={{ color: 'var(--text-secondary)' }}
              onClick={closeMenu}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="text-sm font-semibold rounded-md no-underline text-center"
            style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '10px 20px' }}
            onClick={closeMenu}
          >
            Agendar Asesoría
          </a>
        </div>
      )}
    </nav>
  )
}
