import Link from 'next/link'
import { Reveal, SectionTag } from '@/components/ui'

export default function HomePage() {
  return (
    <div className="pt-[72px]">

      {/* ── HERO ── */}
      <div className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden" style={{ background: 'var(--dark)' }}>
        {/* Background gradients */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(196, 98, 45, 0.18) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(122, 158, 126, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 80%, rgba(196, 98, 45, 0.08) 0%, transparent 40%)
          `,
        }} />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        }} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full">
          {/* Left */}
          <div>
            <div className="section-tag mb-7" style={{ color: 'var(--terracotta-light)' }}>
              Mannum, South Australia
            </div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(48px, 6vw, 80px)',
              color: 'white',
              lineHeight: '1.05',
              marginBottom: '12px',
            }}>
              Where growth<br />begins in{' '}
              <em style={{ color: 'var(--terracotta-light)', fontStyle: 'italic' }}>nature</em>
            </h1>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '20px',
              color: 'rgba(255,255,255,0.55)',
              fontStyle: 'italic',
              marginBottom: '36px',
              lineHeight: '1.5',
            }}>
              Therapeutic horticulture and evidence-based wellbeing programs
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'rgba(255,255,255,0.65)', marginBottom: '48px', maxWidth: '480px' }}>
              Mudleaf combines the restorative power of working with plants with structured,
              evidence-based mental health skill building — designed to build capacity, resilience,
              and genuine wellbeing through group and online programs.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/programs" className="btn-primary">Explore Our Programs</Link>
              <Link href="/ndis" className="btn-outline">NDIS Information</Link>
            </div>
          </div>

          {/* Right — hero cards */}
          <div className="hidden lg:flex flex-col gap-4">
            {[
              {
                icon: '🌿',
                title: 'MH & Horticulture Programs',
                desc: 'Group and online programs combining therapeutic horticulture and evidence-based mental health skill building.',
                tag: 'Explore programs →',
                href: '/programs',
                delay: 100,
              },
              {
                icon: '⬡',
                title: 'NDIS Information',
                desc: 'Unregistered provider welcoming self-managed and plan-managed participants. Capacity building focus.',
                tag: 'NDIS information →',
                href: '/ndis',
                delay: 200,
              },
              {
                icon: '◎',
                title: 'Corporate Programs',
                desc: 'Evidence-based mental health education and nature-based wellbeing experiences for workplaces.',
                tag: 'Corporate programs →',
                href: '/corporate',
                delay: 300,
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="no-underline transition-all duration-300 p-6 rounded-sm"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  animation: `fadeUp 0.6s ease ${card.delay}ms both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(196,98,45,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                }}
              >
                <div style={{ fontSize: '22px', marginBottom: '10px' }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', color: 'white', marginBottom: '6px' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', marginBottom: '12px' }}>
                  {card.desc}
                </p>
                <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--terracotta-light)' }}>
                  {card.tag}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── STRIP ── */}
      <div style={{ background: 'var(--terracotta)', padding: '20px 48px' }}
        className="flex items-center justify-center gap-12 flex-wrap">
        {['NDIS Unregistered Provider', 'Self-Managed & Plan-Managed', 'Capacity Building Focus', 'Mannum, South Australia', 'Online Programs Available'].map((item) => (
          <div key={item} className="flex items-center gap-2.5"
            style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '8px' }}>○</span>
            {item}
          </div>
        ))}
      </div>

      {/* ── ABOUT PREVIEW ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 48px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal>
            <div className="relative">
              <div style={{
                width: '100%', aspectRatio: '4/5',
                background: 'var(--cream)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}>
                <img
                  src="/images/IMG_1837.jpeg"
                  alt="Philip holding wattle in bloom — Mudleaf Mannum SA"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{
                position: 'absolute', bottom: '-20px', right: '-20px',
                width: '120px', height: '120px',
                background: 'var(--terracotta)',
                borderRadius: '2px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '13px', textAlign: 'center', lineHeight: '1.4', padding: '16px',
              }}>
                Est.<br />Mannum<br />SA
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <SectionTag>About Mudleaf</SectionTag>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,3.5vw,44px)', color: 'var(--dark)', marginBottom: '20px', lineHeight: '1.15' }}>
              Growth happens when people feel supported, connected, and engaged
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '16px' }}>
              Mudleaf was established to deliver capacity-building programs that strengthen practical
              skills in both horticulture and mental health — tailored to the needs of groups and
              delivered in person and online.
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '36px' }}>
              By integrating horticultural practice with psychological principles, Mudleaf fosters
              both practical competence and personal wellbeing. We are co-founded by Philip Allan —
              Horticulture Program Lead — and Monica Allan — Mental Health Program Lead.
            </p>
            <div className="flex gap-6">
              {[
                { name: 'Philip Allan', role: 'Certified Horticulture Trainer · Community Programs · TEFL' },
                { name: 'Monica Allan', role: 'MSW · BN · PG Mental Health Nursing · BPsych (current) · Creator of MLAT™' },
              ].map((f) => (
                <div key={f.name} style={{
                  flex: 1, background: 'var(--cream)', padding: '20px',
                  borderRadius: '2px', borderLeft: '3px solid var(--terracotta)',
                }}>
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: 'var(--dark)', marginBottom: '4px' }}>{f.name}</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-light)', margin: 0, letterSpacing: '0.3px', lineHeight: '1.5' }}>{f.role}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROGRAMS PREVIEW ── */}
      <section style={{ background: 'var(--cream)', padding: '96px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal><SectionTag>Programs</SectionTag></Reveal>
          <Reveal delay={100}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4vw,52px)', color: 'var(--dark)', marginBottom: '20px' }}>
              What Mudleaf offers
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p style={{ fontSize: '16px', lineHeight: '1.85', color: 'var(--text-mid)', maxWidth: '600px', marginBottom: '56px' }}>
              Structured programs that build knowledge, skills, and genuine wellbeing — grounded in evidence, delivered with care.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🧠', title: 'MH & Horticulture', sub: 'Group & Online Programs', delay: 0,
                desc: 'Structured group programs combining therapeutic horticulture and evidence-based mental health skill building — grounded in neuroscience, designed for real life.',
                href: '/programs',
              },
              {
                icon: '⬡', title: 'NDIS Information', sub: 'Self-Managed & Plan-Managed', delay: 100,
                desc: 'Mudleaf is an unregistered NDIS provider. All programs fall under the Capacity Building support category — building skills that extend beyond the program and into everyday life.',
                href: '/ndis',
              },
              {
                icon: '◎', title: 'Corporate Programs', sub: 'Workplace Wellbeing', delay: 200,
                desc: 'Evidence-based mental health education and therapeutic horticulture experiences for teams — clinician-led, tailored to your organisation.',
                href: '/corporate',
              },
            ].map((card) => (
              <Reveal key={card.title} delay={card.delay}>
                <Link href={card.href} className="program-card block no-underline">
                  <div style={{ width: '44px', height: '44px', background: 'var(--terracotta-pale)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '20px' }}>
                    {card.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', color: 'var(--dark)', marginBottom: '6px' }}>{card.title}</h3>
                  <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '14px' }}>{card.sub}</div>
                  <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--text-mid)', marginBottom: '24px' }}>{card.desc}</p>
                  <span style={{ fontSize: '12px', color: 'var(--terracotta)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 500 }}>
                    Explore programs →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NDIS BAND ── */}
      <div style={{ background: 'var(--dark)', padding: '80px 48px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal>
            <SectionTag light>NDIS</SectionTag>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,3.5vw,44px)', color: 'white', marginBottom: '20px', lineHeight: '1.2' }}>
              Supporting NDIS participants to build real capacity
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'rgba(255,255,255,0.6)', marginBottom: '28px' }}>
              Mudleaf operates as an unregistered NDIS provider, welcoming self-managed and plan-managed participants.
              Our programs are designed around the capacity building support category.
            </p>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {['Self-Managed', 'Plan-Managed', 'Capacity Building', 'Improved Daily Living'].map((pill) => (
                <span key={pill} className="ndis-pill">{pill}</span>
              ))}
            </div>
            <Link href="/ndis" className="btn-primary">NDIS Information</Link>
          </Reveal>
          <Reveal delay={150}>
            <div className="flex flex-col gap-5">
              {[
                { icon: '◎', title: 'Unregistered Provider', desc: 'Available to self-managed and plan-managed participants without requiring NDIS registration.' },
                { icon: '⬡', title: 'Capacity Building Focus', desc: 'All programs are designed to build transferable skills, resilience, and independence.' },
                { icon: '→', title: 'Goal-Aligned Programs', desc: 'Activities align with common NDIS goals around daily living, community participation, and wellbeing.' },
                { icon: '✦', title: 'Flexible Delivery', desc: 'In-person programs in Mannum SA and online programs available nationally.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div style={{ width: '36px', height: '36px', background: 'rgba(196,98,45,0.15)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '16px', color: 'var(--terracotta-light)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', color: 'white', marginBottom: '4px' }}>{item.title}</h4>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: '1.6' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── PHOTO GALLERY STRIP ── */}
      <div style={{ background: 'var(--dark)' }}>
        <div className="grid grid-cols-3" style={{ gap: 0 }}>
          {[
            { src: '/images/IMG_2912.jpeg', alt: 'Native yellow pea flowers — Mannum SA', label: 'Mannum, South Australia' },
            { src: '/images/IMG_2910.jpeg', alt: 'Native eucalyptus seed pod — Mannum SA', label: 'Native flora' },
            { src: '/images/IMG_2911.jpeg', alt: 'Native yellow pea flowers spread — Mannum SA', label: 'Grown in country' },
          ].map((photo) => (
            <div key={photo.src} className="relative overflow-hidden" style={{ height: '280px' }}>
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700"
                style={{ transition: 'transform 0.6s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent, rgba(44,24,16,0.6))',
                padding: '16px',
                color: 'white', fontSize: '11px', letterSpacing: '2px',
                textTransform: 'uppercase', opacity: 0.8,
              }}>
                {photo.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
