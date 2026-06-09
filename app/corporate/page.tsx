import Link from 'next/link'
import { PageHero, SectionTag, WaitlistSignup } from '@/components/ui'

export default function CorporatePage() {
  return (
    <div className="pt-[72px]">
      <PageHero
        tag="Corporate Programs"
        title="Workplace wellbeing grounded in evidence"
        subtitle="Clinician-led mental health education and therapeutic horticulture experiences for teams. Designed for organisations that take staff wellbeing seriously."
        dark
      />

      {/* Intro */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 48px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <SectionTag>The Program</SectionTag>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,3.5vw,44px)', color: 'var(--dark)', marginBottom: '20px', lineHeight: '1.15' }}>
              Not a wellness day. A genuine learning experience.
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '16px' }}>
              Mudleaf corporate programs are designed and delivered by clinicians — not facilitators with a mindfulness app. The content is grounded in neuroscience, evidence-based psychology, and the practical reality of working life.
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '16px' }}>
              We combine structured mental health education with hands-on therapeutic horticulture activities — creating an experience that is both intellectually substantial and genuinely restorative.
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '36px' }}>
              Programs are tailored to your organisation's context, team size, and goals. Available as half-day, full-day, or multi-session formats.
            </p>
            <Link href="/contact" className="btn-primary" style={{ display: 'inline-flex' }}>Enquire about corporate programs →</Link>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { icon: '🧠', title: 'Mental health literacy', desc: 'Evidence-based education on stress, attention, emotion regulation, and psychological safety — delivered in plain language, without jargon.' },
              { icon: '🌿', title: 'Therapeutic horticulture', desc: 'Hands-on garden activities that build practical mindfulness skills in a natural setting. No prior gardening experience required.' },
              { icon: '◎', title: 'Clinician-led', desc: 'Designed and delivered by Monica Allan MSW, BN, PG Mental Health Nursing — bringing clinical expertise into the workplace context.' },
              { icon: '✦', title: 'Tailored to your team', desc: 'Content is adapted to your industry, team size, and specific goals. We work with you before the program to understand your context.' },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--terracotta-pale)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', color: 'var(--dark)', marginBottom: '4px' }}>{item.title}</h4>
                  <p style={{ fontSize: '13px', lineHeight: '1.7', color: 'var(--text-mid)', margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formats */}
      <div style={{ background: 'var(--cream)', padding: '96px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionTag>Formats</SectionTag>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4vw,48px)', color: 'var(--dark)', marginBottom: '48px' }}>
            Program options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Half-Day Intensive',
                duration: '3–4 hours',
                desc: 'A focused introduction to mindfulness, stress physiology, and attention regulation — combined with a guided horticulture activity. Suitable for team half-days and professional development.',
                includes: ['Mental health education session', 'Guided horticulture activity', 'Participant resource pack'],
              },
              {
                title: 'Full-Day Program',
                duration: '6–7 hours',
                desc: 'A comprehensive day covering psychological skills, therapeutic horticulture practice, and group reflection. Includes a facilitated debrief and individual resource pack.',
                includes: ['Two education sessions', 'Extended horticulture practice', 'Group reflection', 'Participant workbook'],
              },
              {
                title: 'Multi-Session Series',
                duration: '4–6 weeks',
                desc: 'A structured program delivered across multiple sessions — building skills progressively and allowing time for practice between sessions. Most effective for sustained change.',
                includes: ['Weekly 90-minute sessions', 'Progressive skill building', 'Between-session practices', 'Ongoing support materials'],
              },
            ].map((format) => (
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

      {/* Who it's for */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 48px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionTag>Who It's For</SectionTag>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', color: 'var(--dark)', marginBottom: '20px', lineHeight: '1.2' }}>
              Organisations that invest in their people
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '16px' }}>
              Mudleaf corporate programs are suited to any organisation where staff wellbeing, psychological safety, and sustainable performance matter — from small businesses to large enterprises.
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)' }}>
              We work particularly well with healthcare, education, social services, and community sector organisations — where staff regularly carry the weight of others' difficulties.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {['Healthcare & allied health teams', 'Schools and education staff', 'Community services organisations', 'Social work and disability support teams', 'Corporate offices and professional services', 'Government and public sector teams'].map((item) => (
              <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '14px 18px', background: 'var(--cream)', borderRadius: '2px' }}>
                <span style={{ color: 'var(--terracotta)', fontSize: '14px' }}>→</span>
                <span style={{ fontSize: '14px', color: 'var(--text-mid)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={{ background: 'var(--dark)', padding: '80px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTag light>Enquiries</SectionTag>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', color: 'white', marginBottom: '16px', lineHeight: '1.2' }}>
              Talk to us about your organisation
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'rgba(255,255,255,0.6)', marginBottom: '28px' }}>
              Every program is tailored. Tell us about your team, your context, and what you're hoping to achieve — and we'll put together a proposal.
            </p>
            <Link href="/contact" className="btn-primary" style={{ display: 'inline-flex' }}>Make an enquiry →</Link>
          </div>
          <WaitlistSignup
            dark
            heading="Stay informed"
            subheading="Be notified when new corporate program dates are announced."
            program="corporate"
          />
        </div>
      </div>
    </div>
  )
}
