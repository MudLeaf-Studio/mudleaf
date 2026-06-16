'use client'
import Link from 'next/link'
import { Reveal, SectionTag, WaitlistSignup } from '@/components/ui'
import { useContent } from '@/lib/useContent'

export default function HomePage() {
  const c = useContent('home')

  const HERO_CARDS = [
    { icon: '🌿', title: c.card_1_title, desc: c.card_1_desc, tag: 'Explore programs →', href: '/programs', delay: 100 },
    { icon: '⬡', title: c.card_2_title, desc: c.card_2_desc, tag: 'NDIS information →', href: '/ndis', delay: 200 },
    { icon: '◎', title: c.card_3_title, desc: c.card_3_desc, tag: 'Corporate programs →', href: '/corporate', delay: 300 },
  ]

  const PHOTOS = [
    { src: '/images/IMG_6350.jpeg', alt: 'Native yellow pea flowers — Mannum SA', label: c.photo_1_label },
    { src: '/images/IMG_0411.jpeg', alt: 'Acacia wattle flowers in bloom — Mannum SA', label: c.photo_2_label },
    { src: '/images/IMG_6354.jpeg', alt: 'Native yellow pea flowers spread — Mannum SA', label: c.photo_3_label },
  ]

  return (
    <div className="pt-[72px]">
      <div className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden" style={{ background: 'var(--dark)' }}>
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(196, 98, 45, 0.18) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(122, 158, 126, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 80%, rgba(196, 98, 45, 0.08) 0%, transparent 40%)
          `,
        }} />
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full">
          <div>
            <div className="section-tag mb-7" style={{ color: 'var(--terracotta-light)' }}>{c.hero_tag}</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(48px, 6vw, 80px)', color: 'white', lineHeight: '1.05', marginBottom: '12px' }}>
              {c.hero_title}
            </h1>
            <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'rgba(255,255,255,0.65)', marginBottom: '48px', maxWidth: '480px' }}>
              {c.hero_subtitle}
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/programs" className="btn-primary">{c.hero_btn_1}</Link>
              <Link href="/ndis" className="btn-outline">{c.hero_btn_2}</Link>
            </div>
          </div>
          <div className="hidden lg:flex flex-col gap-4">
            {HERO_CARDS.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="no-underline transition-all duration-300 p-6 rounded-sm"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', animation: `fadeUp 0.6s ease ${card.delay}ms both` }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(196,98,45,0.3)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
              >
                <div style={{ fontSize: '22px', marginBottom: '10px' }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', color: 'white', marginBottom: '6px' }}>{card.title}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', marginBottom: '12px' }}>{card.desc}</p>
                <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--terracotta-light)' }}>{card.tag}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--dark)' }}>
        <div className="grid grid-cols-3" style={{ gap: 0 }}>
          {PHOTOS.map((photo) => (
            <div key={photo.src} className="relative overflow-hidden" style={{ height: '280px' }}>
              <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover"
                style={{ transition: 'transform 0.6s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(44,24,16,0.6))', padding: '16px', color: 'white', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8 }}>
                {photo.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
