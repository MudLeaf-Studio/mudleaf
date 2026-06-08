'use client'
import { useState } from 'react'
import { PageHero } from '@/components/ui'
import { createClient } from '@/lib/supabase'

const ENQUIRY_TYPES = [
  'MLAT Program Enquiry',
  'NDIS / Funding Question',
  'Therapeutic Horticulture Program',
  'Corporate Program',
  'Referrer / Support Coordinator',
  'Research Enquiry',
  'General Enquiry',
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', enquiry_type: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    const supabase = createClient()
    const { error } = await supabase.from('submissions').insert({
      form_type: 'contact',
      name: form.name,
      email: form.email,
      enquiry_type: form.enquiry_type,
      message: form.message,
    })
    if (error) {
      setStatus('error')
    } else {
      setStatus('success')
      setForm({ name: '', email: '', enquiry_type: '', message: '' })
    }
  }

  return (
    <div className="pt-[72px]">
      <PageHero
        tag="Contact"
        title="Get in touch"
        subtitle="Whether you're a participant, a support coordinator, a referrer, or a researcher — we'd like to hear from you."
        dark={false}
      />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 48px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Info */}
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', color: 'var(--dark)', marginBottom: '20px' }}>
              We respond within two business days
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '36px' }}>
              For NDIS enquiries, please include your plan management type (self-managed or plan-managed)
              and the program you're interested in. We'll send you a service agreement and all the
              documentation you need to get started.
            </p>
            <div className="flex flex-col gap-5">
              {[
                { icon: '✉', title: 'Email', detail: 'enquiries@mudleaf.com.au' },
                { icon: '◎', title: 'Location', detail: 'Mannum SA 5238, Australia\nOnline programs available nationally' },
                { icon: '⬡', title: 'NDIS Enquiries', detail: 'Self-managed and plan-managed participants welcome. Service agreements provided on request.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-3.5 items-start">
                  <div style={{
                    width: '36px', height: '36px',
                    background: 'var(--terracotta-pale)',
                    borderRadius: '2px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: 'var(--dark)', marginBottom: '2px' }}>{item.title}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-mid)', margin: 0, whiteSpace: 'pre-line' }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: 'var(--cream)', padding: '40px', borderRadius: '2px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--dark)', marginBottom: '24px' }}>
              Send us a message
            </h3>

            {status === 'success' ? (
              <div style={{ padding: '24px', background: 'var(--sage-light)', borderRadius: '2px', textAlign: 'center' }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--dark)', marginBottom: '8px' }}>Message received</p>
                <p style={{ fontSize: '14px', color: 'var(--text-mid)' }}>Thank you — we'll be in touch within two business days.</p>
                <button
                  onClick={() => setStatus('idle')}
                  style={{ marginTop: '16px', fontSize: '13px', color: 'var(--terracotta)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div>
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    placeholder="First and last name"
                    className="form-input"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="form-input"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="form-label">Enquiry Type</label>
                  <select
                    className="form-input"
                    value={form.enquiry_type}
                    onChange={e => setForm(f => ({ ...f, enquiry_type: e.target.value }))}
                  >
                    <option value="">Select one...</option>
                    {ENQUIRY_TYPES.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Message</label>
                  <textarea
                    placeholder="Tell us what you're looking for..."
                    rows={5}
                    className="form-input resize-y"
                    required
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  />
                </div>
                {status === 'error' && (
                  <p style={{ fontSize: '13px', color: '#c0392b' }}>Something went wrong — please try again or email us directly.</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 text-white text-sm rounded-sm transition-colors duration-200"
                  style={{ background: 'var(--terracotta)', border: 'none', cursor: status === 'submitting' ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif", opacity: status === 'submitting' ? 0.7 : 1 }}
                  onMouseEnter={(e) => { if (status !== 'submitting') e.currentTarget.style.background = 'var(--dark-mid)' }}
                  onMouseLeave={(e) => { if (status !== 'submitting') e.currentTarget.style.background = 'var(--terracotta)' }}
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
