import { useState } from 'react'
import { Calendar, Video, Mail, ArrowRight, Check } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface Integration {
  Icon: typeof Calendar
  title: string
  desc: string
  badge: string
}

const INTEGRATIONS: Integration[] = [
  {
    Icon: Calendar,
    title: 'Google Calendar',
    desc: 'Agenda directamente en el calendario del equipo. Sin correos de ida y vuelta.',
    badge: 'Integrado',
  },
  {
    Icon: Video,
    title: 'Google Meet',
    desc: 'Enlace de videollamada generado automaticamente al confirmar la cita.',
    badge: 'Automatico',
  },
  {
    Icon: Mail,
    title: 'Gmail Workspace',
    desc: 'Confirmacion, recordatorio 24 h antes y resumen post-reunion enviados de forma automatica.',
    badge: 'Automatico',
  },
]

type SubmitState = 'idle' | 'loading' | 'done'

export default function Contact() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  const leftRef = useScrollReveal()
  const rightRef = useScrollReveal<HTMLDivElement>()

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    setSubmitState('loading')
    setTimeout(() => {
      setSubmitState('done')
      setTimeout(() => setSubmitState('idle'), 4000)
    }, 1400)
  }

  return (
    <section
      id="contacto"
      style={{ background: 'var(--bg-primary)', padding: '112px 0' }}
      aria-labelledby="contact-title"
    >
      <div className="max-w-[1160px] mx-auto px-6">
        <div
          className="grid gap-16 items-start"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
        >
          {/* ── Left info ── */}
          <div ref={leftRef} className="reveal-left">
            <div className="section-tag">Contacto directo</div>

            <h2
              id="contact-title"
              className="font-extrabold"
              style={{
                fontSize: 'clamp(24px, 3vw, 34px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: 'var(--text-primary)',
                marginBottom: 18,
              }}
            >
              Una conversación de 30 minutos puede redefinir el rumbo de su proyecto
            </h2>

            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 36 }}>
              Al conectar con NovaCode, su solicitud entra a un flujo automatizado que garantiza respuesta inmediata y seguimiento estructurado. Sin intermediarios, sin formularios de soporte genérico.
            </p>

            {/* Integrations */}
            {INTEGRATIONS.map((int) => {
              const Icon = int.Icon
              return (
                <div
                  key={int.title}
                  className="flex items-center gap-4 rounded-xl mb-4"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    padding: '20px 24px',
                  }}
                  role="region"
                  aria-label={`Integracion ${int.title}`}
                >
                  <div
                    className="flex items-center justify-center rounded-[10px] shrink-0"
                    style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.06)' }}
                    aria-hidden="true"
                  >
                    <Icon size={20} style={{ color: 'var(--accent)', strokeWidth: 1.8 }} />
                  </div>
                  <div>
                    <strong
                      className="block font-semibold mb-0.5"
                      style={{ fontSize: 14, color: 'var(--text-primary)' }}
                    >
                      {int.title}
                    </strong>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{int.desc}</span>
                  </div>
                  <span
                    className="ml-auto shrink-0 whitespace-nowrap font-medium"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      color: 'var(--accent)',
                      background: 'var(--accent-glow)',
                      border: '1px solid rgba(217,119,87,0.2)',
                      padding: '3px 8px',
                      borderRadius: 4,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {int.badge}
                  </span>
                </div>
              )
            })}
          </div>

          {/* ── Right form ── */}
          <div
            ref={rightRef}
            className="reveal-right rounded-[20px]"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              padding: 40,
            }}
            role="form"
            aria-label="Formulario de contacto"
          >
            {/* Row: Nombre / Apellido */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <FormField id="firstName" label="Nombre" placeholder="Carlos" autoComplete="given-name" />
              <FormField id="lastName" label="Apellido" placeholder="Mendez" autoComplete="family-name" />
            </div>

            {/* Row: Email / Empresa */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <FormField id="email" label="Correo Electrónico" placeholder="c.mendez@empresa.com" type="email" autoComplete="email" />
              <FormField id="company" label="Empresa" placeholder="Acme Corp" autoComplete="organization" />
            </div>

            {/* Servicio */}
            <div className="flex flex-col gap-1.5 mb-4">
              <label htmlFor="service" className="font-medium" style={{ fontSize: 13, color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>
                Servicio de interés
              </label>
              <select
                id="service"
                name="service"
                className="form-select-custom w-full rounded-md outline-none transition-all duration-150"
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  padding: '12px 16px',
                  fontSize: 14,
                  color: 'var(--text-primary)',
                }}
                defaultValue=""
              >
                <option value="" disabled>Seleccionar servicio</option>
                <option value="consulting">Asesoría Tecnológica</option>
                <option value="development">Desarrollo a Medida</option>
                <option value="rescue">Rescate de Proyecto</option>
                <option value="other">Otro / No estoy seguro</option>
              </select>
            </div>

            {/* Mensaje */}
            <div className="flex flex-col gap-1.5 mb-4">
              <label htmlFor="message" className="font-medium" style={{ fontSize: 13, color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>
                Descripción breve del proyecto
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Cuéntenos el contexto de su negocio y el problema que busca resolver. No es necesario tecnicismos en esta etapa."
                className="w-full rounded-md outline-none transition-all duration-150"
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  padding: '12px 16px',
                  fontSize: 14,
                  color: 'var(--text-primary)',
                  resize: 'vertical',
                  minHeight: 110,
                  fontFamily: 'inherit',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(217,119,87,0.1)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow = ''
                }}
              />
            </div>

            {/* Calendar note */}
            <div
              className="flex items-center gap-2.5 rounded-md mb-5"
              style={{
                background: 'rgba(217,119,87,0.04)',
                border: '1px solid rgba(217,119,87,0.15)',
                padding: '12px 16px',
              }}
              aria-label="Nota sobre agenda de reunion"
            >
              <Calendar size={16} className="shrink-0" style={{ color: 'var(--accent)', strokeWidth: 2 }} />
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                Al enviar, recibirá un{' '}
                <strong style={{ color: 'var(--accent)', fontWeight: 600 }}>enlace de Google Calendar</strong>{' '}
                para agendar su asesoría de 30 minutos en el horario de su preferencia.
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={submitState === 'loading'}
              className="w-full flex items-center justify-center gap-2.5 font-bold rounded-md transition-all duration-150"
              style={{
                background: submitState === 'done' ? '#059669' : 'var(--accent)',
                color: '#03111a',
                fontSize: 15,
                padding: '14px 28px',
                border: 'none',
                cursor: submitState === 'loading' ? 'not-allowed' : 'pointer',
                opacity: submitState === 'loading' ? 0.7 : 1,
              }}
              aria-label="Agendar asesoría gratuita"
              onMouseEnter={(e) => {
                if (submitState === 'idle') {
                  const el = e.currentTarget
                  el.style.background = '#38e4ff'
                  el.style.transform = 'translateY(-1px)'
                  el.style.boxShadow = '0 8px 24px rgba(217,119,87,0.3)'
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.background = submitState === 'done' ? '#059669' : 'var(--accent)'
                el.style.transform = ''
                el.style.boxShadow = ''
              }}
            >
              {submitState === 'loading' && 'Enviando…'}
              {submitState === 'done' && (
                <>
                  <Check size={17} aria-hidden="true" />
                  Solicitud enviada — revise su correo
                </>
              )}
              {submitState === 'idle' && (
                <>
                  Agendar Asesoría Gratuita
                  <ArrowRight size={17} aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Reusable text input ─── */

function FormField({
  id,
  label,
  placeholder,
  type = 'text',
  autoComplete,
}: {
  id: string
  label: string
  placeholder: string
  type?: string
  autoComplete?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-medium" style={{ fontSize: 13, color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-md outline-none transition-all duration-150"
        style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          padding: '12px 16px',
          fontSize: 14,
          color: 'var(--text-primary)',
          fontFamily: 'inherit',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent)'
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(217,119,87,0.1)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.boxShadow = ''
        }}
      />
    </div>
  )
}
