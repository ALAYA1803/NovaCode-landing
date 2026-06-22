import { useState } from 'react'
import { ArrowRight, Check, ClipboardCheck } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

/* ─── Types ─── */

type WizardPhase = 1 | 2 | 3 | 'result' | 'success'

interface WizardAnswers {
  step1: string
  step2: string
  step3: string
}

/* ─── Label maps ─── */

const LABEL_MAP: Record<string, string> = {
  new: 'Crear producto nuevo',
  improve: 'Mejorar producto existente',
  web: 'Plataforma Web',
  mobile: 'Aplicación Móvil',
  ecosystem: 'Ecosistema Completo',
  idea: 'Tengo la idea',
  design: 'Tengo el diseño',
  prototype: 'Tengo un prototipo',
}

/* ─── Sub-components ─── */

interface OptionProps {
  label: string
  sub: string
  selected: boolean
  onSelect: () => void
}

function WizardOption({ label, sub, selected, onSelect }: OptionProps) {
  return (
    <button
      type="button"
      className="wizard-step-active flex items-center gap-3.5 w-full text-left rounded-xl transition-all duration-150"
      style={{
        padding: '16px 20px',
        border: `1px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
        background: selected ? 'var(--accent-glow-strong)' : 'transparent',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          const el = e.currentTarget
          el.style.borderColor = 'rgba(217,119,87,0.4)'
          el.style.background = 'var(--accent-glow)'
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          const el = e.currentTarget
          el.style.borderColor = 'var(--border)'
          el.style.background = 'transparent'
        }
      }}
      onClick={onSelect}
      role="radio"
      aria-checked={selected}
    >
      {/* Radio indicator */}
      <span
        className="flex items-center justify-center shrink-0 rounded-full"
        style={{
          width: 18,
          height: 18,
          border: `2px solid ${selected ? 'var(--accent)' : 'var(--border-light)'}`,
          transition: 'border-color 150ms',
        }}
      >
        {selected && <span className="radio-dot" />}
      </span>

      <span>
        <span
          className="block font-medium transition-colors duration-150"
          style={{ fontSize: 14, color: selected ? 'var(--text-primary)' : 'var(--text-secondary)' }}
        >
          {label}
        </span>
        <span
          className="block mt-0.5"
          style={{ fontSize: 12, color: 'var(--text-muted)' }}
        >
          {sub}
        </span>
      </span>
    </button>
  )
}

/* ─── Progress bar ─── */

function ProgressBar({ phase }: { phase: WizardPhase }) {
  const pctMap: Record<WizardPhase, number> = { 1: 25, 2: 50, 3: 75, result: 100, success: 100 }
  const labelMap: Record<WizardPhase, string> = {
    1: 'Paso 1 de 3',
    2: 'Paso 2 de 3',
    3: 'Paso 3 de 3',
    result: 'Resumen',
    success: 'Completado',
  }
  const pct = pctMap[phase]

  return (
    <div className="flex items-center gap-2 mb-9" aria-label="Progreso del cuestionario">
      <div
        className="flex-1 rounded-sm overflow-hidden"
        style={{ height: 3, background: 'var(--border)' }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="wizard-progress-fill h-full rounded-sm"
          style={{
            width: `${pct}%`,
            background: 'var(--accent)',
            transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      </div>
      <span
        className="whitespace-nowrap"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em' }}
      >
        {labelMap[phase]}
      </span>
    </div>
  )
}

/* ─── Main Wizard component ─── */

export default function Wizard() {
  const [phase, setPhase] = useState<WizardPhase>(1)
  const [answers, setAnswers] = useState<WizardAnswers>({ step1: '', step2: '', step3: '' })
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState(false)

  const leftRef = useScrollReveal()
  const rightRef = useScrollReveal<HTMLDivElement>()

  const select = (step: keyof WizardAnswers, value: string) =>
    setAnswers((prev) => ({ ...prev, [step]: value }))

  const handleEmailSubmit = () => {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!ok) {
      setEmailErr(true)
      setTimeout(() => setEmailErr(false), 1800)
      return
    }
    setPhase('success')
  }

  return (
    <section
      id="estimador"
      className="estimator-section"
      style={{ background: 'var(--bg-secondary)', padding: '112px 0' }}
      aria-labelledby="estimator-title"
    >
      <div className="max-w-[1160px] mx-auto px-6">
        <div
          className="grid gap-20 items-center"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
        >
          {/* ── Left copy ── */}
          <div ref={leftRef} className="reveal-left">
            <div className="section-tag">Estimador de Alcance</div>
            <h2
              id="estimator-title"
              className="font-extrabold"
              style={{
                fontSize: 'clamp(26px, 3.5vw, 38px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: 'var(--text-primary)',
                marginBottom: 18,
              }}
            >
              Obtén un desglose técnico sin compromisos
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 32 }}>
              Responde tres preguntas sobre tu proyecto y recibe un análisis técnico inicial con estimado de tiempo directamente en tu correo.
            </p>

            {[
              'Sin costo y sin obligación de contratación',
              'Respuesta personalizada en menos de 24 horas hábiles',
              'Análisis realizado por ingenieros senior, no por algoritmos genéricos',
            ].map((text) => (
              <div key={text} className="flex items-start gap-3 mb-4">
                <Check
                  size={20}
                  className="shrink-0 mt-0.5"
                  style={{ color: 'var(--accent)', strokeWidth: 2 }}
                />
                <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* ── Right widget ── */}
          <div
            ref={rightRef}
            className="wizard-widget reveal-right rounded-[20px]"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              padding: 40,
            }}
            role="form"
            aria-label="Estimador de alcance de proyecto"
          >
            <ProgressBar phase={phase} />

            {/* STEP 1 */}
            {phase === 1 && (
              <div className="wizard-step-active" aria-label="Pregunta 1 de 3">
                <p className="font-semibold mb-2" style={{ fontSize: 17, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  ¿Cuál es el objetivo principal de su proyecto?
                </p>
                <p className="mb-6" style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Seleccione la opción que mejor describe su situación actual
                </p>
                <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="Objetivo principal">
                  <WizardOption
                    label="Crear un producto nuevo"
                    sub="Desarrollo desde cero de una idea o concepto de negocio"
                    selected={answers.step1 === 'new'}
                    onSelect={() => select('step1', 'new')}
                  />
                  <WizardOption
                    label="Mejorar un producto existente"
                    sub="Optimización, nuevas funciones o rescate de sistema actual"
                    selected={answers.step1 === 'improve'}
                    onSelect={() => select('step1', 'improve')}
                  />
                </div>
                <div className="flex items-center justify-between mt-7">
                  <span />
                  <NavNext disabled={!answers.step1} onNext={() => setPhase(2)} label="Siguiente" />
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {phase === 2 && (
              <div className="wizard-step-active" aria-label="Pregunta 2 de 3">
                <p className="font-semibold mb-2" style={{ fontSize: 17, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  ¿Cuál es la plataforma objetivo?
                </p>
                <p className="mb-6" style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Puede considerar una combinación; elija la prioridad principal
                </p>
                <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="Plataforma objetivo">
                  <WizardOption
                    label="Plataforma Web"
                    sub="Aplicación web, SaaS, portal o dashboard empresarial"
                    selected={answers.step2 === 'web'}
                    onSelect={() => select('step2', 'web')}
                  />
                  <WizardOption
                    label="Aplicación Móvil"
                    sub="iOS, Android o desarrollo multiplataforma"
                    selected={answers.step2 === 'mobile'}
                    onSelect={() => select('step2', 'mobile')}
                  />
                  <WizardOption
                    label="Ecosistema Completo"
                    sub="Web + móvil + APIs + integraciones de terceros"
                    selected={answers.step2 === 'ecosystem'}
                    onSelect={() => select('step2', 'ecosystem')}
                  />
                </div>
                <div className="flex items-center justify-between mt-7">
                  <NavBack onBack={() => setPhase(1)} />
                  <NavNext disabled={!answers.step2} onNext={() => setPhase(3)} label="Siguiente" />
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {phase === 3 && (
              <div className="wizard-step-active" aria-label="Pregunta 3 de 3">
                <p className="font-semibold mb-2" style={{ fontSize: 17, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  ¿En qué estado se encuentra actualmente?
                </p>
                <p className="mb-6" style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Esto nos permite calibrar el alcance y el punto de entrada del equipo
                </p>
                <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="Estado actual del proyecto">
                  <WizardOption
                    label="Tengo la idea"
                    sub="Concepto de negocio definido, sin documentación técnica formal"
                    selected={answers.step3 === 'idea'}
                    onSelect={() => select('step3', 'idea')}
                  />
                  <WizardOption
                    label="Tengo el diseño"
                    sub="Wireframes, mockups o flujos de usuario ya definidos"
                    selected={answers.step3 === 'design'}
                    onSelect={() => select('step3', 'design')}
                  />
                  <WizardOption
                    label="Tengo un prototipo"
                    sub="MVP funcional o código existente que requiere escalar o mejorar"
                    selected={answers.step3 === 'prototype'}
                    onSelect={() => select('step3', 'prototype')}
                  />
                </div>
                <div className="flex items-center justify-between mt-7">
                  <NavBack onBack={() => setPhase(2)} />
                  <NavNext disabled={!answers.step3} onNext={() => setPhase('result')} label="Ver Resultado" />
                </div>
              </div>
            )}

            {/* RESULT */}
            {phase === 'result' && (
              <div className="wizard-step-active" aria-label="Resultado del estimador">
                <div className="text-center mb-7">
                  <div
                    className="flex items-center justify-center rounded-full mx-auto mb-4"
                    style={{
                      width: 52, height: 52,
                      background: 'var(--accent-glow-strong)',
                      border: '1px solid rgba(217,119,87,0.3)',
                    }}
                    aria-hidden="true"
                  >
                    <ClipboardCheck size={24} style={{ color: 'var(--accent)', strokeWidth: 2 }} />
                  </div>
                  <h3 className="font-bold mb-2" style={{ fontSize: 19, color: 'var(--text-primary)' }}>
                    Perfil de proyecto identificado
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    Ingresa tu correo para recibir un desglose técnico gratuito y un estimado de tiempo para tu proyecto.
                  </p>
                </div>

                {/* Summary */}
                <div
                  className="rounded-xl mb-6"
                  style={{
                    background: 'rgba(217,119,87,0.04)',
                    border: '1px solid rgba(217,119,87,0.15)',
                    padding: '16px 20px',
                  }}
                  aria-label="Resumen de respuestas"
                >
                  {[
                    ['Objetivo', answers.step1],
                    ['Plataforma', answers.step2],
                    ['Estado', answers.step3],
                  ].map(([key, val], i, arr) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                      style={{
                        fontSize: 13,
                        padding: '5px 0',
                        borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      <span style={{ color: 'var(--text-muted)' }}>{key}</span>
                      <span style={{ color: 'var(--accent)', fontWeight: 500 }}>
                        {LABEL_MAP[val] ?? '—'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
                    placeholder="nombre@empresa.com"
                    aria-label="Correo electrónico"
                    autoComplete="email"
                    className="w-full rounded-md font-sans outline-none transition-all duration-150"
                    style={{
                      background: 'var(--bg-primary)',
                      border: `1px solid ${emailErr ? '#f87171' : 'var(--border-light)'}`,
                      padding: '14px 18px',
                      fontSize: 14,
                      color: 'var(--text-primary)',
                      boxShadow: emailErr ? '0 0 0 3px rgba(248,113,113,0.15)' : undefined,
                    }}
                    onFocus={(e) => {
                      if (!emailErr) e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.boxShadow = emailErr
                        ? '0 0 0 3px rgba(248,113,113,0.15)'
                        : '0 0 0 3px rgba(217,119,87,0.12)'
                    }}
                    onBlur={(e) => {
                      if (!emailErr) e.currentTarget.style.borderColor = 'var(--border-light)'
                      e.currentTarget.style.boxShadow = ''
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleEmailSubmit}
                    className="w-full font-bold rounded-md transition-all duration-150"
                    style={{
                      background: 'var(--accent)',
                      color: '#03111a',
                      fontSize: 15,
                      padding: 14,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.background = '#38e4ff'
                      el.style.transform = 'translateY(-1px)'
                      el.style.boxShadow = '0 8px 24px rgba(217,119,87,0.3)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.background = 'var(--accent)'
                      el.style.transform = ''
                      el.style.boxShadow = ''
                    }}
                  >
                    Recibir Desglose Técnico Gratuito
                  </button>
                </div>
              </div>
            )}

            {/* SUCCESS */}
            {phase === 'success' && (
              <div className="wizard-step-active text-center py-5" aria-live="polite">
                <div
                  className="flex items-center justify-center rounded-full mx-auto mb-5"
                  style={{
                    width: 64, height: 64,
                    background: 'var(--accent-glow-strong)',
                    border: '1px solid rgba(217,119,87,0.3)',
                  }}
                  aria-hidden="true"
                >
                  <Check size={28} style={{ color: 'var(--accent)', strokeWidth: 2.2 }} />
                </div>
                <h3 className="font-bold mb-2.5" style={{ fontSize: 20, color: 'var(--text-primary)' }}>
                  Solicitud recibida
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Un ingeniero senior de NovaCode revisará su perfil de proyecto y le enviará el análisis técnico en un plazo de 24 horas hábiles.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Nav button helpers ─── */

function NavNext({
  disabled,
  onNext,
  label,
}: {
  disabled: boolean
  onNext: () => void
  label: string
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onNext}
      className="flex items-center gap-2 font-bold rounded-md transition-all duration-150"
      style={{
        background: 'var(--accent)',
        color: '#03111a',
        fontSize: 14,
        padding: '11px 24px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
      }}
      aria-label={label}
      onMouseEnter={(e) => {
        if (!disabled) {
          const el = e.currentTarget
          el.style.background = '#38e4ff'
          el.style.transform = 'translateY(-1px)'
          el.style.boxShadow = '0 8px 24px rgba(217,119,87,0.3)'
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.background = 'var(--accent)'
        el.style.transform = ''
        el.style.boxShadow = ''
      }}
    >
      {label}
      <ArrowRight size={15} aria-hidden="true" />
    </button>
  )
}

function NavBack({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="font-medium rounded-md transition-all duration-150"
      style={{
        background: 'none',
        border: '1px solid var(--border)',
        color: 'var(--text-secondary)',
        fontSize: 14,
        padding: '10px 20px',
        cursor: 'pointer',
      }}
      aria-label="Volver a pregunta anterior"
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'var(--border-light)'
        el.style.color = 'var(--text-primary)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'var(--border)'
        el.style.color = 'var(--text-secondary)'
      }}
    >
      Volver
    </button>
  )
}
