'use client'
import { useState } from 'react'
import { PageHero } from '@/components/ui'
import { createClient } from '@/lib/supabase'
import { useContent } from '@/lib/useContent'

const FEEDBACK_TYPES = ['Program feedback', 'Concern or complaint', 'Suggestion', 'Compliment', 'Other']
const PROGRAMS = ['MLAT Level 1', 'MLAT Level 2', 'Therapeutic Horticulture Program', 'Corporate Program', 'Shop / Digital Products', 'Website or online content', 'General — not program specific']

export default function FeedbackPage() {
  const c = useContent('feedback')
  const [form, setForm] = useState({ feedback_type: '', program: '', message: '', name: '', email: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    const supabase = createClient()
    const anonymous = !form.name && !form.email
    const { error } = await supabase.from('submissions').insert({ form_type: 'feedback', feedback_type: form.feedback_type, program: form.program || null, message: form.message, name: form.name || null, email: form.email || null, anonymous })
    if (error) { setStatus('error') } else { setStatus('success'); setForm({ feedback_type: '', program: '', message: '', name: '', email: '' }) }
  }

  const TYPES = [
    { title: c.type_1_title, desc: c.type_1_desc },
    { title: c.type_2_title, desc: c.type_2_desc },
    { title: c.type_3_title, desc: c.type_3_desc },
    { title: c.type_4_title, desc: c.type_4_desc },
  ]

  return (
    <div className="pt-[72px]">
      <PageHero tag="Community" title={c.hero_title} subtitle={c.hero_subtitle} dark={false} />
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 48px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', color: 'var(--dark)', marginBottom: '20px' }}>{c.intro_heading}</h2>
            {[c.intro_para_1, c.intro_para_2, c.intro_para_3].map((text, i) => (
              <p key={i} style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '16px' }}>{text}</p>
            ))}
            <div className="flex flex-col gap-4 mt-8">
              {TYPES.map((item) => (
                <div key={item.title} style={{ background: 'var(--cream)', padding: '20px 24px', borderRadius: '2px', borderLeft: '3px solid var(--sage)' }}>
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', color: 'var(--dark)', marginBottom: '6px' }}>{item.title}</h4>
                  <p style={{ fontSize: '13px', lineHeight: '1.7', color: 'var(--text-mid)', margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--terracotta-pale)', border: '1px solid var(--border)', padding: '20px 24px', borderRadius: '2px', marginTop: '24px' }}>
              <p style={{ fontSize: '13px', lineHeight: '1.75', color: 'var(--text-mid)', margin: 0 }}>
                <strong style={{ color: 'var(--dark)' }}>NDIS participants:</strong> If your concern relates to your NDIS supports or the quality of service delivery, you also have the right to contact the NDIS Quality and Safeguards Commission directly at <strong>1800 035 544</strong> or <a href="https://www.ndiscommission.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terracotta)' }}>ndiscommission.gov.au</a>. You do not need to raise it with us first.
              </p>
            </div>
          </div>
          <div style={{ background: 'var(--cream)', padding: '40px', borderRadius: '2px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--dark)', marginBottom: '8px' }}>Submit Feedback</h3>
            <p style={{ fontSize: '13px', lineHeight: '1.7', color: 'var(--text-mid)', marginBottom: '24px' }}>Name and contact details are optional. Anonymous submissions are welcomed.</p>
            {status === 'success' ? (
              <div style={{ padding: '24px', background: 'var(--sage-light)', borderRadius: '2px', textAlign: 'center' }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--dark)', marginBottom: '8px' }}>Feedback received</p>
                <p style={{ fontSize: '14px', color: 'var(--text-mid)' }}>Thank you — Monica will read this personally.</p>
                <button onClick={() => setStatus('idle')} style={{ marginTop: '16px', fontSize: '13px', color: 'var(--terracotta)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Submit more feedback</button>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div><label className="form-label">Feedback Type</label><select className="form-input" value={form.feedback_type} onChange={e => setForm(f => ({ ...f, feedback_type: e.target.value }))}><option value="">Select one...</option>{FEEDBACK_TYPES.map(opt => <option key={opt}>{opt}</option>)}</select></div>
                <div><label className="form-label">Which program or service? (optional)</label><select className="form-input" value={form.program} onChange={e => setForm(f => ({ ...f, program: e.target.value }))}><option value="">Select if applicable...</option>{PROGRAMS.map(opt => <option key={opt}>{opt}</option>)}</select></div>
                <div><label className="form-label">Your Feedback</label><textarea placeholder="Share what you would like us to know..." rows={6} className="form-input resize-y" required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} /></div>
                <div style={{ background: 'white', borderRadius: '2px', padding: '16px', border: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '12px', color: 'var(--text-mid)', marginBottom: '12px', fontWeight: 500 }}>Would you like a response? (optional)</p>
                  <div className="flex flex-col gap-4">
                    <div><label className="form-label">Your Name</label><input type="text" placeholder="Optional — leave blank to submit anonymously" className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
                    <div><label className="form-label">Email Address</label><input type="email" placeholder="Optional — required only if you want a response" className="form-input" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
                  </div>
                </div>
                <div style={{ background: 'var(--sage-light)', borderRadius: '2px', padding: '14px 16px', borderLeft: '3px solid var(--sage)' }}>
                  <p style={{ fontSize: '12px', lineHeight: '1.7', color: 'var(--text-mid)', margin: 0 }}>All feedback is received by Monica Allan directly. We aim to acknowledge concerns within two business days and resolve them within ten. Anonymous feedback will not receive a personal response but will be read and considered.</p>
                </div>
                {status === 'error' && <p style={{ fontSize: '13px', color: '#c0392b' }}>Something went wrong — please try again or email us directly.</p>}
                <button type="submit" disabled={status === 'submitting'} className="w-full py-3.5 text-white text-sm rounded-sm" style={{ background: 'var(--terracotta)', border: 'none', cursor: status === 'submitting' ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif", opacity: status === 'submitting' ? 0.7 : 1 }}>{status === 'submitting' ? 'Submitting...' : 'Submit Feedback'}</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
