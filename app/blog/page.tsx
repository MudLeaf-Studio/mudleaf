'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SectionTag, WaitlistSignup } from '@/components/ui'
import { createClient } from '@/lib/supabase'

const CATEGORY_COLORS: Record<string, string> = {
  horticulture: 'var(--sage)',
  mindfulness: 'var(--terracotta)',
  tamil: 'var(--terracotta-light)',
  ndis: '#5B7FA6',
  'garden-to-table': '#8B6914',
  research: 'var(--text-mid)',
}

const categories = ['All Posts', 'Mindfulness', 'Tamil Traditions', 'Horticulture', 'Research', 'NDIS', 'Garden to Table']

const STATIC_POSTS = [
  {
    slug: 'tamil',
    category: 'tamil',
    title: 'What Tamil poets knew about the mind — and what neuroscience is only now confirming',
    excerpt: 'The Thirukkural was written approximately 2000 years ago. Within the section on virtue there is a sustained treatment of the regulated mind that reads like a compressed version of what cognitive and affective neuroscience has taken four decades to articulate.',
    author: 'Monica Allan',
    published_at: '2026-06-01',
    read_time_minutes: 12,
    featured: true,
  },
  {
    slug: 'horticulture',
    category: 'horticulture',
    title: 'Why working with plants reduces stress — what the evidence actually says',
    excerpt: 'A 2025 systematic review confirmed that therapeutic horticulture significantly reduces depression and anxiety. Here is what the research says about why — and how Mudleaf puts it into practice.',
    author: 'Monica Allan',
    published_at: '2026-06-01',
    read_time_minutes: 6,
    featured: false,
  },
  {
    slug: 'brand',
    category: 'mindfulness',
    title: 'Mudleaf — a brand rooted in nature, and the question behind it',
    excerpt: "What really motivates people to keep growing? Mudleaf was built around that question — and around Self-Determination Theory's evidence-based answer.",
    author: 'Monica & Philip Allan',
    published_at: '2026-06-01',
    read_time_minutes: 5,
    featured: false,
  },
  {
    slug: 'garden-to-table',
    category: 'garden-to-table',
    title: 'Why we cook the way we cook — and what the garden has to do with it',
    excerpt: 'The Mudleaf Garden to Table series — recipes from a South Australian garden and a South Indian kitchen. On growing, cooking, and the particular quality of attention that both require.',
    author: 'Monica Allan',
    published_at: '2026-06-01',
    read_time_minutes: 4,
    featured: false,
  },
]

type Post = {
  slug: string
  category: string
  title: string
  excerpt: string | null
  author: string
  published_at: string | null
  read_time_minutes: number | null
  featured: boolean
}

const CATEGORY_FILTER_MAP: Record<string, string> = {
  'Mindfulness': 'mindfulness',
  'Tamil Traditions': 'tamil',
  'Horticulture': 'horticulture',
  'Research': 'research',
  'NDIS': 'ndis',
  'Garden to Table': 'garden-to-table',
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })
}

function categoryLabel(cat: string) {
  const map: Record<string, string> = {
    horticulture: 'Horticulture',
    mindfulness: 'Mindfulness',
    tamil: 'Tamil Traditions',
    ndis: 'NDIS',
    'garden-to-table': 'Garden to Table',
    research: 'Research',
  }
  return map[cat] ?? cat
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All Posts')
  const [posts, setPosts] = useState<Post[]>(STATIC_POSTS)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('blog_posts')
      .select('slug, category, title, excerpt, author, published_at, read_time_minutes, featured')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) setPosts(data as Post[])
      })
  }, [])

  const filtered = posts.filter((post) =>
    activeCategory === 'All Posts' || post.category === CATEGORY_FILTER_MAP[activeCategory]
  )

  const featured = filtered.find((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured)

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <div style={{ background: 'var(--cream)', padding: '80px 48px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionTag>Blog</SectionTag>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px,5vw,64px)', color: 'var(--dark)', marginBottom: '16px' }}>
            Mudleaf Writing
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-mid)', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', maxWidth: '640px', lineHeight: '1.7' }}>
            Evidence-based thinking on mindfulness, horticulture, mental health, and the contemplative traditions — written for curious, intelligent readers who do not want to be talked down to.
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', position: 'sticky', top: '72px', zIndex: 40 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {categories.map((cat) => (
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
        <div className="flex flex-col gap-10">

          {/* Featured post */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="no-underline block">
              <div style={{ background: 'var(--dark)', borderRadius: '2px', overflow: 'hidden' }}
                className="grid grid-cols-1 md:grid-cols-2">
                <div style={{ background: 'linear-gradient(135deg, rgba(196,98,45,0.3), rgba(44,24,16,0.8))', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '320px' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--terracotta-light)', marginBottom: '12px' }}>
                    {categoryLabel(featured.category)} · Featured
                  </div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', color: 'white', lineHeight: '1.15', marginBottom: '12px' }}>
                    {featured.title}
                  </h2>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                    {featured.author} · {formatDate(featured.published_at)} · {featured.read_time_minutes} min read
                  </div>
                </div>
                <div style={{ padding: '48px', background: 'rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '14px', lineHeight: '1.85', color: 'rgba(255,255,255,0.6)' }}>
                    {featured.excerpt}
                  </p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '24px', fontSize: '13px', color: 'var(--terracotta-light)' }}>
                    Read the full post →
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Post grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="no-underline block">
                  <div
                    style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '2px', overflow: 'hidden', transition: 'all 0.3s' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(44,24,16,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
                  >
                    <div style={{ height: '180px', background: 'linear-gradient(135deg, var(--terracotta-pale), var(--cream))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '16px', color: 'var(--text-mid)', textAlign: 'center' }}>
                        {categoryLabel(post.category)}
                      </div>
                    </div>
                    <div style={{ padding: '28px' }}>
                      <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: CATEGORY_COLORS[post.category] ?? 'var(--terracotta)', marginBottom: '10px' }}>
                        {categoryLabel(post.category)}
                      </div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', color: 'var(--dark)', marginBottom: '10px', lineHeight: '1.2' }}>
                        {post.title}
                      </h3>
                      <p style={{ fontSize: '13px', lineHeight: '1.75', color: 'var(--text-mid)', marginBottom: '20px' }}>
                        {(post.excerpt ?? '').slice(0, 120)}...
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>
                          {post.author} · {post.read_time_minutes} min read
                        </div>
                        <span style={{ fontSize: '11px', background: 'var(--terracotta)', color: 'white', padding: '4px 12px', borderRadius: '100px' }}>
                          Read →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Subscribe */}
          <div style={{ background: 'var(--cream)', padding: '48px', borderRadius: '2px', border: '1px solid var(--border)', marginTop: '24px' }}>
            <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
              <SectionTag>Stay Informed</SectionTag>
              <WaitlistSignup
                heading="New posts, program updates, and research notes"
                subheading="No wellness newsletters. Substantive writing on mindfulness, horticulture, and the science of wellbeing — when there is something worth saying."
                program="blog"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
