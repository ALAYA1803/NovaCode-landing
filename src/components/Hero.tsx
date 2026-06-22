import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import DashboardMockup from './DashboardMockup'

/* ─────────────────────────────────────────────
   Counter — eased rAF loop, no external deps
───────────────────────────────────────────── */
function animateCounter(el: HTMLElement, target: number, duration: number) {
  let start: number | null = null
  const tick = (ts: number) => {
    if (!start) start = ts
    const p = Math.min((ts - start) / duration, 1)
    el.textContent = String(Math.floor((1 - Math.pow(1 - p, 4)) * target))
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/* ─────────────────────────────────────────────
   Metric data
───────────────────────────────────────────── */
interface Metric {
  value: number
  prefix?: string
  suffix?: string
  label: string
  duration: number
}

const METRICS: Metric[] = [
  { prefix: '+', value: 120, label: 'Proyectos entregados', duration: 2000 },
  { suffix: '+', value: 8, label: 'Años de operación', duration: 2200 },
  { suffix: '%', value: 98, label: 'Retención de clientes', duration: 2400 },
  { value: 14, label: 'Sectores atendidos', duration: 2600 },
]

/* ─────────────────────────────────────────────
   Hero
───────────────────────────────────────────── */
export default function Hero() {
  const metricsRef = useRef<HTMLDivElement>(null)
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [counted, setCounted] = useState(false)

  useEffect(() => {
    const el = metricsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          setCounted(true)
          METRICS.forEach((m, i) => {
            const span = spanRefs.current[i]
            if (span) animateCounter(span, m.value, m.duration)
          })
          obs.unobserve(el)
        }
      },
      { threshold: 0.5 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [counted])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden"
      style={{ padding: '128px 24px 96px', background: 'var(--bg-primary)' }}
      aria-label="Propuesta de valor"
    >

      {/* ── Atmospheric depth — warm terracota whisper at top ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(217,119,87,0.04) 0%, transparent 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full" style={{ maxWidth: 840 }}>

        {/* Eyebrow — editorial, no neon pill */}
        <div
          className="hero-badge-anim hero-eyebrow justify-center mb-10"
          role="text"
        >
          <span className="hero-eyebrow-line" aria-hidden="true" />
          <span className="hero-eyebrow-text">Consultoría de Software End-to-End</span>
          <span className="hero-eyebrow-line" aria-hidden="true" />
        </div>

        {/* Headline — typographic contrast: weight, not color */}
        <h1
          className="hero-headline-anim"
          style={{
            fontSize: 'clamp(38px, 5.8vw, 74px)',
            lineHeight: 1.06,
            marginBottom: 32,
          }}
        >
          <span className="hero-headline-soft">
            Tú pones la visión empresarial.
          </span>
          <span className="hero-headline-bold">
            Nosotros construimos la tecnología.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="hero-sub-anim mx-auto"
          style={{
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            maxWidth: 580,
            marginBottom: 56,
            lineHeight: 1.75,
          }}
        >
          Consultoría y desarrollo de software End-to-End. Transformamos problemas
          complejos de negocio en ecosistemas digitales escalables.
        </p>

        {/* CTAs — white primary, text-only secondary */}
        <div
          className="hero-actions-anim flex items-center justify-center flex-wrap"
          style={{ gap: 8 }}
        >
          <a
            href="#contacto"
            className="btn-hero-primary"
            aria-label="Agendar asesoría gratuita"
          >
            Agendar Asesoría Gratuita
            <ArrowRight size={16} aria-hidden="true" />
          </a>

          <a
            href="#estimador"
            className="btn-hero-ghost"
            aria-label="Estimar mi proyecto"
          >
            Estimar mi Proyecto
            <ArrowRight
              size={14}
              aria-hidden="true"
              style={{ opacity: 0.5 }}
            />
          </a>
        </div>

        {/* Metrics — numbers in primary white, no neon accent */}
        <div
          ref={metricsRef}
          className="hero-metrics-anim flex items-center justify-center flex-wrap"
          style={{
            gap: '40px 48px',
            marginTop: 88,
            paddingTop: 48,
            borderTop: '1px solid var(--border)',
          }}
          role="list"
          aria-label="Métricas de NovaCode"
        >
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className="flex items-center gap-12"
            >
              <div
                className="text-center"
                style={{ minWidth: 80 }}
                role="listitem"
              >
                <div className="hero-metric-value">
                  {m.prefix ?? ''}
                  <span ref={(el) => { spanRefs.current[i] = el }}>
                    {m.value}
                  </span>
                  {m.suffix ?? ''}
                </div>
                <div className="hero-metric-label">{m.label}</div>
              </div>

              {/* Separator — only between items, hidden on mobile */}
              {i < METRICS.length - 1 && (
                <div
                  className="hero-metric-sep hidden sm:block"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Dashboard Mockup ── */}
      <div
        className="hero-dashboard-anim relative z-10 mt-24 w-[92%] sm:w-[84%] lg:w-[72%] max-w-4xl mx-auto"
        aria-label="Vista previa del estimador de alcance"
        role="img"
      >
        <DashboardMockup />
      </div>
    </section>
  )
}
