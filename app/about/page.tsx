'use client'
import { PageHero, Reveal, SectionTag } from '@/components/ui'
import { useContent } from '@/lib/useContent'

export default function AboutPage() {
  const c = useContent('about')

  const TEAM = [
    { initial: 'P', name: c.philip_name, role: c.philip_role, paras: [c.philip_para_1, c.philip_para_2, c.philip_para_3] },
    { initial: 'M', name: c.monica_name, role: c.monica_role, paras: [c.monica_para_1, c.monica_para_2, c.monica_para_3] },
  ]

  return (
    <div className="pt-[72px]">
      <PageHero
        tag="About"
        title={c.hero_title}
        subtitle={c.hero_subtitle}
        dark={false}
      />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 48px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <Reveal>
            <SectionTag>{c.intro_tag}</SectionTag>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', color: 'var(--dark)', marginBottom: '20px', lineHeight: '1.15' }}>
              {c.intro_heading}
            </h2>
            {[c.intro_para_1, c.intro_para_2, c.intro_para_3].map((text, i) => (
              <p key={i} style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '16px' }}>{text}</p>
            ))}
          </Reveal>

          <Reveal delay={150}>
            <div style={{ height: '400px', borderRadius: '2px', overflow: 'hidden', marginBottom: '24px' }}>
              <img
                src="/images/IMG_3804.jpeg"
                alt="Cymbidium orchids in the Mudleaf garden — Mannum SA"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          {TEAM.map((person) => (
            <Reveal key={person.name}>
              <div className="flex gap-7 items-start p-9 rounded-sm" style={{ background: 'white', border: '1px solid var(--border)' }}>
                <div style={{
                  width: '100px', height: '120px',
                  background: 'var(--terracotta-pale)',
                  borderRadius: '2px', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '32px', color: 'var(--terracotta)',
                }}>
                  {person.initial}
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--dark)', marginBottom: '4px' }}>
                    {person.name}
                  </h3>
                  <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '14px' }}>
                    {person.role}
                  </div>
                  {person.paras.map((p, i) => (
                    <p key={i} style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--text-mid)', marginBottom: '10px' }}>{p}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
