'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { PAGE_CONTENT_SCHEMA } from '@/lib/content-schema'
import { THEMES } from '@/lib/themes'

type Tab = 'blog' | 'pages' | 'images' | 'nav' | 'theme'
type BlogPost = { id?: string; slug: string; title: string; category: string; author: string; excerpt: string; body: string; read_time_minutes: number; published: boolean; published_at: string; featured: boolean }
type NavItem = { label: string; href: string; dropdown?: { label: string; href: string }[] }
type UploadedImage = { name: string; url: string; created_at: string }

const BLANK_POST: BlogPost = { slug: '', title: '', category: 'mindfulness', author: 'Monica Allan', excerpt: '', body: '', read_time_minutes: 5, published: false, published_at: new Date().toISOString().slice(0, 10), featured: false }
const CATEGORIES = ['mindfulness', 'horticulture', 'tamil', 'ndis', 'garden-to-table', 'research']

const PAGE_IMAGES: Record<string, { key: string; label: string }[]> = {
  home: [
    { key: 'hero_bg', label: 'Hero — Background Image' },
    { key: 'photo_1', label: 'Gallery Photo 1' },
    { key: 'photo_2', label: 'Gallery Photo 2' },
    { key: 'photo_3', label: 'Gallery Photo 3' },
  ],
  about: [
    { key: 'garden_photo', label: 'About — Garden Photo' },
    { key: 'monica_photo', label: 'Monica — Profile Photo' },
    { key: 'philip_photo', label: 'Philip — Profile Photo' },
  ],
  programs: [
    { key: 'hero_image', label: 'Programs — Hero Image' },
  ],
  corporate: [
    { key: 'hero_image', label: 'Corporate — Hero Image' },
  ],
  ndis: [
    { key: 'hero_image', label: 'NDIS — Hero Image' },
  ],
  blog: [
    { key: 'default_cover', label: 'Blog — Default Post Cover' },
  ],
}

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
    if (!editing) return; setSaving(true)
    const p = { ...editing, slug: editing.slug || slugify(editing.title) }
    if (p.id) { await supabase.from('blog_posts').update(p).eq('id', p.id) } else { await supabase.from('blog_posts').insert(p) }
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
  const pageKeys = Object.keys(PAGE_CONTENT_SCHEMA)
  const [activePage, setActivePage] = useState(pageKeys[0])
  const [content, setContent] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => { load(activePage) }, [activePage])
  async function load(pageKey: string) {
    const schema = PAGE_CONTENT_SCHEMA[pageKey]
    const defaults: Record<string, string> = {}
    for (const [k, f] of Object.entries(schema.fields)) defaults[k] = f.default
    const { data } = await supabase.from('page_content').select('content').eq('page_key', pageKey).maybeSingle()
    setContent({ ...defaults, ...(data?.content ?? {}) })
  }
  async function save() {
    setSaving(true)
    await supabase.from('page_content').upsert({ page_key: activePage, content })
    setSaving(false); toast('Saved ✓')
  }

  const schema = PAGE_CONTENT_SCHEMA[activePage]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '80px' }}>
      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', color: 'var(--dark)', margin: '0 0 8px' }}>Page content</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-light)', margin: 0 }}>Select a page, edit any field, then save. Changes appear on the live site within seconds.</p>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        {pageKeys.map((key) => (
          <button key={key} onClick={() => setActivePage(key)} style={{ padding: '7px 16px', borderRadius: '100px', border: '1px solid var(--border)', background: activePage === key ? 'var(--terracotta)' : 'white', color: activePage === key ? 'white' : 'var(--text-mid)', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {PAGE_CONTENT_SCHEMA[key].label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(schema.fields).map(([key, field]) => (
          <div key={key}>
            <label style={lbl}>{field.label}</label>
            <textarea style={{ ...inp, minHeight: field.multiline ? '90px' : '44px', resize: 'vertical' }} value={content[key] ?? ''} onChange={(e) => setContent({ ...content, [key]: e.target.value })} />
          </div>
        ))}
      </div>
      <div style={{ position: 'sticky', bottom: '16px', display: 'flex', justifyContent: 'flex-end', background: 'var(--cream)', paddingTop: '12px' }}>
        <button onClick={save} disabled={saving} style={{ background: saving ? 'var(--text-light)' : 'var(--terracotta)', color: 'white', border: 'none', borderRadius: '2px', padding: '10px 28px', fontSize: '13px', cursor: saving ? 'not-allowed' : 'pointer', boxShadow: '0 4px 16px rgba(44,24,16,0.15)' }}>
          {saving ? 'Saving…' : `Save ${schema.label} changes`}
        </button>
      </div>
    </div>
  )
}

function ImagesTab({ toast }: { toast: (m: string) => void }) {
  const pageKeys = Object.keys(PAGE_IMAGES)
  const [activePage, setActivePage] = useState(pageKeys[0])
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({})
  const [uploading, setUploading] = useState<string | null>(null)
  const [allImages, setAllImages] = useState<UploadedImage[]>([])
  const supabase = createClient()

  useEffect(() => { loadPageImages(activePage); loadAllImages() }, [activePage])

  async function loadPageImages(pageKey: string) {
    const { data } = await supabase.from('page_content').select('content').eq('page_key', `${pageKey}_images`).maybeSingle()
    setImageUrls(data?.content ?? {})
  }

  async function loadAllImages() {
    const { data } = await supabase.storage.from('site-images').list('', { sortBy: { column: 'created_at', order: 'desc' } })
    if (data) setAllImages(data.filter(f => f.name !== '.emptyFolderPlaceholder').map(f => { const { data: u } = supabase.storage.from('site-images').getPublicUrl(f.name); return { name: f.name, url: u.publicUrl, created_at: f.created_at ?? '' } }))
  }

  async function uploadForSlot(slotKey: string, file: File) {
    setUploading(slotKey)
    const name = `${activePage}-${slotKey}-${Date.now()}.${file.name.split('.').pop()}`
    await supabase.storage.from('site-images').upload(name, file, { upsert: true })
    const { data: urlData } = supabase.storage.from('site-images').getPublicUrl(name)
    const newUrls = { ...imageUrls, [slotKey]: urlData.publicUrl }
    await supabase.from('page_content').upsert({ page_key: `${activePage}_images`, content: newUrls })
    setImageUrls(newUrls)
    await loadAllImages()
    setUploading(null)
    toast('Image uploaded ✓')
  }

  async function clearSlot(slotKey: string) {
    const newUrls = { ...imageUrls }
    delete newUrls[slotKey]
    await supabase.from('page_content').upsert({ page_key: `${activePage}_images`, content: newUrls })
    setImageUrls(newUrls)
    toast('Image cleared')
  }

  async function deleteFromLibrary(name: string) {
    if (!confirm(`Delete ${name} from library?`)) return
    await supabase.storage.from('site-images').remove([name])
    await loadAllImages()
    toast('Deleted from library')
  }

  function copyUrl(url: string) { navigator.clipboard.writeText(url); toast('URL copied ✓') }

  const slots = PAGE_IMAGES[activePage] ?? []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', color: 'var(--dark)', margin: '0 0 8px' }}>Page images</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-light)', margin: 0 }}>Upload images to named slots per page. Each slot has a specific purpose on the site.</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        {pageKeys.map((key) => (
          <button key={key} onClick={() => setActivePage(key)} style={{ padding: '7px 16px', borderRadius: '100px', border: '1px solid var(--border)', background: activePage === key ? 'var(--terracotta)' : 'white', color: activePage === key ? 'white' : 'var(--text-mid)', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slots.map((slot) => {
          const url = imageUrls[slot.key]
          return (
            <div key={slot.key} style={{ border: '1px solid var(--border)', borderRadius: '2px', overflow: 'hidden', background: 'white' }}>
              <div style={{ height: '160px', background: 'var(--cream)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {url
                  ? <img src={url} alt={slot.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>No image set</span>
                }
              </div>
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-mid)', marginBottom: '8px' }}>{slot.label}</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <label style={{ display: 'inline-block', background: uploading === slot.key ? 'var(--text-light)' : 'var(--terracotta)', color: 'white', borderRadius: '2px', padding: '5px 12px', fontSize: '11px', cursor: uploading === slot.key ? 'not-allowed' : 'pointer' }}>
                    {uploading === slot.key ? 'Uploading…' : 'Upload'}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) uploadForSlot(slot.key, e.target.files[0]) }} />
                  </label>
                  {url && <button onClick={() => copyUrl(url)} style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: '2px', padding: '5px 10px', fontSize: '11px', cursor: 'pointer', color: 'var(--text-mid)' }}>Copy URL</button>}
                  {url && <button onClick={() => clearSlot(slot.key)} style={{ background: 'none', border: '1px solid #FFCDD2', borderRadius: '2px', padding: '5px 10px', fontSize: '11px', cursor: 'pointer', color: '#C62828' }}>Clear</button>}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--dark)', margin: '0 0 12px' }}>Full image library</h3>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {allImages.map(img => (
            <div key={img.name} style={{ border: '1px solid var(--border)', borderRadius: '2px', overflow: 'hidden', background: 'white' }}>
              <div style={{ height: '80px' }}>
                <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '6px 8px', display: 'flex', gap: '4px' }}>
                <button onClick={() => copyUrl(img.url)} style={{ flex: 1, background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: '2px', padding: '3px', fontSize: '10px', cursor: 'pointer', color: 'var(--text-mid)' }}>Copy</button>
                <button onClick={() => deleteFromLibrary(img.name)} style={{ background: 'none', border: '1px solid #FFCDD2', borderRadius: '2px', padding: '3px 5px', fontSize: '10px', cursor: 'pointer', color: '#C62828' }}>×</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function NavTab({ toast }: { toast: (m: string) => void }) {
  const [nav, setNav] = useState<NavItem[]>([])
  const [saving, setSaving] = useState(false)
  const [editingDropdown, setEditingDropdown] = useState<number | null>(null)
  const supabase = createClient()

  useEffect(() => { load() }, [])
  async function load() {
    const { data } = await supabase.from('site_nav').select('nav').eq('id', 1).single()
    if (data?.nav) setNav(data.nav as NavItem[])
  }
  async function save() {
    setSaving(true)
    await supabase.from('site_nav').update({ nav }).eq('id', 1)
    setSaving(false); toast('Navigation saved ✓')
  }

  function updateItem(i: number, field: string, value: string) { setNav(nav.map((n, idx) => idx === i ? { ...n, [field]: value } : n)) }
  function moveItem(i: number, dir: -1 | 1) { const n = [...nav]; const tmp = n[i]; n[i] = n[i + dir]; n[i + dir] = tmp; setNav(n) }
  function removeItem(i: number) { setNav(nav.filter((_, idx) => idx !== i)) }
  function addItem() { setNav([...nav, { label: 'New Page', href: '/new-page' }]) }
  function addDropdownItem(i: number) { const n = [...nav]; n[i].dropdown = [...(n[i].dropdown ?? []), { label: 'Sub page', href: '/sub' }]; setNav(n) }
  function updateDropdownItem(i: number, j: number, field: string, value: string) { const n = [...nav]; n[i].dropdown = n[i].dropdown!.map((d, idx) => idx === j ? { ...d, [field]: value } : d); setNav(n) }
  function removeDropdownItem(i: number, j: number) { const n = [...nav]; n[i].dropdown = n[i].dropdown!.filter((_, idx) => idx !== j); if (n[i].dropdown!.length === 0) delete n[i].dropdown; setNav(n) }
  function toggleDropdown(i: number) { const n = [...nav]; if (n[i].dropdown) { delete n[i].dropdown } else { n[i].dropdown = [{ label: 'Sub page', href: '/sub' }] } setNav(n) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', color: 'var(--dark)', margin: '0 0 6px' }}>Navigation</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-light)', margin: 0 }}>Add, remove, rename, reorder nav items and dropdowns. Changes apply site-wide instantly on save.</p>
        </div>
        <button onClick={addItem} style={{ background: 'var(--terracotta)', color: 'white', border: 'none', borderRadius: '2px', padding: '9px 18px', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}>+ Add item</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {nav.map((item, i) => (
          <div key={i} style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'white', overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '12px 14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginRight: '4px' }}>
                <button onClick={() => i > 0 && moveItem(i, -1)} disabled={i === 0} style={{ background: 'none', border: 'none', cursor: i === 0 ? 'not-allowed' : 'pointer', color: 'var(--text-light)', fontSize: '10px', padding: '1px 4px', opacity: i === 0 ? 0.3 : 1 }}>▲</button>
                <button onClick={() => i < nav.length - 1 && moveItem(i, 1)} disabled={i === nav.length - 1} style={{ background: 'none', border: 'none', cursor: i === nav.length - 1 ? 'not-allowed' : 'pointer', color: 'var(--text-light)', fontSize: '10px', padding: '1px 4px', opacity: i === nav.length - 1 ? 0.3 : 1 }}>▼</button>
              </div>
              <input style={{ ...inp, flex: 1 }} value={item.label} onChange={e => updateItem(i, 'label', e.target.value)} placeholder="Label" />
              <input style={{ ...inp, flex: 1 }} value={item.href} onChange={e => updateItem(i, 'href', e.target.value)} placeholder="/path" />
              <button onClick={() => toggleDropdown(i)} style={{ background: item.dropdown ? 'var(--terracotta-pale)' : 'var(--cream)', border: '1px solid var(--border)', borderRadius: '2px', padding: '7px 10px', fontSize: '11px', cursor: 'pointer', color: item.dropdown ? 'var(--terracotta)' : 'var(--text-mid)', whiteSpace: 'nowrap' }}>
                {item.dropdown ? '▾ Has dropdown' : '+ Dropdown'}
              </button>
              <button onClick={() => removeItem(i)} style={{ background: 'none', border: '1px solid #FFCDD2', borderRadius: '2px', padding: '7px 10px', fontSize: '11px', cursor: 'pointer', color: '#C62828' }}>Remove</button>
            </div>
            {item.dropdown && (
              <div style={{ background: 'var(--cream)', borderTop: '1px solid var(--border)', padding: '12px 14px 12px 48px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {item.dropdown.map((d, j) => (
                  <div key={j} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-light)', marginRight: '4px' }}>→</span>
                    <input style={{ ...inp, flex: 1 }} value={d.label} onChange={e => updateDropdownItem(i, j, 'label', e.target.value)} placeholder="Label" />
                    <input style={{ ...inp, flex: 1 }} value={d.href} onChange={e => updateDropdownItem(i, j, 'href', e.target.value)} placeholder="/path" />
                    <button onClick={() => removeDropdownItem(i, j)} style={{ background: 'none', border: '1px solid #FFCDD2', borderRadius: '2px', padding: '5px 8px', fontSize: '11px', cursor: 'pointer', color: '#C62828' }}>×</button>
                  </div>
                ))}
                <button onClick={() => addDropdownItem(i)} style={{ alignSelf: 'flex-start', background: 'none', border: '1px solid var(--border)', borderRadius: '2px', padding: '5px 12px', fontSize: '11px', cursor: 'pointer', color: 'var(--text-mid)', marginTop: '4px' }}>+ Add dropdown item</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ position: 'sticky', bottom: '16px', display: 'flex', justifyContent: 'flex-end', background: 'var(--cream)', paddingTop: '12px' }}>
        <button onClick={save} disabled={saving} style={{ background: saving ? 'var(--text-light)' : 'var(--terracotta)', color: 'white', border: 'none', borderRadius: '2px', padding: '10px 28px', fontSize: '13px', cursor: saving ? 'not-allowed' : 'pointer', boxShadow: '0 4px 16px rgba(44,24,16,0.15)' }}>
          {saving ? 'Saving…' : 'Save navigation'}
        </button>
      </div>
    </div>
  )
}

function ThemeTab({ toast }: { toast: (m: string) => void }) {
  const [activeKey, setActiveKey] = useState('terracotta')
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.from('site_theme').select('theme_key').eq('id', 1).single()
      .then(({ data }) => { if (data?.theme_key) setActiveKey(data.theme_key) })
  }, [])

  async function applyTheme(key: string) {
    setSaving(true)
    await supabase.from('site_theme').update({ theme_key: key }).eq('id', 1)
    setActiveKey(key)
    const theme = THEMES.find(t => t.key === key)!
    const root = document.documentElement
    for (const [k, v] of Object.entries(theme.vars)) root.style.setProperty(k, v)
    setSaving(false)
    toast(`Theme "${theme.label}" applied ✓ — refresh the site to see it`)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', color: 'var(--dark)', margin: '0 0 8px' }}>Theme</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-light)', margin: 0 }}>Select a colour theme. Applies site-wide instantly — no redeploy needed.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {THEMES.map((theme) => (
          <div key={theme.key} onClick={() => !saving && applyTheme(theme.key)} style={{ border: `2px solid ${activeKey === theme.key ? theme.vars['--terracotta'] : 'var(--border)'}`, borderRadius: '4px', padding: '20px', cursor: saving ? 'not-allowed' : 'pointer', background: activeKey === theme.key ? theme.vars['--terracotta-pale'] : 'white', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              {theme.preview.map((color, i) => (
                <div key={i} style={{ width: '28px', height: '28px', borderRadius: '50%', background: color, border: '1px solid rgba(0,0,0,0.08)' }} />
              ))}
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', color: 'var(--dark)', marginBottom: '4px' }}>{theme.label}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>{theme.headingFont.split(',')[0].replace(/'/g, '')}</div>
            {activeKey === theme.key && <div style={{ marginTop: '10px', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: theme.vars['--terracotta'], fontWeight: 600 }}>✓ Active</div>}
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

  const tabs: { key: Tab; label: string }[] = [
    { key: 'blog', label: 'Blog posts' },
    { key: 'pages', label: 'Page content' },
    { key: 'images', label: 'Images' },
    { key: 'nav', label: 'Navigation' },
    { key: 'theme', label: 'Theme' },
  ]

  return (
    <div className="pt-[72px]" style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '52px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 0, flexShrink: 0 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: '0 18px', height: '52px', background: 'none', border: 'none', borderBottom: `2px solid ${tab === t.key ? 'var(--terracotta)' : 'transparent'}`, fontSize: '13px', fontFamily: "'DM Sans', sans-serif", color: tab === t.key ? 'var(--terracotta)' : 'var(--text-mid)', cursor: 'pointer', whiteSpace: 'nowrap' }}>{t.label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexShrink: 0 }}>
          <a href="/" target="_blank" style={{ fontSize: '12px', color: 'var(--text-light)', textDecoration: 'none' }}>View site →</a>
          <button onClick={signOut} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '2px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer', color: 'var(--text-mid)' }}>Sign out</button>
        </div>
      </div>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 48px' }}>
        {tab === 'blog' && <BlogTab toast={setToastMsg} />}
        {tab === 'pages' && <PagesTab toast={setToastMsg} />}
        {tab === 'images' && <ImagesTab toast={setToastMsg} />}
        {tab === 'nav' && <NavTab toast={setToastMsg} />}
        {tab === 'theme' && <ThemeTab toast={setToastMsg} />}
      </div>
      {toastMsg && <Toast msg={toastMsg} onDone={() => setToastMsg('')} />}
    </div>
  )
}
