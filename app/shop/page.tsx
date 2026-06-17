'use client'

import Link from 'next/link'
import { PageHero, SectionTag } from '@/components/ui'
import { useContent } from '@/lib/useContent'

const ETSY_PRODUCTS = [
  {
    title: 'Mudleaf Therapeutic Horticulture Reflective Journal',
    desc: '12-week editable PDF journal. Structured for NDIS capacity building, grounded in therapeutic horticulture practice. Terracotta palette.',
    price: 'Available on Etsy',
    tag: 'Digital download · PDF',
    href: 'https://www.etsy.com/shop/MudLeafLoveLifeMadly',
  },
  {
    title: 'NDIS Goal Setting Workbook',
    desc: 'A structured workbook for NDIS participants to clarify goals, track progress, and build self-advocacy skills. Coming soon.',
    price: 'Coming soon',
    tag: 'Digital download · PDF',
    href: 'https://www.etsy.com/shop/MudLeafLoveLifeMadly',
  },
]

export default function ShopPage() {
  const c = useContent('shop')

  return (
    <div className="pt-[72px]">
      <PageHero
        tag="Shop"
        title={c.hero_title || 'Mudleaf Resources & Digital Products'}
        subtitle={c.hero_subtitle || 'Practical tools for participants, practitioners, and curious minds. Designed with the same evidence-based care as our programs.'}
        dark={false}
      />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 48px' }}>
        <SectionTag>Digital Products</SectionTag>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,3.5vw,44px)', color: 'var(--dark)', marginBottom: '16px' }}>
          {c.products_heading || 'Workbooks & journals'}
        </h2>
        <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', maxWidth: '560px', marginBottom: '48px' }}>
          {c.products_paragraph || 'All digital products are available through our Etsy shop — instant download, editable PDF format, designed for real use.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {ETSY_PRODUCTS.map((product) => (
            <div key={product.title} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '2px', padding: '36px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '12px' }}>{product.tag}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', color: 'var(--dark)', marginBottom: '12px', lineHeight: '1.2' }}>{product.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--text-mid)', marginBottom: '24px', flex: 1 }}>{product.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-mid)' }}>{product.price}</span>
                <a href={product.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: 'var(--terracotta)', textDecoration: 'none', fontWeight: 500 }}>View on Etsy →</a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: '2px', padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
          <SectionTag>Etsy Shop</SectionTag>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', color: 'var(--dark)', margin: 0 }}>
            {c.etsy_heading || 'Visit our Etsy shop'}
          </h2>
          <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', maxWidth: '480px', margin: 0 }}>
            {c.etsy_paragraph || 'All Mudleaf digital products are available through MudLeaf LoveLifeMadly on Etsy. Secure checkout, instant download.'}
          </p>
          <a href="https://www.etsy.com/shop/MudLeafLoveLifeMadly" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: '8px' }}>
            Open Etsy Shop →
          </a>
        </div>
      </section>

      <div style={{ background: 'var(--dark)', padding: '80px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <SectionTag light>NDIS</SectionTag>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', color: 'white', marginBottom: '16px' }}>
            {c.ndis_heading || 'NDIS participants'}
          </h2>
          <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'rgba(255,255,255,0.6)', maxWidth: '520px', margin: '0 auto 32px' }}>
            {c.ndis_paragraph || 'Some digital products may be claimable under your NDIS plan as capacity building resources. Contact us to discuss your plan and we will provide the appropriate documentation.'}
          </p>
          <Link href="/contact" className="btn-primary">Get in touch →</Link>
        </div>
      </div>
    </div>
  )
}
