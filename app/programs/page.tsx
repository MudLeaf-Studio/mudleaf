import Link from 'next/link'
import { PageHero, SectionTag, WaitlistSignup } from '@/components/ui'

const PROGRAMS = [
  {
    icon: '🧠',
    title: 'MLAT — Mindfulness-based Living & Attention Training',
    sub: 'Online · 12 Weeks · Group & Individual',
    desc: 'A structured 12-week program combining mindfulness, attention regulation, and therapeutic horticulture. Grounded in MBCT and ACT. Available to NDIS participants and the broader community.',
    href: '/mlat',
    ndis: true,
  },
  {
    icon: '🌿',
    title: 'Therapeutic Horticulture Group Program',
    sub: 'In-Person · Mannum SA · Group',
    desc: 'A hands-on group program using garden-based activities to build practical skills, connection, and wellbeing. Held at our Mannum site. Suitable for NDIS participants and community members.',
    href: '/contact',
    ndis: true,
  },
  {
    icon: '◎',
    title: 'Corporate Wellbeing Programs',
    sub: 'Flexible Delivery · Workplace',
    desc: 'Evidence-based mental health education and therapeutic horticulture experiences for teams. Clinician-led, tailored to your organisation. Half-day and full-day formats available.',
    href: '/corporate',
    ndis: false,
  },
  {
    icon: '🌏',
    title: 'Tamil Contemplative Traditions',
    sub: 'Online · Reading & Reflection',
    desc: 'An exploration of Tamil philosophical and contemplative traditions — the Thirukkural, Sangam poetry, and their intersections with modern mindfulness and neuroscience.',
    href: '/tamil',
    ndis: false,
  },
]

export default function ProgramsPage() {
  return (
    <div className="pt-[72px]">
      <PageHero
        tag="Programs"
        title={<>Mental Health &<br />Horticulture Programs</>}
        subtitle="Structured programs grounded in evidence — bringing together the restorative power of nature and the practical tools of evidence-based psychology. Available to NDIS participants and the broader community."
        dark
      />

      {/* Programs grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 48px' }}>
        <SectionTag>What We Offer</SectionTag>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4vw,52px)', color: 'var(--dark)', marginBottom: '20px' }}>
          Programs designed for real life
        </h2>
        <p style={{ fontSize: '16px', lineHeight: '1.85', color: 'var(--text-mid)', maxWidth: '600px', marginBottom: '56px' }}>
          Every Mudleaf program integrates horticulture and mental health skill building — because growth in the garden and growth in the self are not separate processes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAMS.map((program) => (
            <div key={program.title} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '2px', padding: '36px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--terracotta-pale)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                  {program.icon}
                </div>
                {program.ndis && (
                  <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', background: 'var(--sage-light)', color: 'var(--sage)', padding: '4px 10px', borderRadius: '100px' }}>
                    NDIS eligible
                  </span>
                )}
              </div>
              <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '10px' }}>
                {program.sub}
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', color: 'var(--dark)', marginBottom: '12px', lineHeight: '1.2' }}>
                {program.title}
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--text-mid)', marginBottom: '24px', flex: 1 }}>
                {program.desc}
              </p>
              <Link href={program.href} style={{ fontSize: '13px', color: 'var(--terracotta)', textDecoration: 'none', fontWeight: 500 }}>
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <div style={{ background: 'var(--cream)', padding: '96px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionTag>The Approach</SectionTag>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4vw,48px)', color: 'var(--dark)', marginBottom: '56px' }}>
            Why horticulture and mental health together
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🌱', title: 'Nature as context', desc: 'Working with plants creates a natural environment for practising attention, patience, and observation — skills that transfer directly into daily life.' },
              { icon: '🧩', title: 'Evidence-based structure', desc: 'All programs draw on MBCT, ACT, and therapeutic horticulture research. Skills are taught progressively, with each week building on the last.' },
              { icon: '📈', title: 'Capacity building', desc: 'The goal is not short-term relief but lasting skill development — building the internal resources to navigate difficulty with greater ease.' },
            ].map((item) => (
              <div key={item.title}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', color: 'var(--dark)', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--text-mid)', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NDIS */}
      <div style={{ background: 'var(--dark)', padding: '80px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTag light>NDIS</SectionTag>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', color: 'white', marginBottom: '16px', lineHeight: '1.2' }}>
              NDIS participants welcome
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'rgba(255,255,255,0.6)', marginBottom: '28px' }}>
              Mudleaf is an unregistered NDIS provider. All programs fall under the Capacity Building support category. Self-managed and plan-managed participants are welcome.
            </p>
            <Link href="/ndis" className="btn-primary">NDIS Information →</Link>
          </div>
          <div className="flex flex-col gap-4">
            {[
              'Self-managed participants — use your plan funds directly',
              'Plan-managed participants — we invoice your plan manager',
              'Service agreements and all documentation provided',
              'Improved Daily Living support category',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--terracotta-light)', fontSize: '16px', marginTop: '2px' }}>✓</span>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: '1.6' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 48px', textAlign: 'center' }}>
        <SectionTag>Get Started</SectionTag>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '44px', color: 'var(--dark)', marginBottom: '16px' }}>
          Ready to begin?
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-mid)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: '1.8' }}>
          Contact us to discuss which program is the right fit, or register directly for MLAT Level 1.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/mlat/register" className="btn-primary">Register for MLAT Level 1</Link>
          <Link href="/contact" className="btn-outline" style={{ color: 'var(--text-mid)', borderColor: 'var(--border)' }}>Get in touch</Link>
        </div>
      </section>
    </div>
  )
}
