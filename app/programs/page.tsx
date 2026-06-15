'use client'

import Link from 'next/link'
import { PageHero, SectionTag, WaitlistSignup } from '@/components/ui'
import { useContent } from '@/lib/useContent'

export default function ProgramsPage() {
  const c = useContent('programs')

  const PROGRAMS = [
    { icon: '🧠', title: c.program_1_title, sub: c.program_1_sub, desc: c.program_1_desc, href: '/mlat', ndis: true },
    { icon: '🌿', title: c.program_2_title, sub: c.program_2_sub, desc: c.program_2_desc, href: '/contact', ndis: true },
    { icon: '◎', title: c.program_3_title, sub: c.program_3_sub, desc: c.program_3_desc, href: '/corporate', ndis: false },
    { icon: '🌏', title: c.program_4_title, sub: c.program_4_sub, desc: c.program_4_desc, href: '/tamil', ndis: false },
  ]

  const APPROACH = [
    { icon: '🌱', title: c.approach_1_title, desc: c.approach_1_desc },
    { icon: '🧩', title: c.approach_2_title, desc: c.approach_2_desc },
    { icon: '📈', title: c.approach_3_title, desc: c.approach_3_desc },
  ]

  const NDIS_BULLETS = [c.ndis_bullet_1, c.ndis_bullet_2, c.ndis_bullet_3, c.ndis_bullet_4]

  return (
    <div className="pt-[72px]">
      <PageHero
        tag="Programs"
        title={c.hero_title}
        subtitle={c.hero_subtitle}
        dark
      />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 48px' }}>
        <SectionTag>What We Offer</SectionTag>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4vw,52px)', color: 'var(--dark)', marginBottom: '20px' }}>
          {c.offer_heading}
        </h2>
        <p style={{ fontSize: '16px', lineHeight: '1.85', color: 'var(--text-mid)', maxWidth: '600px', marginBottom: '56px' }}>
          {c.offer_paragraph}
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

      <div style={{ background: 'var(--cream)', padding: '96px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionTag>The Approach</SectionTag>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4vw,48px)', color: 'var(--dark)', marginBottom: '56px' }}>
            {c.approach_heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {APPROACH.map((item) => (
              <div key={item.title}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', color: 'var(--dark)', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--text-mid)', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--dark)', padding: '80px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTag light>NDIS</SectionTag>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', color: 'white', marginBottom: '16px', lineHeight: '1.2' }}>
              {c.ndis_heading}
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'rgba(255,255,255,0.6)', marginBottom: '28px' }}>
              {c.ndis_paragraph}
            </p>
            <Link href="/ndis" className="btn-primary">{c.ndis_button}</Link>
          </div>
          <div className="flex flex-col gap-4">
            {NDIS_BULLETS.map((item) => (
              <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--terracotta-light)', fontSize: '16px', marginTop: '2px' }}>✓</span>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: '1.6' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 48px', textAlign: 'center' }}>
        <SectionTag>Get Started</SectionTag>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '44px', color: 'var(--dark)', marginBottom: '16px' }}>
          {c.cta_heading}
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-mid)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: '1.8' }}>
          {c.cta_paragraph}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/mlat/register" className="btn-primary">{c.cta_button_1}</Link>
          <Link href="/contact" className="btn-outline" style={{ color: 'var(--text-mid)', borderColor: 'var(--border)' }}>{c.cta_button_2}</Link>
        </div>
      </section>
    </div>
  )
}
