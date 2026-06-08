'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

const WEEK_CONTENT: Record<number, {
  title: string
  theme: string
  intro: string
  practices: string[]
  horticulture: string
  reflection: string
}> = {
  1: {
    title: 'Introduction to Attention',
    theme: 'Foundations',
    intro: 'This week we begin with the most fundamental skill in mindfulness practice — noticing where your attention is. Not trying to change it, not judging it. Just noticing. This is harder than it sounds, and more valuable than it appears.',
    practices: [
      '5-minute breath awareness practice (morning or evening)',
      'One mindful observation outdoors — notice five things you can see, three you can hear',
      'At meals this week, eat the first three bites without doing anything else',
    ],
    horticulture: "This week's horticulture practice: Prepare a seed tray. As you fill it with soil, notice the texture, weight, and temperature of the material in your hands. When you plant the seeds, consider what conditions they need — and what conditions you need to grow.",
    reflection: 'At the end of the week, sit for five minutes and ask yourself: when was I most present this week? When was I least present? What was happening in each case?',
  },
  2: {
    title: 'Present-Moment Awareness',
    theme: 'Foundations',
    intro: 'The past and future are constructions of the mind. They are useful constructions — but they are not where your life actually happens. This week, we practise returning to the present moment — not as an escape from difficulty, but as a place to meet it honestly.',
    practices: [
      'Three-minute breathing space (morning, midday, evening)',
      'Body scan practice — 10 minutes lying down',
      'One activity each day done with full attention (washing dishes, walking, gardening)',
    ],
    horticulture: "Check on your seeds from Week 1. Notice what has changed — and what hasn't. Practise waiting without forcing. The garden teaches patience in a way that almost nothing else does.",
    reflection: 'What did you notice this week when you brought your full attention to something? What made it easy or difficult to stay present?',
  },
  3: {
    title: 'Observing Without Judgement',
    theme: 'Foundations',
    intro: 'The mind is a judgement machine — this is good, that is bad, this should be different. This week we practise observing without immediately evaluating. We notice thoughts and feelings as events — not as facts, not as commands, not as definitions of who we are.',
    practices: [
      'Noting practice: when you notice a thought, silently note "thinking" and return to breath',
      'Mindful walking — five minutes of slow walking with attention on the soles of your feet',
      'One moment each day of pure observation — a cloud, a plant, a texture — without describing or evaluating',
    ],
    horticulture: 'Observe your seedlings without touching them. Just look. Notice the colour, the shape, the direction of growth. Allow yourself to be interested without interfering.',
    reflection: 'What did you observe about your own judging mind this week? Were there patterns — times when judgement was more active, or about particular topics?',
  },
}

export function WeekContent({ weekNum }: { weekNum: number }) {
  const router = useRouter()
  const [currentWeek, setCurrentWeek] = useState(0)
  const [hasCheckedIn, setHasCheckedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/mlat/login'); return }

      const userId = session.user.id
      const [enrolmentRes, checkinRes] = await Promise.all([
        supabase.from('enrolments').select('id, current_week').eq('user_id', userId).eq('status', 'active').single(),
        supabase.from('checkins').select('id').eq('user_id', userId).eq('week_number', weekNum).maybeSingle(),
      ])

      const enrolment = enrolmentRes.data
      if (!enrolment || weekNum > enrolment.current_week) {
        router.push('/mlat/portal')
        return
      }

      setCurrentWeek(enrolment.current_week)
      setHasCheckedIn(!!checkinRes.data)
      setLoading(false)
    }
    load()
  }, [router, weekNum])

  if (loading) return (
    <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--text-mid)', fontFamily: "'Cormorant Garamond', serif", fontSize: '20px' }}>Loading...</p>
    </div>
  )

  const content = WEEK_CONTENT[weekNum]
  if (!content) return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 48px' }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--dark)', marginBottom: '16px' }}>
        Week {weekNum} content is being prepared. Check back soon.
      </p>
      <Link href="/mlat/portal" style={{ color: 'var(--terracotta)', fontSize: '14px' }}>← Back to portal</Link>
    </div>
  )

  return (
    <>
      <div style={{ background: 'var(--dark)', padding: '48px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link href="/mlat/portal" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
            ← Back to portal
          </Link>
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--terracotta-light)', marginBottom: '10px' }}>
            Week {weekNum} · {content.theme}
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4vw,52px)', color: 'white', lineHeight: '1.1' }}>
            {content.title}
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 48px' }} className="flex flex-col gap-10">
        <section>
          <p style={{ fontSize: '17px', lineHeight: '1.9', color: 'var(--text)', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
            {content.intro}
          </p>
        </section>

        <section style={{ background: 'var(--cream)', padding: '36px', borderRadius: '2px', borderLeft: '3px solid var(--terracotta)' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--dark)', marginBottom: '20px' }}>This week's practices</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {content.practices.map((practice, i) => (
              <li key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '24px', height: '24px', background: 'var(--terracotta)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', flexShrink: 0, marginTop: '2px' }}>{i + 1}</div>
                <p style={{ fontSize: '15px', lineHeight: '1.75', color: 'var(--text-mid)', margin: 0 }}>{practice}</p>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ background: 'var(--sage-light)', padding: '36px', borderRadius: '2px', borderLeft: '3px solid var(--sage)' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--dark)', marginBottom: '14px' }}>🌿 Horticulture practice</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', margin: 0 }}>{content.horticulture}</p>
        </section>

        <section style={{ background: 'white', padding: '36px', borderRadius: '2px', border: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--dark)', marginBottom: '14px' }}>End-of-week reflection</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '24px' }}>{content.reflection}</p>
          {hasCheckedIn ? (
            <div style={{ padding: '14px 16px', background: 'var(--sage-light)', borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'var(--sage)' }}>✓</span>
              <p style={{ fontSize: '13px', color: 'var(--sage)', margin: 0 }}>You've submitted your check-in for this week.</p>
            </div>
          ) : (
            <Link href={`/mlat/portal/checkin?week=${weekNum}`} style={{ display: 'inline-block', background: 'var(--terracotta)', color: 'white', padding: '12px 24px', borderRadius: '2px', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}>
              Submit week {weekNum} check-in →
            </Link>
          )}
        </section>

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
          {weekNum > 1 ? (
            <Link href={`/mlat/portal/week/${weekNum - 1}`} style={{ fontSize: '13px', color: 'var(--terracotta)', textDecoration: 'none' }}>← Week {weekNum - 1}</Link>
          ) : <span />}
          {weekNum < currentWeek ? (
            <Link href={`/mlat/portal/week/${weekNum + 1}`} style={{ fontSize: '13px', color: 'var(--terracotta)', textDecoration: 'none' }}>Week {weekNum + 1} →</Link>
          ) : (
            <Link href="/mlat/portal" style={{ fontSize: '13px', color: 'var(--terracotta)', textDecoration: 'none' }}>Back to portal →</Link>
          )}
        </div>
      </div>
    </>
  )
}
