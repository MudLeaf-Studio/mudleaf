'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

type Tab = 'blog' | 'pages' | 'images'
type BlogPost = { id?: string; slug: string; title: string; category: string; author: string; excerpt: string; body: string; read_time_minutes: number; published: boolean; published_at: string; featured: boolean }
type PageContent = { id?: string; page_key: string; section_key: string; label: string; content: string }
type UploadedImage = { name: string; url: string; created_at: string }

const BLANK_POST: BlogPost = { slug: '', title: '', category: 'mindfulness', author: 'Monica Allan', excerpt: '', body: '', read_time_minutes: 5, published: false, published_at: new Date().toISOString().slice(0, 10), featured: false }
const CATEGORIES = ['mindfulness', 'horticulture', 'tamil', 'ndis', 'garden-to-table', 'research']
const PAGE_SECTIONS: PageContent[] = [
  { page_key: 'home', section_key: 'hero_title', label: 'Home — Hero Title', content: 'Where nature meets evidence-based wellbeing' },
  { page_key: 'home', section_key: 'hero_subtitle', label: 'Home — Hero Subtitle', content: 'Mudleaf combines therapeutic horticulture with evidence-based psychology to build lasting wellbeing and mental health capacity.' },
  { page_key: 'about', section_key: 'monica_bio', label: 'About — Monica Bio', content: 'Monica Allan is the founder and Mental Health Program Lead of Mudleaf. She holds dual qualifications in social work and nursing (MSW, BN, Postgraduate Mental Health Nursing) and is completing a Bachelor of Psychology at Flinders University.' },
  { page_key: 'about', section_key: 'philip_bio', label: 'About — Philip Bio', content: 'Philip Allan is the Horticulture Program Lead at Mudleaf. A certified horticulture trainer and assessor, Philip brings deep practical knowledge of therapeutic garden design and plant-based wellbeing practice.' },
  { page_key: 'ndis', section_key: 'intro', label: 'NDIS — Intro', content: 'Mudleaf is an unregistered NDIS provider delivering therapeutic horticulture and mindfulness-based programs under the Capacity Building support category.' },
  { page_key: 'programs', section_key: 'intro', label: 'Programs — Intro', content: 'Every Mudleaf program integrates horticulture and mental health skill building — because growth in the garden and growth in the self are not separate processes.' },
]

function slugify(t: string) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }
const inp: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: '2px', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", outline: 'none', boxSizing: 'border-box', background: 'white', color: 'var(--dark)' }
const lbl: React.CSSProperties = { display: 'block', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-mid)', marginBottom: '5px' }

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t) }, [onDone])
  return <div style={{ position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)', background: 'var(--dark)', color: 'white', padding: '12px 24px', borderRadius: '2px', fontSize: '13px', zIndex: 9999, whiteSpace: 'nowrap' }}>{msg}</div>
}

