'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { PageHero } from '@/components/ui'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setErrorMsg('Incorrect email or password — please try again.')
      setStatus('error')
    } else {
      router.push('/mlat/portal')
    }
  }

  return (
    <div className="pt-[72px]">
      <PageHero
        tag="MLAT™"
        title="Participant Login"
        subtitle="Sign in to access your program portal, weekly content, and check-in forms."
        dark
      />

      <section style={{ maxWidth: '480px', margin: '0 auto', padding: '64px 48px' }}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="form-label">Email Address</label>
            <input type="email" required className="form-input" placeholder="your@email.com"
              value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input type="password" required className="form-input" placeholder="Your password"
              value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          {status === 'error' && (
            <div style={{ padding: '14px 16px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '2px' }}>
              <p style={{ fontSize: '13px', color: '#c0392b', margin: 0 }}>{errorMsg}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-3.5 text-white text-sm rounded-sm"
            style={{ background: 'var(--terracotta)', border: 'none', cursor: status === 'submitting' ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif", opacity: status === 'submitting' ? 0.7 : 1 }}
          >
            {status === 'submitting' ? 'Signing in...' : 'Sign In'}
          </button>

          <p style={{ fontSize: '13px', color: 'var(--text-mid)', textAlign: 'center' }}>
            Not registered yet?{' '}
            <Link href="/mlat/register" style={{ color: 'var(--terracotta)', textDecoration: 'underline' }}>Create an account</Link>
          </p>
        </form>
      </section>
    </div>
  )
}
