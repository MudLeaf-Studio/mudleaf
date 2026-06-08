'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

type Profile = { full_name: string | null; email: string | null }
type Enrolment = { id: string; current_week: number; enrolled_at: string; program: string }
type Checkin = { week_number: number; submitted_at: string }

const TOTAL_WEEKS = 12

const WEEK_TITLES: Record<number, string> = {
  1: 'Introduction to Attention', 2: 'Present-Moment Awareness', 3: 'Observing Without Judgement',
  4: 'Working with Difficult Emotions', 5: 'Thought Defusion', 6: 'Building a Daily Practice',
  7: 'Self-Compassion', 8: 'Values Clarification', 9: 'Committed Action',
  10: 'Sustaining Practice', 11: 'Integration', 12: 'Completion & Continuation',
}

export default function PortalPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [enrolment, setEnrolment] = useState<Enrolment | null>(null)
  const [checkins, setCheckins] = useState<Checkin[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/mlat/login'); return }

      const userId = session.user.id
      const [profileRes, enrolmentRes, checkinRes] = await Promise.all([
        supabase.from('profiles').select('full_name, email').eq('id', userId).single(),
        supabase.from('enrolments').select('id, current_week, enrolled_at, program').eq('user_id', userId).eq('status', 'active').single(),
        supabase.from('checkins').select('week_number, submitted_at').eq('user_id', userId).order('week_number'),
      ])

      setProfile(profileRes.data)
      setEnrolment(enrolmentRes.data)
      setCheckins(checkinRes.data ?? [])
      setLoading(false)
    }
    load()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/mlat')
  }

  if (loading) {
    return (
      <div className="pt-[72px]" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-mid)', fontFamily: "'Cormorant Garamond', serif", fontSize: '20px' }}>Loading your portal...</p>
      </div>
    )
  }

  const currentWeek = enrolment?.current_week ?? 1
  const checkedInWeeks = new Set(checkins.map(c => c.week_number))
  const firstName = profile?.full_name?.split(' ')[0] ?? 'Participant'

  return (
    <div className="pt-[72px]" style={{ minHeight: '100vh', background: 'var(--warm-white)' }}>

      {/* Portal header */}
      <div style={{ background: 'var(--dark)', padding: '40px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--terracotta-light)', marginBottom: '8px' }}>
              MLAT™ Participant Portal
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', color: 'white' }}>
              Welcome back, {firstName}
            </h1>
          </div>
          <button
            onClick={handleSignOut}
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', padding: '10px 20px', borderRadius: '2px', cursor: 'pointer', fontSize: '13px', fontFamily: "'DM Sans', sans-serif" }}
          >
            Sign out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px' }}>

        {/* Progress summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Current Week', value: `Week ${currentWeek}`, sub: WEEK_TITLES[currentWeek] ?? '' },
            { label: 'Check-ins Completed', value: `${checkedInWeeks.size} of ${currentWeek}`, sub: 'weeks with a check-in submitted' },
            { label: 'Program', value: 'MLAT Level 1', sub: `${TOTAL_WEEKS - currentWeek + 1} weeks remaining` },
          ].map((stat) => (
            <div key={stat.label} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '2px', padding: '28px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '8px' }}>{stat.label}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: 'var(--dark)', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-mid)' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Current week CTA */}
        <div style={{ background: 'var(--terracotta)', borderRadius: '2px', padding: '40px 48px', marginBottom: '48px' }} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>
              Current Week
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', color: 'white', marginBottom: '10px' }}>
              Week {currentWeek} — {WEEK_TITLES[currentWeek]}
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.7' }}>
              {checkedInWeeks.has(currentWeek)
                ? "You've submitted your check-in for this week. Open the content to review your practices."
                : "Open this week's content and submit your check-in when you're ready."}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link
              href={`/mlat/portal/week/${currentWeek}`}
              style={{ background: 'white', color: 'var(--terracotta)', padding: '12px 24px', borderRadius: '2px', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", textDecoration: 'none', fontWeight: 500 }}
            >
              Open Week {currentWeek} →
            </Link>
            {!checkedInWeeks.has(currentWeek) && (
              <Link
                href={`/mlat/portal/checkin?week=${currentWeek}`}
                style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '12px 24px', borderRadius: '2px', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                Submit check-in
              </Link>
            )}
          </div>
        </div>

        {/* All weeks */}
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--dark)', marginBottom: '24px' }}>
          All Weeks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1).map((week) => {
            const unlocked = week <= currentWeek
            const checkedIn = checkedInWeeks.has(week)
            return (
              <div
                key={week}
                style={{
                  background: unlocked ? 'white' : 'var(--cream)',
                  border: `1px solid ${unlocked ? 'var(--border)' : 'transparent'}`,
                  borderRadius: '2px', padding: '20px',
                  opacity: unlocked ? 1 : 0.5,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: unlocked ? 'var(--terracotta)' : 'var(--text-light)' }}>
                    Week {week}
                  </div>
                  {checkedIn && (
                    <span style={{ fontSize: '10px', background: 'var(--sage-light)', color: 'var(--sage)', padding: '2px 8px', borderRadius: '100px' }}>
                      ✓ checked in
                    </span>
                  )}
                  {!unlocked && (
                    <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>🔒 locked</span>
                  )}
                </div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: 'var(--dark)', marginBottom: '10px' }}>
                  {WEEK_TITLES[week]}
                </h4>
                {unlocked ? (
                  <Link
                    href={`/mlat/portal/week/${week}`}
                    style={{ fontSize: '12px', color: 'var(--terracotta)', textDecoration: 'none' }}
                  >
                    Open →
                  </Link>
                ) : (
                  <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>Unlocks in Week {week}</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