function BlogTab({ toast }: { toast: (m: string) => void }) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => { load() }, [])
  async function load() { const { data } = await supabase.from('blog_posts').select('*').order('published_at', { ascending: false }); if (data) setPosts(data as BlogPost[]) }

  async function save() {
    if (!editing) return
    setSaving(true)
    const p = { ...editing, slug: editing.slug || slugify(editing.title) }
    if (p.id) { await supabase.from('blog_posts').update(p).eq('id', p.id) }
    else { await supabase.from('blog_posts').insert(p) }
    await load(); setEditing(null); setSaving(false); toast('Post saved ✓')
  }

  async function togglePublish(p: BlogPost) { await supabase.from('blog_posts').update({ published: !p.published }).eq('id', p.id!); await load(); toast(p.published ? 'Unpublished' : 'Published ✓') }
  async function del(p: BlogPost) { if (!confirm(`Delete "${p.title}"?`)) return; await supabase.from('blog_posts').delete().eq('id', p.id!); await load(); toast('Deleted') }

  if (editing) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', color: 'var(--dark)', margin: 0 }}>{editing.id ? 'Edit post' : 'New post'}</h2>
        <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-mid)' }}>×</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label style={lbl}>Title</label><input style={inp} value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
        <div><label style={lbl}>Slug</label><input style={inp} value={editing.slug || slugify(editing.title)} onChange={e => setEditing({ ...editing, slug: e.target.value })} /></div>
        <div><label style={lbl}>Category</label><select style={inp} value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })}>{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
        <div><label style={lbl}>Author</label><input style={inp} value={editing.author} onChange={e => setEditing({ ...editing, author: e.target.value })} /></div>
        <div><label style={lbl}>Publish date</label><input style={inp} type="date" value={editing.published_at} onChange={e => setEditing({ ...editing, published_at: e.target.value })} /></div>
        <div><label style={lbl}>Read time (min)</label><input style={inp} type="number" value={editing.read_time_minutes} onChange={e => setEditing({ ...editing, read_time_minutes: Number(e.target.value) })} /></div>
      </div>
      <div><label style={lbl}>Excerpt</label><textarea style={{ ...inp, minHeight: '80px', resize: 'vertical' }} value={editing.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} /></div>
      <div><label style={lbl}>Body — ## for headings, blank line between paragraphs</label><textarea style={{ ...inp, minHeight: '360px', resize: 'vertical', lineHeight: '1.7', fontSize: '13px' }} value={editing.body} onChange={e => setEditing({ ...editing, body: e.target.value })} /></div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-mid)', cursor: 'pointer' }}><input type="checkbox" checked={editing.published} onChange={e => setEditing({ ...editing, published: e.target.checked })} />Published</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-mid)', cursor: 'pointer' }}><input type="checkbox" checked={editing.featured} onChange={e => setEditing({ ...editing, featured: e.target.checked })} />Featured</label>
        <div style={{ flex: 1 }} />
        <button onClick={save} disabled={saving} style={{ background: saving ? 'var(--text-light)' : 'var(--terracotta)', color: 'white', border: 'none', borderRadius: '2px', padding: '10px 24px', fontSize: '13px', cursor: saving ? 'not-allowed' : 'pointer' }}>{saving ? 'Saving…' : 'Save post'}</button>
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', color: 'var(--dark)', margin: 0 }}>Blog posts</h2>
        <button onClick={() => setEditing(BLANK_POST)} style={{ background: 'var(--terracotta)', color: 'white', border: 'none', borderRadius: '2px', padding: '9px 18px', fontSize: '13px', cursor: 'pointer' }}>+ New post</button>
      </div>
      {posts.length === 0 && <p style={{ fontSize: '14px', color: 'var(--text-light)' }}>No posts in Supabase yet. Static posts show on the blog until you add posts here.</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {posts.map(p => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: 'white', border: '1px solid var(--border)', borderRadius: '2px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '14px', color: 'var(--dark)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '2px' }}>{p.category} · {p.published_at}</div>
            </div>
            <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '100px', background: p.published ? '#E8F5E9' : '#FFF3E0', color: p.published ? '#2E7D32' : '#E65100', whiteSpace: 'nowrap' }}>{p.published ? 'Published' : 'Draft'}</span>
            <button onClick={() => setEditing(p)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '2px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer', color: 'var(--text-mid)' }}>Edit</button>
            <button onClick={() => togglePublish(p)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '2px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer', color: 'var(--text-mid)' }}>{p.published ? 'Unpublish' : 'Publish'}</button>
            <button onClick={() => del(p)} style={{ background: 'none', border: '1px solid #FFCDD2', borderRadius: '2px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer', color: '#C62828' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function PagesTab({ toast }: { toast: (m: string) => void }) {
  const [sections, setSections] = useState<PageContent[]>([])
  const [saving, setSaving] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => { load() }, [])
  async function load() { const { data } = await supabase.from('page_content').select('*'); if (data && data.length > 0) setSections(data as PageContent[]); else setSections(PAGE_SECTIONS) }

  async function saveSection(s: PageContent) {
    setSaving(s.section_key)
    if (s.id) { await supabase.from('page_content').update({ content: s.content }).eq('id', s.id) }
    else { const { data } = await supabase.from('page_content').insert(s).select().single(); if (data) setSections(prev => prev.map(x => x.section_key === s.section_key ? { ...x, id: (data as PageContent).id } : x)) }
    setSaving(null); toast('Saved ✓')
  }

  const grouped = sections.reduce<Record<string, PageContent[]>>((acc, s) => { if (!acc[s.page_key]) acc[s.page_key] = []; acc[s.page_key].push(s); return acc }, {})

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', color: 'var(--dark)', margin: '0 0 8px' }}>Page content</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-light)', margin: 0 }}>Edit text blocks across pages without touching code.</p>
      </div>
      {Object.entries(grouped).map(([page, items]) => (
        <div key={page}>
          <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--border)' }}>{page}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {items.map(s => (
              <div key={s.section_key}>
                <label style={lbl}>{s.label}</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <textarea style={{ ...inp, minHeight: '72px', resize: 'vertical', flex: 1 }} value={s.content} onChange={e => setSections(prev => prev.map(x => x.section_key === s.section_key ? { ...x, content: e.target.value } : x))} />
                  <button onClick={() => saveSection(s)} disabled={saving === s.section_key} style={{ background: 'var(--terracotta)', color: 'white', border: 'none', borderRadius: '2px', padding: '9px 16px', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>{saving === s.section_key ? '…' : 'Save'}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ImagesTab({ toast }: { toast: (m: string) => void }) {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  useEffect(() => { load() }, [])
  async function load() {
    const { data } = await supabase.storage.from('site-images').list('', { sortBy: { column: 'created_at', order: 'desc' } })
    if (data) setImages(data.filter(f => f.name !== '.emptyFolderPlaceholder').map(f => { const { data: u } = supabase.storage.from('site-images').getPublicUrl(f.name); return { name: f.name, url: u.publicUrl, created_at: f.created_at ?? '' } }))
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files; if (!files || files.length === 0) return
    setUploading(true)
    for (const file of Array.from(files)) { const name = `${Date.now()}-${file.name.replace(/[^a-z0-9._-]/gi, '_')}`; await supabase.storage.from('site-images').upload(name, file, { upsert: true }) }
    await load(); setUploading(false); toast(`${files.length} image${files.length > 1 ? 's' : ''} uploaded ✓`)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function del(name: string) { if (!confirm(`Delete ${name}?`)) return; await supabase.storage.from('site-images').remove([name]); await load(); toast('Deleted') }
  function copy(url: string) { navigator.clipboard.writeText(url); toast('URL copied ✓') }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', color: 'var(--dark)', margin: '0 0 4px' }}>Images</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-light)', margin: 0 }}>Stored in Supabase Storage. Copy URL to use in content.</p>
        </div>
        <div>
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleUpload} style={{ display: 'none' }} id="img-upload" />
          <label htmlFor="img-upload" style={{ display: 'inline-block', background: uploading ? 'var(--text-light)' : 'var(--terracotta)', color: 'white', borderRadius: '2px', padding: '9px 18px', fontSize: '13px', cursor: uploading ? 'not-allowed' : 'pointer' }}>{uploading ? 'Uploading…' : '+ Upload images'}</label>
        </div>
      </div>
      {images.length === 0 && <div style={{ textAlign: 'center', padding: '48px', background: 'var(--cream)', borderRadius: '2px', border: '1px dashed var(--border)' }}><p style={{ fontSize: '14px', color: 'var(--text-light)' }}>No images yet.</p></div>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map(img => (
          <div key={img.name} style={{ border: '1px solid var(--border)', borderRadius: '2px', overflow: 'hidden', background: 'white' }}>
            <div style={{ height: '140px', overflow: 'hidden', background: 'var(--cream)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-mid)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '8px' }}>{img.name}</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => copy(img.url)} style={{ flex: 1, background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: '2px', padding: '5px', fontSize: '11px', cursor: 'pointer', color: 'var(--text-mid)' }}>Copy URL</button>
                <button onClick={() => del(img.name)} style={{ background: 'none', border: '1px solid #FFCDD2', borderRadius: '2px', padding: '5px 8px', fontSize: '11px', cursor: 'pointer', color: '#C62828' }}>×</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('blog')
  const [authChecked, setAuthChecked] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) { setAuthed(true) } else { router.push('/admin/login') }
      setAuthChecked(true)
    })
  }, [])

  async function signOut() { await supabase.auth.signOut(); router.push('/') }

  if (!authChecked || !authed) return null

  const tabs: { key: Tab; label: string }[] = [{ key: 'blog', label: 'Blog posts' }, { key: 'pages', label: 'Page content' }, { key: 'images', label: 'Images' }]

  return (
    <div className="pt-[72px]" style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '52px' }}>
        <div style={{ display: 'flex', gap: 0 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: '0 20px', height: '52px', background: 'none', border: 'none', borderBottom: `2px solid ${tab === t.key ? 'var(--terracotta)' : 'transparent'}`, fontSize: '13px', fontFamily: "'DM Sans', sans-serif", color: tab === t.key ? 'var(--terracotta)' : 'var(--text-mid)', cursor: 'pointer', whiteSpace: 'nowrap' }}>{t.label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a href="/" target="_blank" style={{ fontSize: '12px', color: 'var(--text-light)', textDecoration: 'none' }}>View site →</a>
          <button onClick={signOut} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '2px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer', color: 'var(--text-mid)' }}>Sign out</button>
        </div>
      </div>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 48px' }}>
        {tab === 'blog' && <BlogTab toast={setToastMsg} />}
        {tab === 'pages' && <PagesTab toast={setToastMsg} />}
        {tab === 'images' && <ImagesTab toast={setToastMsg} />}
      </div>
      {toastMsg && <Toast msg={toastMsg} onDone={() => setToastMsg('')} />}
    </div>
  )
}
