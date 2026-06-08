'use client'

import { useState, useEffect } from 'react'
import { PageHero, WaitlistSignup } from '@/components/ui'
import { createClient } from '@/lib/supabase'

type Product = {
  id: string
  name: string
  slug: string
  category: string
  description: string | null
  price_aud: number | null
  status: 'available' | 'coming_soon' | 'sold_out'
  etsy_url: string | null
}

const STATIC_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Therapeutic Horticulture Reflective Journal',
    slug: 'horticulture-journal',
    category: 'workbooks',
    description: 'A 12-week editable PDF journal for therapeutic horticulture practice. Weekly reflections, monthly reviews, skill checklists, and NDIS capacity building prompts.',
    price_aud: null,
    status: 'available',
    etsy_url: 'https://www.etsy.com/shop/MudLeafLoveLifeMadly',
  },
  {
    id: '2',
    name: 'NDIS Goal Setting Workbook',
    slug: 'ndis-goal-setting',
    category: 'workbooks',
    description: 'A structured workbook to support NDIS participants in identifying, clarifying, and tracking their capacity building goals.',
    price_aud: null,
    status: 'coming_soon',
    etsy_url: null,
  },
  {
    id: '3',
    name: 'MLAT Level 1 Workbook',
    slug: 'mlat-level-1-workbook',
    category: 'workbooks',
    description: 'The companion workbook for MLAT Level 1 — Foundations. 12-week program companion.',
    price_aud: null,
    status: 'coming_soon',
    etsy_url: null,
  },
  {
    id: '4',
    name: 'MLAT Level 2 Workbook',
    slug: 'mlat-level-2-workbook',
    category: 'workbooks',
    description: 'The companion workbook for MLAT Level 2 — Deepening. For participants who have completed Level 1.',
    price_aud: null,
    status: 'coming_soon',
    etsy_url: null,
  },
]

const CATEGORIES = ['All', 'Workbooks', 'Art', 'Pottery']

const categoryLabel = (cat: string) =>
  ({ workbooks: 'Workbook', art: 'Art Print', pottery: 'Pottery', 'original-art': 'Original Art' }[cat] ?? cat)

const statusConfig = {
  available: { label: 'Available', bg: 'var(--sage-light)', color: 'var(--sage)' },
  coming_soon: { label: 'Coming Soon', bg: 'var(--terracotta-pale)', color: 'var(--terracotta)' },
  sold_out: { label: 'Sold Out', bg: 'var(--cream)', color: 'var(--text-light)' },
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>(STATIC_PRODUCTS)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('products')
      .select('id, name, slug, category, description, price_aud, status, etsy_url')
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setProducts(data as Product[])
      })
  }, [])

  const filtered = products.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory.toLowerCase()
  )

  return (
    <div className="pt-[72px]">
      <PageHero
        tag="Shop"
        title="Resources & Workbooks"
        subtitle="Practical tools to support therapeutic horticulture practice, NDIS goal setting, and the MLAT program — available as digital downloads."
        dark={false}
      />

      {/* Category filter */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', position: 'sticky', top: '72px', zIndex: 40 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '16px 22px', background: 'none', border: 'none',
                borderBottom: `2px solid ${activeCategory === cat ? 'var(--terracotta)' : 'transparent'}`,
                fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
                color: activeCategory === cat ? 'var(--terracotta)' : 'var(--text-mid)',
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 48px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
            const status = statusConfig[product.status]
            return (
              <div
                key={product.slug}
                style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '2px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                {/* Product image placeholder */}
                <div style={{ height: '200px', background: 'linear-gradient(135deg, var(--terracotta-pale), var(--cream))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '18px', color: 'var(--text-mid)', textAlign: 'center' }}>
                    {categoryLabel(product.category)}
                  </div>
                  <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '11px', padding: '4px 10px', borderRadius: '100px', background: status.bg, color: status.color, fontWeight: 500 }}>
                    {status.label}
                  </div>
                </div>

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '8px' }}>
                    {categoryLabel(product.category)}
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--dark)', marginBottom: '10px', lineHeight: '1.25' }}>
                    {product.name}
                  </h3>
                  <p style={{ fontSize: '13px', lineHeight: '1.75', color: 'var(--text-mid)', marginBottom: '20px', flex: 1 }}>
                    {product.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    {product.price_aud ? (
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--dark)' }}>
                        ${product.price_aud.toFixed(2)} AUD
                      </span>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>Price TBC</span>
                    )}

                    {product.status === 'available' && product.etsy_url ? (
                      <a
                        href={product.etsy_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ background: 'var(--terracotta)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '2px', fontSize: '13px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}
                      >
                        Buy on Etsy →
                      </a>
                    ) : product.status === 'coming_soon' ? (
                      <span style={{ fontSize: '12px', color: 'var(--text-light)', fontStyle: 'italic' }}>Notify me below</span>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>Unavailable</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Coming soon waitlist */}
        <div style={{ background: 'var(--dark)', padding: '64px', borderRadius: '2px', marginTop: '64px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--terracotta-light)', marginBottom: '16px' }}>
                Coming Soon
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', color: 'white', marginBottom: '16px', lineHeight: '1.2' }}>
                More resources on the way
              </h2>
              <p style={{ fontSize: '14px', lineHeight: '1.85', color: 'rgba(255,255,255,0.6)' }}>
                Original art, pottery, MLAT workbooks, and NDIS resources are coming. Join the list to be notified when new products become available.
              </p>
            </div>
            <WaitlistSignup
              dark
              heading="Get notified"
              subheading="Be the first to know when new products are available."
              program="shop"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
