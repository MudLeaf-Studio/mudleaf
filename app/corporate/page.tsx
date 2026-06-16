'use client'
import Link from 'next/link'
import { PageHero, SectionTag, WaitlistSignup } from '@/components/ui'
import { useContent } from '@/lib/useContent'

export default function CorporatePage() {
  const c = useContent('corporate')

  const FEATURES = [
    { icon: '🧠', title: c.feat_1_title, desc: c.feat_1_desc },
    { icon: '🌿', title: c.feat_2_title, desc: c.feat_2_desc },
    { icon: '◎', title: c.feat_3_title, desc: c.feat_3_desc },
    { icon: '✦', title: c.feat_4_title, desc: c.feat_4_desc },
  ]

  const FORMATS = [
    { title: c.format_1_title, duration: c.format_1_duration, desc: c.format_1_desc, includes: ['Mental health education session', 'Guided horticulture activity', 'Participant resource pack'] },
    { title: c.format_2_title, duration: c.format_2_duration, desc: c.format_2_desc, includes: ['Two education sessions', 'Extended horticulture practice', 'Group reflection', 'Participant workbook'] },
    { title: c.format_3_title, duration: c.format_3_duration, desc: c.format_3_desc, includes: ['Weekly 90-minute sessions', 'Progressive skill building', 'Between-session practices', 'Ongoing support materials'] },
  ]

  const AUDIENCE_ITEMS = [
    'Healthcare & allied health teams', 'Schools and education staff',
    'Community services organisations', 'Social work and disability support teams',
    'Corporate offices and professional services', 'Government and public sector teams',
  ]

  return (
    <div className="pt-[72px]">
      <PageHero tag="Corporate Programs" title={c.hero_title} subtitle={c.hero_subtitle} dark />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 48px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <SectionTag>The Program</SectionTag>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,3.5vw,44px)', color: 'var(--dark)', marginBottom: '20px', lineHeight: '1.15' }}>{c.intro_heading}</h2>
            {[c.intro_para_1, c.intro_para_2, c.intro_para_3].map((p, i) => (
              <p key={i} style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '16px' }}>{p}</p>
            ))}
            <Link href="/contact" className="btn-primary" style={{ display: 'inline-flex' }}>Enquire about corporate programs →</Link>
          </div>
          <div className="flex flex-col gap-4">
            {FEATURES.map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--terracotta-pale)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', color: 'var(--dark)', marginBottom: '4px' }}>{item.title}</h4>
                  <p style={{ fontSize: '13px', lineHeight: '1.7', color: 'var(--text-mid)', margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: 'var(--cream)', padding: '96px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionTag>Formats</SectionTag>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4vw,48px)', color: 'var(--dark)', marginBottom: '48px' }}>Program options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FORMATS.map((format) => (
              <div key={format.title} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '2px', padding: '32px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '8px' }}>{format.duration}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--dark)', marginBottom: '12px' }}>{format.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.75', color: 'var(--text-mid)', marginBottom: '20px' }}>{format.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {format.includes.map((item) => (
                    <li key={item} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--sage)', fontSize: '14px' }}>✓</span>
                      <span style={{ fontSize: '13px', color: 'var(--text-mid)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 48px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionTag>Who It's For</SectionTag>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', color: 'var(--dark)', marginBottom: '20px', lineHeight: '1.2' }}>{c.audience_heading}</h2>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '16px' }}>{c.audience_para_1}</p>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)' }}>{c.audience_para_2}</p>
          </div>
          <div className="flex flex-col gap-3">
            {AUDIENCE_ITEMS.map((item) => (
              <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '14px 18px', background: 'var(--cream)', borderRadius: '2px' }}>
                <span style={{ color: 'var(--terracotta)', fontSize: '14px' }}>→</span>
                <span style={{ fontSize: '14px', color: 'var(--text-mid)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: 'var(--dark)', padding: '80px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTag light>Enquiries</SectionTag>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', color: 'white', marginBottom: '16px', lineHeight: '1.2' }}>{c.cta_heading}</h2>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'rgba(255,255,255,0.6)', marginBottom: '28px' }}>{c.cta_paragraph}</p>
            <Link href="/contact" className="btn-primary" style={{ display: 'inline-flex' }}>Make an enquiry →</Link>
          </div>
          <WaitlistSignup dark heading="Stay informed" subheading="Be notified when new corporate program dates are announced." program="corporate" />
        </div>
      </div>
    </div>
  )
}
