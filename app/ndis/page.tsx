'use client'
import { PageHero, Reveal } from '@/components/ui'
import { useContent } from '@/lib/useContent'
import Link from 'next/link'

export default function NDISPage() {
  const c = useContent('ndis')

  const SECTIONS = [
    { title: c.section1_title, paras: [c.section1_para_1, c.section1_para_2] },
    { title: c.section2_title, paras: [c.section2_para_1, c.section2_para_2, c.section2_para_3] },
    { title: c.section3_title, paras: [c.section3_para_1, c.section3_para_2] },
  ]

  const ACCESS_ITEMS = [c.section4_item_1, c.section4_item_2, c.section4_item_3, c.section4_item_4]

  const CARDS = [
    { title: c.card1_title, detail: c.card1_detail },
    { title: c.card2_title, detail: c.card2_detail },
    { title: c.card3_title, detail: c.card3_detail },
  ]

  return (
    <div className="pt-[72px]">
      <PageHero
        tag="NDIS"
        title={c.hero_title}
        subtitle={c.hero_subtitle}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 48px' }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-16">

        <div className="lg:col-span-2">
          {SECTIONS.map((section) => (
            <Reveal key={section.title}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', color: 'var(--dark)', marginBottom: '16px', marginTop: '40px' }}>
                {section.title}
              </h2>
              {section.paras.map((p, i) => (
                <p key={i} style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '16px' }}>{p}</p>
              ))}
            </Reveal>
          ))}

          <Reveal>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', color: 'var(--dark)', marginBottom: '16px', marginTop: '40px' }}>
              {c.section4_title}
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {ACCESS_ITEMS.map((item) => (
                <li key={item} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', fontSize: '14px', color: 'var(--text-mid)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--terracotta)', fontWeight: 'bold' }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="flex flex-col gap-5 lg:sticky lg:top-24 self-start">
          <div style={{ background: 'var(--terracotta)', padding: '32px', borderRadius: '2px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'white', marginBottom: '12px' }}>
              {c.sidebar_heading}
            </h3>
            <p style={{ fontSize: '13px', lineHeight: '1.75', color: 'rgba(255,255,255,0.8)', marginBottom: '20px' }}>
              {c.sidebar_paragraph}
            </p>
            <Link href="/contact" style={{ display: 'inline-block', background: 'white', color: 'var(--terracotta)', padding: '10px 20px', fontSize: '13px', textDecoration: 'none', borderRadius: '2px', fontWeight: 500 }}>
              {c.sidebar_button}
            </Link>
          </div>
          {CARDS.map((card) => (
            <div key={card.title} style={{ background: 'var(--cream)', padding: '24px', borderRadius: '2px', borderLeft: '3px solid var(--sage)' }}>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: 'var(--dark)', marginBottom: '8px' }}>{card.title}</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-mid)', margin: 0, lineHeight: '1.7', whiteSpace: 'pre-line' }}>{card.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
