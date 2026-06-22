import { useEffect, useRef, useState, type ElementType } from 'react'
import {
  Lock,
  CheckSquare,
  Square,
  BarChart2,
  Layers,
  Code2,
  Rocket,
} from 'lucide-react'

/* ─── Types ─── */

interface SidebarItem {
  id: string
  label: string
  step: string
  icon: ElementType
  active?: boolean
}

interface ModuleCard {
  id: string
  title: string
  description: string
  checked: boolean
}

/* ─── Data ─── */

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'auditoria', step: '1', label: 'Auditoría', icon: BarChart2 },
  { id: 'arquitectura', step: '2', label: 'Arquitectura', icon: Layers },
  { id: 'desarrollo', step: '3', label: 'Desarrollo', icon: Code2, active: true },
  { id: 'despliegue', step: '4', label: 'Despliegue', icon: Rocket },
]

const MODULE_CARDS: ModuleCard[] = [
  {
    id: 'frontend',
    title: 'Frontend Web',
    description: 'Aplicación React / Next.js optimizada para rendimiento y SEO',
    checked: true,
  },
  {
    id: 'mobile',
    title: 'App Móvil',
    description: 'iOS y Android con React Native o Flutter según stack existente',
    checked: false,
  },
  {
    id: 'backend',
    title: 'Backend API',
    description: 'Microservicios REST / GraphQL con autenticación y rate-limiting',
    checked: true,
  },
]

/* ─── Stat cell ─── */

function StatCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-3 px-2 text-center">
      <span className="text-lg font-semibold leading-none" style={{ color: '#dce7f0' }}>
        {value}
      </span>
      <span
        className="text-[9px] tracking-wider uppercase mt-1 font-medium"
        style={{ color: '#4d6580' }}
      >
        {label}
      </span>
    </div>
  )
}

/* ─── ScaledDashboard ─── */

const DESIGN_WIDTH = 896

function ScaledDashboard({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [designHeight, setDesignHeight] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const inner = innerRef.current
    if (!container || !inner) return

    const update = () => {
      const w = container.getBoundingClientRect().width
      const s = w / DESIGN_WIDTH
      setScale(s)
      setDesignHeight(inner.scrollHeight)
    }

    const ro = new ResizeObserver(update)
    ro.observe(container)
    update()
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={containerRef} style={{ height: designHeight * scale }}>
      <div
        ref={innerRef}
        style={{
          width: DESIGN_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* ─── Main export ─── */

export default function DashboardMockup() {
  return (
    <ScaledDashboard>
      {/* Browser chrome */}
      <div
        className="rounded-t-xl overflow-hidden text-left"
        style={{
          background: '#0F1423',
          boxShadow: '0 -20px 80px rgba(217,119,87,0.15)',
          outline: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center px-4 py-2.5 relative"
          style={{ background: '#151B2B', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full block" style={{ background: '#ff5f57' }} />
            <span className="w-2.5 h-2.5 rounded-full block" style={{ background: '#febc2e' }} />
            <span className="w-2.5 h-2.5 rounded-full block" style={{ background: '#28c840' }} />
          </div>

          {/* URL bar */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-md px-6 py-1"
            style={{
              background: '#0B0F19',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <Lock className="w-3 h-3 shrink-0" style={{ color: '#4d6580' }} />
            <span className="text-[10px]" style={{ color: '#4d6580', whiteSpace: 'nowrap' }}>
              estimator.novacode.dev
            </span>
          </div>
        </div>

        {/* Dashboard body */}
        <div className="flex">
          {/* Sidebar */}
          <aside
            className="px-4 py-5 shrink-0"
            style={{
              width: '25%',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(11,15,25,0.5)',
            }}
            aria-label="Fases del proyecto"
          >
            <p
              className="text-[10px] uppercase tracking-widest font-semibold mb-4"
              style={{ color: '#4d6580' }}
            >
              Fases del proyecto
            </p>
            <nav className="flex flex-col gap-1">
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-[11px] font-medium"
                    style={
                      item.active
                        ? {
                          background: 'rgba(217,119,87,0.1)',
                          color: '#d97757',
                          borderLeft: '2px solid #d97757',
                          borderRadius: '0 6px 6px 0',
                          paddingLeft: 10,
                        }
                        : { color: '#7a8fa6' }
                    }
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {item.step}. {item.label}
                    </span>
                  </div>
                )
              })}
            </nav>
          </aside>

          {/* Content */}
          <main className="p-6" style={{ width: '75%' }}>
            <div className="mb-6">
              <h2 className="text-lg font-medium leading-snug" style={{ color: '#dce7f0' }}>
                Configurador de Arquitectura
              </h2>
              <p className="text-xs mt-0.5" style={{ color: '#7a8fa6' }}>
                Selecciona los módulos requeridos
              </p>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 divide-x rounded-lg mb-6"
              style={{
                background: 'rgba(255,255,255,0.02)',
                outline: '1px solid rgba(255,255,255,0.05)',
                borderColor: 'rgba(255,255,255,0.05)',
              }}
            >
              <StatCell value="3–4 Meses" label="Estimado" />
              <StatCell value="Alta" label="Complejidad" />
              <StatCell value="99.9%" label="SLA Uptime" />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-3 gap-3">
              {MODULE_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="rounded-lg p-4 cursor-pointer transition-colors duration-150"
                  style={{
                    background: '#0B0F19',
                    border: `1px solid ${card.checked ? 'rgba(217,119,87,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor = '#d97757')
                  }
                  onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor =
                    card.checked ? 'rgba(217,119,87,0.4)' : 'rgba(255,255,255,0.08)')
                  }
                >
                  {card.checked ? (
                    <CheckSquare className="w-4 h-4 mb-2.5 shrink-0" style={{ color: '#d97757' }} />
                  ) : (
                    <Square className="w-4 h-4 mb-2.5 shrink-0" style={{ color: '#4d6580' }} />
                  )}
                  <p className="text-sm font-medium leading-snug mb-1" style={{ color: '#dce7f0' }}>
                    {card.title}
                  </p>
                  <p className="text-[11px] leading-relaxed" style={{ color: '#7a8fa6' }}>
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </ScaledDashboard>
  )
}
