'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

interface WaitlistSignupProps {
  program?: string
  heading?: string
  subheading?: string
  dark?: boolean
}

export function WaitlistSignup({
  program,
  heading = 'Stay in the loop',
  subheading = 'Be the first to hear about new programs, resources, and updates from Mudleaf.',
  dark = false,
}: WaitlistSignupProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'duplicate'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    const supabase = createClient()
    const { error } = await supabase.from('waitlist').insert({ email, name: name || null, program: program || null })
    if (error) {
      if (error.code === '23505') {
        setStatus('duplicate')
      } else {
        setStatus('error')
      }
    } else {
      setStatus('success')
      setName('')
      setEmail('')
    }
  }

  const textColor = dark ? 'white' : 'var(--dark)'
  const subColor = dark ? 'rgba(255,255,255,0.6)' : 'var(--text-mid)'
  const inputBg = dark ? 'rgba(255,255,255,0.08)' : 'white'
  const inputBorder = dark ? 'rgba(255,255,255,0.15)' : 'var(--border)'
  const inputColor = dark ? 'white' : 'var(--text)'

  return (
    <div>
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: textColor, marginBottom: '10px' }}>
        {heading}
      </h3>
      <p style={{ fontSize: '15px', lineHeight: '1.75', color: subColor, marginBottom: '28px', maxWidth: '440px' }}>
        {subheading}
      </p>

      {status === 'success' ? (
        <div style={{ padding: '20px 24px', background: dark ? 'rgba(122,158,126,0.2)' : 'var(--sage-light)', borderRadius: '2px', borderLeft: '3px solid var(--sage)', maxWidth: '440px' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', color: textColor, marginBottom: '4px' }}>You're on the list</p>
          <p style={{ fontSize: '13px', color: subColor, margin: 0 }}>We'll be in touch when there's something worth sharing.</p>
        </div>
      ) : status === 'duplicate' ? (
        <div style={{ padding: '20px 24px', background: dark ? 'rgba(255,255,255,0.05)' : 'var(--cream)', borderRadius: '2px', maxWidth: '440px' }}>
          <p style={{ fontSize: '14px', color: subColor, margin: 0 }}>That email is already on our list — we'll be in touch.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: '440px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                padding: '12px 16px', borderRadius: '2px', fontSize: '14px',
                background: inputBg, border: `1px solid ${inputBorder}`,
                color: inputColor, outline: 'none', width: '100%',
              }}
            />
            <input
              type="email"
              placeholder="Your email address"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                padding: '12px 16px', borderRadius: '2px', fontSize: '14px',
                background: inputBg, border: `1px solid ${inputBorder}`,
                color: inputColor, outline: 'none', width: '100%',
              }}
            />
            {status === 'error' && (
              <p style={{ fontSize: '13px', color: '#c0392b', margin: 0 }}>Something went wrong — please try again.</p>
            )}
            <button
              type="submit"
              disabled={status === 'submitting'}
              style={{
                padding: '12px 28px', background: 'var(--terracotta)', color: 'white',
                border: 'none', borderRadius: '2px', fontSize: '14px', cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                fontFamily: "'DM Sans', sans-serif", opacity: status === 'submitting' ? 0.7 : 1,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { if (status !== 'submitting') e.currentTarget.style.background = 'var(--dark-mid)' }}
              onMouseLeave={e => { if (status !== 'submitting') e.currentTarget.style.background = 'var(--terracotta)' }}
            >
              {status === 'submitting' ? 'Joining...' : 'Join the list'}
            </button>
          </div>
          <p style={{ fontSize: '11px', color: subColor, marginTop: '10px', opacity: 0.7 }}>
            No spam. Unsubscribe any time.
          </p>
        </form>
      )}
    </div>
  )
}
