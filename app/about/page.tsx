import { PageHero, Reveal, SectionTag } from '@/components/ui'

export const metadata = {
  title: 'About Mudleaf | Therapeutic Horticulture & Wellbeing',
  description: 'Mudleaf was founded by Philip and Monica Allan — combining expertise in horticulture, mental health, and mindful connected living.',
}

export default function AboutPage() {
  return (
    <div className="pt-[72px]">
      <PageHero
        tag="About"
        title={<>Mudleaf Therapeutic<br />Horticulture & Wellbeing</>}
        subtitle="Co-founded by Philip and Monica Allan — combining broad expertise in horticulture, mental health, and mindful connected living — all inspired by the restorative power of nature."
        dark={false}
      />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 48px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <Reveal>
            <SectionTag>Where we come from</SectionTag>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', color: 'var(--dark)', marginBottom: '20px', lineHeight: '1.15' }}>
              Growth happens when people feel supported, connected, and engaged
            </h2>
            {[
              'Mudleaf was established to deliver capacity-building programs that strengthen practical skills in both horticulture and mental health — tailored to the needs of groups and delivered in person and online.',
              'By integrating horticultural practice with psychological principles, Mudleaf fosters both practical competence and personal wellbeing. Evidence-based research demonstrates that engaging with plants in structured, mindful ways supports emotional regulation, reduces stress, and enhances self-efficacy.',
              'Through this approach, participants are encouraged not only to build confidence in working with plants but also to deepen self-care, mindfulness, and a sense of connection to sustainable, balanced living.',
            ].map((text, i) => (
              <p key={i} style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '16px' }}>{text}</p>
            ))}
          </Reveal>

          <Reveal delay={150}>
            <div style={{ height: '400px', borderRadius: '2px', overflow: 'hidden', marginBottom: '24px' }}>
              <img
                src="/images/IMG_1154.jpeg"
                alt="Cymbidium orchids in the Mudleaf garden — Mannum SA"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </Reveal>
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          {[
            {
              initial: 'P',
              name: 'Philip Allan',
              role: 'Founder · Horticulture Program Lead',
              paras: [
                'Philip is a certified horticulture trainer with extensive experience designing and running community programs across South Australia. His community program background spans a wide range of contexts — including 3Ball SA, MCCSA, Afrikarts Music Program, and Infusion, a capacity building program for young people in event management.',
                'Between 2021 and 2024, Philip worked with community nurseries in Townsville, Wagga Wagga, and Katherine — building hands-on knowledge of native plant propagation and community growing across diverse regional and remote Australian settings.',
                'Philip is also TEFL certified, bringing a structured approach to adult learning and skills development that underpins Mudleaf\'s program delivery.',
              ],
            },
            {
              initial: 'M',
              name: 'Monica Allan',
              role: 'Founder · Mental Health Program Lead',
              paras: [
                'Monica brings dual qualifications across social work and nursing — a Master of Social Work, Bachelor of Nursing, and Postgraduate qualification in Mental Health Nursing — and is currently completing a Bachelor of Psychology. Her clinical background spans mental health nursing in regional, remote, and telehealth settings; clinical social work practice in metropolitan and regional South Australia; and social work practice in India across sexuality, HIV, and AIDS sectors.',
                'Monica is the creator of MLAT™ — Mindfulness Lived Awareness Training — an original psychoeducational framework integrating neuroscience, evidence-based therapeutic approaches, and Tamil classical contemplative traditions.',
                'Alongside her clinical and research work, she is a practising artist and budding potter whose creative practice is woven into the Mudleaf philosophy of slow, intentional making.',
              ],
            },
          ].map((person) => (
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
