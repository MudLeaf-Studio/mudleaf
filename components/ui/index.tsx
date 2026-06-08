'use client'

import { useEffect, useRef, ReactNode } from 'react'
export { WaitlistSignup } from './WaitlistSignup'

// ── Section tag — small uppercase label above headings ──
export function SectionTag({
  children,
  light = false,
}: {
  children: ReactNode
  light?: boolean
}) {
  return (
    <div
      className="section-tag"
      style={{ color: light ? 'var(--terracotta-light)' : 'var(--terracotta)' }}
    >
      {children}
    </div>
  )
}

// ── Reveal on scroll ──
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

// ── Form input ──
export function FormInput({
  label,
  type = 'text',
  placeholder,
  required = false,
}: {
  label: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="mb-5">
      <label className="form-label">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="form-input"
      />
    </div>
  )
}

// ── Form textarea ──
export function FormTextarea({
  label,
  placeholder,
  rows = 5,
}: {
  label: string
  placeholder?: string
  rows?: number
}) {
  return (
    <div className="mb-5">
      <label className="form-label">{label}</label>
      <textarea
        placeholder={placeholder}
        rows={rows}
        className="form-input resize-y"
      />
    </div>
  )
}

// ── Form select ──
export function FormSelect({
  label,
  options,
}: {
  label: string
  options: { value: string; label: string }[]
}) {
  return (
    <div className="mb-5">
      <label className="form-label">{label}</label>
      <select className="form-input">
        <option value="">Select one...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

// ── Page hero — dark background ──
export function PageHero({
  tag,
  title,
  subtitle,
  tagLight = true,
  dark = true,
}: {
  tag?: string
  title: ReactNode
  subtitle?: string
  tagLight?: boolean
  dark?: boolean
}) {
  return (
    <div
      className="pt-[72px]"
      style={{
        background: dark ? 'var(--dark)' : 'var(--cream)',
        padding: '80px 48px',
        borderBottom: dark ? 'none' : '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {tag && <SectionTag light={tagLight && dark}>{tag}</SectionTag>}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 4.5vw, 60px)',
            color: dark ? 'white' : 'var(--dark)',
            marginBottom: subtitle ? '16px' : '0',
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontSize: '16px',
              color: dark ? 'rgba(255,255,255,0.6)' : 'var(--text-mid)',
              maxWidth: '580px',
              lineHeight: '1.8',
              fontFamily: dark ? "'DM Sans', sans-serif" : "'Cormorant Garamond', serif",
              fontStyle: dark ? 'normal' : 'italic',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}

// ── Program card ──
export function ProgramCard({
  icon,
  title,
  sub,
  description,
  href,
  linkLabel = 'Learn more →',
  imageUrl,
}: {
  icon?: string
  title: string
  sub: string
  description: string
  href?: string
  linkLabel?: string
  imageUrl?: string
}) {
  return (
    <div className="program-card">
      {imageUrl && (
        <div style={{
          margin: '-36px -36px 20px -36px',
          height: '160px',
          overflow: 'hidden',
          borderRadius: '2px 2px 0 0',
        }}>
          <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      {icon && !imageUrl && (
        <div style={{
          width: '44px', height: '44px',
          background: 'var(--terracotta-pale)',
          borderRadius: '2px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px', marginBottom: '20px',
        }}>
          {icon}
        </div>
      )}
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', color: 'var(--dark)', marginBottom: '6px' }}>
        {title}
      </h3>
      <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '14px' }}>
        {sub}
      </div>
      <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--text-mid)', marginBottom: '24px' }}>
        {description}
      </p>
      {href && (
        <a href={href} style={{
          fontSize: '12px', color: 'var(--terracotta)', textDecoration: 'none',
          letterSpacing: '1px', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500,
        }}>
          {linkLabel}
        </a>
      )}
    </div>
  )
}
