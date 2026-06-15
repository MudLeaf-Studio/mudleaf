'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const STATIC_CONTENT: Record<string, { title: string; category: string; author: string; published_at: string; read_time_minutes: number; body: string }> = {
  tamil: {
    title: 'What Tamil poets knew about the mind — and what neuroscience is only now confirming',
    category: 'Tamil Traditions',
    author: 'Monica Allan',
    published_at: '2026-06-01',
    read_time_minutes: 12,
    body: `The Thirukkural was written approximately 2000 years ago. Within the section on virtue there is a sustained treatment of the regulated mind that reads like a compressed version of what cognitive and affective neuroscience has taken four decades to articulate.

## The regulated mind in Thirukkural

Thiruvalluvar's treatment of what he calls *arivu* — awareness, discernment, the quality of attention — spans multiple chapters. The consistent theme is that the capacity to observe one's own mental states, without being immediately swept into them, is the foundational skill from which all other virtues flow.

## What neuroscience has since found

The prefrontal cortex — specifically the ventromedial and dorsolateral regions — plays a central role in what researchers now call cognitive reappraisal. Mindfulness practice, at the neural level, strengthens the regulatory pathways between the prefrontal cortex and the amygdala. Regular practitioners show reduced amygdala reactivity not because they experience less, but because the observing circuitry remains online under conditions that would otherwise trigger automatic response.

## Why this matters for Mudleaf

The MLAT framework draws explicitly on this tradition — not as decoration, but as a structural source. The four-week orientation phase that opens Level 1 before any skill content is taught reflects the Thirukkural's insistence that *arivu* precedes action.`,
  },
  horticulture: {
    title: 'Why working with plants reduces stress — what the evidence actually says',
    category: 'Horticulture',
    author: 'Monica Allan',
    published_at: '2026-06-01',
    read_time_minutes: 6,
    body: `A 2025 systematic review confirmed that structured engagement with plants and garden environments significantly reduces self-reported depression and anxiety, with effect sizes comparable to other evidence-based interventions.

## Three mechanisms with evidence

**Attention restoration.** Kaplan and Kaplan's Attention Restoration Theory proposes that natural environments restore directed attention capacity by engaging involuntary attention — the kind that operates without effort.

**Physiological stress reduction.** Interaction with plants and soil has been associated with reductions in cortisol, heart rate, and blood pressure across multiple controlled studies.

**Behavioural activation and mastery.** Therapeutic horticulture involves doing things that produce visible results. The feedback loop between action and outcome is clear, concrete, and relatively reliable — which is precisely what depression disrupts.

## What this means for program design

These mechanisms suggest that therapeutic horticulture works best when it is structured rather than simply recreational. Mudleaf programs are designed around this.`,
  },
  brand: {
    title: 'Mudleaf — a brand rooted in nature, and the question behind it',
    category: 'Mindfulness',
    author: 'Monica & Philip Allan',
    published_at: '2026-06-01',
    read_time_minutes: 5,
    body: `What really motivates people to keep growing? This is the question Mudleaf was built around — and around Self-Determination Theory's evidence-based answer.

## Why motivation matters more than technique

Most wellbeing programs focus on technique. The assumption is that if the technique is good and the instruction is clear, people will do it. The evidence does not support this assumption.

Self-Determination Theory identifies three basic psychological needs whose satisfaction predicts sustained motivation: autonomy, competence, and relatedness. When these needs are met, motivation becomes intrinsic.

## What the name holds

Mud is foundational, unglamorous, and alive. It is where things begin. Leaf is the evidence of growth — the visible expression of what has been happening underground, invisibly, over time.`,
  },
  'garden-to-table': {
    title: 'Why we cook the way we cook — and what the garden has to do with it',
    category: 'Garden to Table',
    author: 'Monica Allan',
    published_at: '2026-06-01',
    read_time_minutes: 4,
    body: `The Mudleaf Garden to Table series is an account of the particular quality of attention that cooking from a garden requires — and what that attention has in common with everything else Mudleaf does.

## Growing and cooking as the same practice

When you grow food, you learn to observe. You learn the difference between a plant that is stressed and one that is thriving. This is close observation over time — the same capacity that mindfulness practice develops, applied to a different object.

## The South Australian garden, the South Indian kitchen

The specific character of this series comes from the intersection of a South Australian garden in a semi-arid climate and a South Indian kitchen where spice is not decoration but structure. The recipes in this series are the result of that negotiation. They are honest about what works and what does not.`,
  },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

function renderBody(body: string) {
  return body.split('\n\n').map((para, i) => {
    if (para.startsWith('## ')) {
      return (
        <h2 key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px,2.5vw,30px)', color: 'var(--dark)', marginTop: '48px', marginBottom: '16px', lineHeight: 1.2 }}>
          {para.replace('## ', '')}
        </h2>
      )
    }
    return (
      <p key={i} style={{ fontSize: '16px', lineHeight: '1.9', color: 'var(--text-mid)', marginBottom: '24px' }}>
        {para}
      </p>
    )
  })
}

type Post = {
  id?: string
  slug: string
  category: string
  title: string
  excerpt: string | null
  author: string
  published_at: string | null
  read_time_minutes: number | null
  body: string | null
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    const supabase = createClient()
    supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
      .then(({ data }) => {
        if (data) {
          setPost(data as Post)
        } else if (STATIC_CONTENT[slug]) {
          const s = STATIC_CONTENT[slug]
          setPost({ slug, excerpt: null, ...s })
        }
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="pt-[72px]" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', color: 'var(--text-light)' }}>Loading…</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-[72px]" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', color: 'var(--dark)' }}>Post not found</h1>
        <Link href="/blog" style={{ color: 'var(--terracotta)', textDecoration: 'none', fontSize: '14px' }}>← Back to blog</Link>
      </div>
    )
  }

  return (
    <div className="pt-[72px]">
      <div style={{ background: 'var(--dark)', padding: '80px 48px 72px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <Link href="/blog" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '32px' }}>
            ← Blog
          </Link>
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--terracotta-light)', marginBottom: '16px' }}>
            {post.category}
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4vw,52px)', color: 'white', lineHeight: '1.15', marginBottom: '24px' }}>
            {post.title}
          </h1>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.published_at ?? '')}</span>
            <span>·</span>
            <span>{post.read_time_minutes} min read</span>
          </div>
        </div>
      </div>
      <article style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 48px 96px' }}>
        {renderBody(post.body ?? '')}
      </article>
      <div style={{ borderTop: '1px solid var(--border)', padding: '48px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/blog" style={{ color: 'var(--terracotta)', textDecoration: 'none', fontSize: '14px' }}>← All posts</Link>
          <Link href="/contact" style={{ color: 'var(--text-mid)', textDecoration: 'none', fontSize: '14px' }}>Enquire about programs →</Link>
        </div>
      </div>
    </div>
  )
}
