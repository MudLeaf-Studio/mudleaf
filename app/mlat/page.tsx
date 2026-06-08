import Link from 'next/link'
import { PageHero, SectionTag, WaitlistSignup } from '@/components/ui'

export default function MLATPage() {
  return (
    <div className="pt-[72px]">
      <PageHero
        tag="MLAT™"
        title="Mindfulness-based Living & Attention Training"
        subtitle="A structured 12-week evidence-based program combining mindfulness, attention regulation, and therapeutic horticulture. Designed by Monica Allan MSW."
        dark
      />

      {/* What is MLAT */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 48px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <SectionTag>The Program</SectionTag>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,3.5vw,44px)', color: 'var(--dark)', marginBottom: '20px', lineHeight: '1.15' }}>
              Structured skill-building, grounded in evidence
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '16px' }}>
              MLAT (Mindfulness-based Living and Attention Training) is a 12-week capacity-building program that draws on mindfulness-based cognitive therapy, acceptance and commitment therapy, and therapeutic horticulture.
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '16px' }}>
              Each week introduces a new skill or practice — progressively building attention regulation, psychological flexibility, and the capacity to engage with daily life more fully.
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '36px' }}>
              MLAT is delivered online via a participant portal. Weekly content unlocks each week, with a check-in form to track your progress.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/mlat/register" className="btn-primary">Register for MLAT Level 1</Link>
              <Link href="/mlat/login" className="btn-outline">Participant Login</Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { week: 'Weeks 1–3', title: 'Foundations', desc: 'Introduction to attention, present-moment awareness, and the basics of mindful observation. Includes the first horticulture practice — seed preparation and germination.' },
              { week: 'Weeks 4–6', title: 'Regulation', desc: 'Working with difficult emotions, thought defusion, and building a daily practice. Horticulture focus: tending seedlings and noticing growth.' },
              { week: 'Weeks 7–9', title: 'Deepening', desc: 'Self-compassion, values clarification, and committed action. Horticulture focus: transplanting, root systems, and resilience.' },
              { week: 'Weeks 10–12', title: 'Integration', desc: 'Consolidating practice, preparing for life after the program, and building a sustainable routine. Horticulture focus: harvest, reflection, and continuation.' },
            ].map((item) => (
              <div key={item.week} style={{ background: 'var(--cream)', padding: '24px', borderRadius: '2px', borderLeft: '3px solid var(--terracotta)' }}>
                <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '6px' }}>{item.week}</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--dark)', marginBottom: '6px' }}>{item.title}</h4>
                <p style={{ fontSize: '13px', lineHeight: '1.7', color: 'var(--text-mid)', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NDIS info */}
      <div style={{ background: 'var(--dark)', padding: '64px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {[
            { icon: '⬡', title: 'NDIS Eligible', desc: 'MLAT falls under the Capacity Building support category — Improved Daily Living. Available to self-managed and plan-managed participants.' },
            { icon: '◎', title: 'Online Delivery', desc: 'Fully online. Participants in any state can enrol. Weekly content is delivered via the participant portal at your own pace.' },
            { icon: '✦', title: 'Clinician-Led', desc: 'Designed and supervised by Monica Allan MSW, BN, PG Mental Health Nursing, BPsych (current).' },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 items-start">
              <div style={{ width: '40px', height: '40px', background: 'rgba(196,98,45,0.15)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '18px', color: 'var(--terracotta-light)' }}>
                {item.icon}
              </div>
              <div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', color: 'white', marginBottom: '6px' }}>{item.title}</h4>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: '1.65' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Waitlist */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 48px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionTag>Enrolments</SectionTag>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', color: 'var(--dark)', marginBottom: '16px' }}>
              MLAT Level 1 — now enrolling
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '28px' }}>
              Register below to begin MLAT Level 1. You'll receive access to the participant portal and Week 1 content immediately after registration.
            </p>
            <Link href="/mlat/register" className="btn-primary">Register Now</Link>
          </div>
          <WaitlistSignup
            heading="Join the MLAT waitlist"
            subheading="If Level 1 is full or you're interested in Level 2, join the waitlist and we'll be in touch."
            program="mlat-level-1"
          />
        </div>
      </section>
    </div>
  )
}
