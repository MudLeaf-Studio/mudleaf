'use client'
import Link from 'next/link'
import { Reveal, SectionTag, WaitlistSignup } from '@/components/ui'

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


      {/* ── PHOTO GALLERY STRIP ── */}
      <div style={{ background: 'var(--dark)' }}>
        <div className="grid grid-cols-3" style={{ gap: 0 }}>
          {[
            { src: '/images/IMG_6350.jpeg', alt: 'Native yellow pea flowers — Mannum SA', label: 'Mannum, South Australia' },
            { src: '/images/IMG_0411.jpeg', alt: 'Acacia wattle flowers in bloom — Mannum SA', label: 'Native flora' },
            { src: '/images/IMG_6354.jpeg', alt: 'Native yellow pea flowers spread — Mannum SA', label: 'Grown in country' },
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
