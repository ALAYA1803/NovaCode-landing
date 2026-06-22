import { MessageSquare, LayoutDashboard, Code2, Activity } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface Step {
  idx: string
  Icon: typeof MessageSquare
  title: string
  desc: string
}

const STEPS: Step[] = [
  {
    idx: '01',
    Icon: MessageSquare,
    title: 'Escucha Activa',
    desc: 'Entendemos el negocio antes de escribir una línea de código. Mapeamos objetivos, restricciones y expectativas reales.',
  },
  {
    idx: '02',
    Icon: LayoutDashboard,
    title: 'Arquitectura',
    desc: 'Diseñamos el sistema con visión de largo plazo. Decisiones de stack, estructura de datos y flujos de integración documentados.',
  },
  {
    idx: '03',
    Icon: Code2,
    title: 'Desarrollo',
    desc: 'Ingeniería ágil con ciclos cortos, revisiones continuas y entrega incremental. El cliente ve avance real, no promesas.',
  },
  {
    idx: '04',
    Icon: Activity,
    title: 'Lanzamiento',
    desc: 'Despliegue controlado, monitoreo activo y transferencia de conocimiento al equipo interno. El sistema crece con el negocio.',
  },
]

export default function Process() {
  const tagRef = useScrollReveal()
  const titleRef = useScrollReveal()
  const descRef = useScrollReveal()
  const s0 = useScrollReveal()
  const s1 = useScrollReveal()
  const s2 = useScrollReveal()
  const s3 = useScrollReveal()
  const stepRefs = [s0, s1, s2, s3]

  return (
    <section
      id="proceso"
      style={{ background: 'var(--bg-primary)', padding: '112px 0' }}
      aria-labelledby="process-title"
    >
      <div className="max-w-[1160px] mx-auto px-6">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 72 }}>
          <div ref={tagRef} className="section-tag reveal">Cómo trabajamos</div>
          <h2
            ref={titleRef}
            id="process-title"
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
            Metodología sin ambigüedades
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
            Un proceso estructurado que convierte la incertidumbre inicial en software que funciona y escala.
          </p>
        </div>

        {/* Flow */}
        <div
          className="process-flow-wrap grid"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
          role="list"
          aria-label="Pasos del proceso"
        >
          {STEPS.map((step, i) => {
            const Icon = step.Icon
            const delays = [80, 160, 240, 320]
            return (
              <div
                key={step.idx}
                ref={stepRefs[i]}
                className="reveal flex flex-col items-center text-center px-5 relative z-10 group"
                style={{ transitionDelay: `${delays[i]}ms` }}
                role="listitem"
              >
                {/* Circle */}
                <div
                  className="flex flex-col items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    width: 104,
                    height: 104,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-light)',
                    marginBottom: 32,
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = 'rgba(217,119,87,0.45)'
                    el.style.boxShadow = '0 0 0 6px rgba(217,119,87,0.06), 0 4px 24px rgba(0,0,0,0.07)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = 'var(--border-light)'
                    el.style.boxShadow = ''
                  }}
                  aria-hidden="true"
                >
                  <Icon
                    size={28}
                    style={{ color: 'var(--accent)', strokeWidth: 1.8 }}
                  />
                  <span
                    className="mt-1 font-medium"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      color: 'var(--accent)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {step.idx}
                  </span>
                </div>

                <h3
                  className="font-bold"
                  style={{
                    fontSize: 17,
                    color: 'var(--text-primary)',
                    marginBottom: 10,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
