'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { PageHero } from '@/components/ui'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    ndis_number: '',
    plan_management_type: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')
    const supabase = createClient()

    // Create auth user
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.full_name },
      },
    })

    if (error) {
      setErrorMsg(error.message)
      setStatus('error')
      return
    }

    const userId = data.user?.id
    if (!userId) {
      setErrorMsg('Registration failed — please try again.')
      setStatus('error')
      return
    }

    // Create profile
    await supabase.from('profiles').upsert({
      id: userId,
      full_name: form.full_name,
      email: form.email,
      phone: form.phone || null,
      ndis_number: form.ndis_number || null,
      plan_management_type: form.plan_management_type || null,
    })

    // Create enrolment
    await supabase.from('enrolments').insert({
      user_id: userId,
      program: 'mlat-level-1',
      status: 'active',
      current_week: 1,
    })

    router.push('/mlat/portal')
  }

  return (
    <div className="pt-[72px]">
      <PageHero
        tag="MLAT™"
        title="Register for MLAT Level 1"
        subtitle="Create your participant account to access the program portal and begin Week 1."
        dark
      />

      <section style={{ maxWidth: '600px', margin: '0 auto', padding: '64px 48px' }}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div>
            <label className="form-label">Full Name</label>
            <input type="text" required className="form-input" placeholder="First and last name"
              value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} />
          </div>

          <div>
            <label className="form-label">Email Address</label>
            <input type="email" required className="form-input" placeholder="your@email.com"
              value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>

          <div>
            <label className="form-label">Password</label>
            <input type="password" required className="form-input" placeholder="At least 8 characters" minLength={8}
              value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
          </div>

          <div>
            <label className="form-label">Phone (optional)</label>
            <input type="tel" className="form-input" placeholder="04xx xxx xxx"
              value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '16px', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: 500 }}>NDIS Details (optional)</p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="form-label">NDIS Number</label>
                <input type="text" className="form-input" placeholder="43xxxxxxx"
                  value={form.ndis_number} onChange={e => setForm(f => ({ ...f, ndis_number: e.target.value }))} />
              </div>
              <div>
                <label className="form-label">Plan Management Type</label>
                <select className="form-input" value={form.plan_management_type}
                  onChange={e => setForm(f => ({ ...f, plan_management_type: e.target.value }))}>
                  <option value="">Select if applicable...</option>
                  <option value="self">Self-managed</option>
                  <option value="plan">Plan-managed</option>
                  <option value="agency">Agency-managed</option>
                  <option value="none">Not an NDIS participant</option>
                </select>
              </div>
            </div>
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
            {status === 'submitting' ? 'Creating account...' : 'Create Account & Begin Program'}
          </button>

          <p style={{ fontSize: '13px', color: 'var(--text-mid)', textAlign: 'center' }}>
            Already registered?{' '}
            <Link href="/mlat/login" style={{ color: 'var(--terracotta)', textDecoration: 'underline' }}>Sign in here</Link>
          </p>
        </form>
      </section>
    </div>
  )
}
