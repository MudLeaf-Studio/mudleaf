'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

const PRACTICES = [
  'Breath awareness',
  'Body scan',
  'Mindful walking',
  'Three-minute breathing space',
  'Noting practice',
  'Mindful eating',
  'Horticulture practice',
  'Informal mindfulness (daily activities)',
]

function CheckinForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const weekParam = parseInt(searchParams.get('week') ?? '1', 10)

  const [enrolmentId, setEnrolmentId] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [alreadySubmitted, setAlreadySubmitted] = useState(false)

  const [form, setForm] = useState({
    presence_rating: 0,
    practices_used: [] as string[],
    most_noticed: '',
    free_text: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/mlat/login'); return }

      const uid = session.user.id
      setUserId(uid)

      const [enrolmentRes, checkinRes] = await Promise.all([
        supabase.from('enrolments').select('id, current_week').eq('user_id', uid).eq('status', 'active').single(),
        supabase.from('checkins').select('id').eq('user_id', uid).eq('week_number', weekParam).maybeSingle(),
      ])

      if (enrolmentRes.data) setEnrolmentId(enrolmentRes.data.id)
      if (checkinRes.data) setAlreadySubmitted(true)
      setLoading(false)
    }
    load()
  }, [router, weekParam])

  const togglePractice = (practice: string) => {
    setForm(f => ({
      ...f,
      practices_used: f.practices_used.includes(practice)
        ? f.practices_used.filter(p => p !== practice)
        : [...f.practices_used, practice],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.presence_rating) return
    setStatus('submitting')
    const supabase = createClient()
    const { error } = await supabase.from('checkins').insert({
      user_id: userId,
      enrolment_id: enrolmentId,
      week_number: weekParam,
      program: 'mlat-level-1',
      presence_rating: form.presence_rating,
      practices_used: form.practices_used,
      most_noticed: form.most_noticed || null,
      free_text: form.free_text || null,
    })

    if (error) {
      setStatus('error')
    } else {
      // Advance current_week if this is the latest week
      if (enrolmentId) {
        const supabase2 = createClient()
        const { data: enrolment } = await supabase2.from('enrolments').select('current_week').eq('id', enrolmentId).single()
        if (enrolment && enrolment.current_week === weekParam && weekParam < 12) {
          await supabase2.from('enrolments').update({ current_week: weekParam + 1 }).eq('id', enrolmentId)
        }
      }
      setStatus('success')
    }
  }

  if (loading) return (
    <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--text-mid)', fontFamily: "'Cormorant Garamond', serif", fontSize: '20px' }}>Loading...</p>
    </div>
  )

  if (alreadySubmitted) return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '64px 48px', textAlign: 'center' }}>
      <div style={{ padding: '40px', background: 'var(--sage-light)', borderRadius: '2px' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--dark)', marginBottom: '10px' }}>
          Already submitted
        </p>
        <p style={{ fontSize: '14px', color: 'var(--text-mid)', marginBottom: '24px' }}>
          You've already submitted your check-in for Week {weekParam}.
        </p>
        <Link href="/mlat/portal" style={{ color: 'var(--terracotta)', fontSize: '14px' }}>← Back to portal</Link>
      </div>
    </div>
  )

  if (status === 'success') return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '64px 48px', textAlign: 'center' }}>
      <div style={{ padding: '40px', background: 'var(--sage-light)', borderRadius: '2px' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: 'var(--dark)', marginBottom: '10px' }}>
          Check-in submitted
        </p>
        <p style={{ fontSize: '15px', color: 'var(--text-mid)', marginBottom: '28px' }}>
          Week {weekParam} is complete. Week {weekParam + 1} is now unlocked in your portal.
        </p>
        <Link
          href="/mlat/portal"
          style={{ display: 'inline-block', background: 'var(--terracotta)', color: 'white', padding: '12px 28px', borderRadius: '2px', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}
        >
          Back to portal →
        </Link>
      </div>
    </div>
  )

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '64px 48px' }}>
      <Link href={`/mlat/portal/week/${weekParam}`} style={{ fontSize: '13px', color: 'var(--terracotta)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '32px' }}>
        ← Back to Week {weekParam}
      </Link>

      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', color: 'var(--dark)', marginBottom: '8px' }}>
        Week {weekParam} Check-in
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--text-mid)', marginBottom: '40px' }}>
        This check-in takes about 5 minutes. Your responses help track your progress and inform the program.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">

        {/* Presence rating */}
        <div>
          <label style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--dark)', marginBottom: '6px' }}>
            How present did you feel this week overall?
          </label>
          <p style={{ fontSize: '13px', color: 'var(--text-light)', marginBottom: '16px' }}>1 = rarely present, 5 = frequently present</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setForm(f => ({ ...f, presence_rating: n }))}
                style={{
                  width: '52px', height: '52px', borderRadius: '2px', fontSize: '18px', fontFamily: "'Cormorant Garamond', serif",
                  background: form.presence_rating === n ? 'var(--terracotta)' : 'var(--cream)',
                  color: form.presence_rating === n ? 'white' : 'var(--dark)',
                  border: `1px solid ${form.presence_rating === n ? 'var(--terracotta)' : 'var(--border)'}`,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Practices used */}
        <div>
          <label style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--dark)', marginBottom: '6px' }}>
            Which practices did you use this week?
          </label>
          <p style={{ fontSize: '13px', color: 'var(--text-light)', marginBottom: '16px' }}>Select all that apply</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {PRACTICES.map((practice) => {
              const selected = form.practices_used.includes(practice)
              return (
                <button
                  key={practice}
                  type="button"
                  onClick={() => togglePractice(practice)}
                  style={{
                    padding: '8px 16px', borderRadius: '100px', fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s',
                    background: selected ? 'var(--terracotta)' : 'var(--cream)',
                    color: selected ? 'white' : 'var(--text-mid)',
                    border: `1px solid ${selected ? 'var(--terracotta)' : 'var(--border)'}`,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {practice}
                </button>
              )
            })}
          </div>
        </div>

        {/* Most noticed */}
        <div>
          <label style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--dark)', marginBottom: '6px' }}>
            What did you notice most this week?
          </label>
          <p style={{ fontSize: '13px', color: 'var(--text-light)', marginBottom: '12px' }}>One sentence is enough</p>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. How often my mind wandered, a sense of calm during practice..."
            value={form.most_noticed}
            onChange={e => setForm(f => ({ ...f, most_noticed: e.target.value }))}
          />
        </div>

        {/* Free text */}
        <div>
          <label style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--dark)', marginBottom: '6px' }}>
            Anything else you'd like to note? (optional)
          </label>
          <textarea
            className="form-input resize-y"
            rows={4}
            placeholder="Observations, questions, difficulties, or anything worth recording..."
            value={form.free_text}
            onChange={e => setForm(f => ({ ...f, free_text: e.target.value }))}
          />
        </div>

        {status === 'error' && (
          <p style={{ fontSize: '13px', color: '#c0392b' }}>Something went wrong — please try again.</p>
        )}

        <button
          type="submit"
          disabled={!form.presence_rating || status === 'submitting'}
          style={{
            background: 'var(--terracotta)', color: 'white', border: 'none', padding: '14px 32px',
            borderRadius: '2px', fontSize: '15px', cursor: !form.presence_rating || status === 'submitting' ? 'not-allowed' : 'pointer',
            fontFamily: "'DM Sans', sans-serif", opacity: !form.presence_rating ? 0.5 : 1,
          }}
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit Week ' + weekParam + ' Check-in'}
        </button>
      </form>
    </div>
  )
}

export default function CheckinPage() {
  return (
    <div className="pt-[72px]" style={{ minHeight: '100vh', background: 'var(--warm-white)' }}>
      <Suspense fallback={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
          <p style={{ color: 'var(--text-mid)', fontFamily: "'Cormorant Garamond', serif", fontSize: '20px' }}>Loading...</p>
        </div>
      }>
        <CheckinForm />
      </Suspense>
    </div>
  )
}
