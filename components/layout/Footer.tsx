'use client'
import Link from 'next/link'
import { useContent } from '@/lib/useContent'

export default function Footer() {
  const c = useContent('footer')

  return (
    <footer style={{ background: 'var(--dark)', padding: '64px 48px 32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="md:col-span-1">
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', color: 'var(--terracotta-light)', marginBottom: '12px' }}>Mudleaf™</h3>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{c.trademark_line}</p>
            <div className="flex gap-3 mt-5 flex-wrap">
              <a href="https://www.youtube.com/@lovelifemadly6729" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 no-underline transition-colors duration-200" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--terracotta-light)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
                {c.youtube_label}
              </a>
              <a href="https://www.etsy.com/shop/MudLeafLoveLifeMadly" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 no-underline transition-colors duration-200" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--terracotta-light)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                {c.etsy_label}
              </a>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>Programs</h4>
            <ul className="list-none p-0 m-0 space-y-2.5">
              {[{ label: 'MH & Horticulture', href: '/programs' }, { label: 'Corporate Programs', href: '/corporate' }, { label: 'MLAT™', href: '/mlat' }, { label: 'Shop', href: '/shop' }].map((item) => (
                <li key={item.href}><Link href={item.href} className="footer-link">{item.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>Information</h4>
            <ul className="list-none p-0 m-0 space-y-2.5">
              {[{ label: 'About Mudleaf', href: '/about' }, { label: 'What Guides Us', href: '/guides' }, { label: 'NDIS Information', href: '/ndis' }, { label: 'Blog', href: '/blog' }, { label: 'Feedback & Concerns', href: '/feedback' }, { label: 'Contact', href: '/contact' }].map((item) => (
                <li key={item.href}><Link href={item.href} className="footer-link">{item.label}</Link></li>
              ))}
              <li><a href="https://www.youtube.com/@lovelifemadly6729" target="_blank" rel="noopener noreferrer" className="footer-link">YouTube — LoveLifeMadly</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>Philosophy</h4>
            <ul className="list-none p-0 m-0 space-y-2.5 mb-6">
              {[{ label: 'Tamil Contemplative Traditions', href: '/tamil' }, { label: 'Our Framework', href: '/guides' }, { label: 'MLAT Research', href: '/mlat' }].map((item) => (
                <li key={item.href}><Link href={item.href} className="footer-link">{item.label}</Link></li>
              ))}
            </ul>
            <h4 style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>Legal</h4>
            <ul className="list-none p-0 m-0 space-y-2.5">
              {[{ label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms & Conditions', href: '/terms' }, { label: 'Refund Policy', href: '/refunds' }].map((item) => (
                <li key={item.href}><Link href={item.href} className="footer-link">{item.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>{c.copyright_line}</p>
          <div className="flex gap-6">
            {[{ label: 'Privacy', href: '/privacy' }, { label: 'Terms', href: '/terms' }, { label: 'NDIS Provider Statement', href: '/ndis' }].map((item) => (
              <Link key={item.href} href={item.href} className="no-underline transition-colors duration-200" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}>{item.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
