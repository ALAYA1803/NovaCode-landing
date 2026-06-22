import { Info, Code2, Wrench } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface ServiceData {
  num: string
  Icon: typeof Info
  title: string
  desc: string
  tags: string[]
}

const SERVICES: ServiceData[] = [
  {
    num: '01',
    Icon: Info,
    title: 'Asesoría Tecnológica',
    desc: 'Realizamos auditorías exhaustivas de su arquitectura actual, identificamos cuellos de botella y diseñamos la hoja de ruta tecnológica alineada a sus objetivos de negocio a largo plazo.',
    tags: ['Auditoría de Sistemas', 'Arquitectura Cloud', 'Due Diligence', 'Roadmap Tech'],
  },
  {
    num: '02',
    Icon: Code2,
    title: 'Desarrollo a Medida',
    desc: 'Ingeniería de software de alto rendimiento construida desde cero. Desde APIs de misión crítica hasta plataformas SaaS completas, nuestros equipos entregan con rigor y velocidad de startup.',
    tags: ['Backend / APIs', 'Plataformas Web', 'Apps Móviles', 'Microservicios'],
  },
  {
    num: '03',
    Icon: Wrench,
    title: 'Rescate de Proyectos',
    desc: 'Tomamos el control de proyectos en crisis. Diagnosticamos deuda técnica, refactorizamos código heredado, estabilizamos sistemas frágiles y devolvemos la capacidad de evolucionar al equipo.',
    tags: ['Refactorización', 'Deuda Técnica', 'Performance', 'Migración'],
  },
]

export default function Services() {
  const tagRef = useScrollReveal()
  const titleRef = useScrollReveal()
  const descRef = useScrollReveal()
  const card0 = useScrollReveal()
  const card1 = useScrollReveal()
  const card2 = useScrollReveal()
  const cardRefs = [card0, card1, card2]

  return (
    <section
      id="servicios"
      className="services-section"
      style={{ background: 'var(--bg-secondary)', padding: '112px 0' }}
      aria-labelledby="services-title"
    >
      <div className="max-w-[1160px] mx-auto px-6">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 72 }}>
          <div ref={tagRef} className="section-tag reveal">Qué hacemos</div>
          <h2
            ref={titleRef}
            id="services-title"
            className="reveal font-extrabold"
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              color: 'var(--text-primary)',
              marginBottom: 18,
              transitionDelay: '80ms',
            }}
          >
            Soluciones diseñadas para<br />la realidad de su negocio
          </h2>
          <p
            ref={descRef}
            className="reveal mx-auto"
            style={{
              fontSize: 17,
              color: 'var(--text-secondary)',
              maxWidth: 520,
              lineHeight: 1.7,
              transitionDelay: '160ms',
            }}
          >
            Tres pilares de servicio enfocados en resolver el problema raíz, no en aplicar parches tecnológicos.
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          {SERVICES.map((s, i) => {
            const Icon = s.Icon
            const delays = [80, 160, 240]
            return (
              <article
                key={s.num}
                ref={cardRefs[i]}
                className="service-card reveal rounded-[20px] p-10 transition-all duration-300 cursor-default focus:outline-none"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  transitionDelay: `${delays[i]}ms`,
                }}
                tabIndex={0}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(217,119,87,0.3)'
                  el.style.transform = 'translateY(-3px)'
                  el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.06), 0 0 0 1px rgba(217,119,87,0.12)'
                  el.style.background = 'var(--bg-card-hover)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'var(--border)'
                  el.style.transform = ''
                  el.style.boxShadow = ''
                  el.style.background = 'var(--bg-card)'
                }}
              >
                {/* Step number */}
                <span
                  className="absolute top-8 right-8 font-medium"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                  }}
                  aria-hidden="true"
                >
                  {s.num}
                </span>

                {/* Icon */}
                <div
                  className="flex items-center justify-center rounded-[14px] transition-all duration-300"
                  style={{
                    width: 52,
                    height: 52,
                    background: 'var(--accent-glow)',
                    border: '1px solid rgba(217,119,87,0.18)',
                    marginBottom: 28,
                  }}
                  aria-hidden="true"
                >
                  <Icon
                    size={24}
                    style={{ color: 'var(--accent)', strokeWidth: 1.8 }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-bold"
                  style={{
                    fontSize: 21,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    marginBottom: 14,
                  }}
                >
                  {s.title}
                </h3>

                {/* Desc */}
                <p
                  style={{
                    fontSize: 15,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    marginBottom: 28,
                  }}
                >
                  {s.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2" aria-label="Tecnologías y áreas">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--text-muted)',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--border)',
                        padding: '4px 10px',
                        borderRadius: 4,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
