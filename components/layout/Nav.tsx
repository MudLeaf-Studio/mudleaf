'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Programs',
    href: '/programs',
    dropdown: [
      { label: 'MH & Horticulture', href: '/programs' },
      { label: 'Corporate Programs', href: '/corporate' },
      { label: 'MLAT™', href: '/mlat' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'NDIS', href: '/ndis' },
  { label: 'Blog', href: '/blog' },
  { label: 'Shop', href: '/shop' },
  { label: 'Feedback', href: '/feedback' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 h-[72px] transition-all duration-300"
      style={{
        background: 'rgba(250, 247, 244, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E2D5C8',
        boxShadow: scrolled ? '0 2px 20px rgba(44,24,16,0.08)' : 'none',
      }}
    >
      {/* Logo */}
      <Link href="/" className="no-underline flex flex-col">
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '22px',
          fontWeight: 600,
          color: 'var(--terracotta)',
          letterSpacing: '0.5px',
          lineHeight: 1.2,
        }}>
          Mudleaf
        </span>
        <span style={{
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--text-mid)',
          fontWeight: 300,
        }}>
          Horticulture and Wellbeing Programs
        </span>
      </Link>

      {/* Desktop links */}
      <ul className="hidden lg:flex items-center gap-9 list-none m-0 p-0">
        {navLinks.map((link) =>
          link.dropdown ? (
            <li
              key={link.href}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href={link.href}
                className="no-underline transition-colors duration-200"
                style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  color: pathname.startsWith(link.href) ? 'var(--terracotta)' : 'var(--text-mid)',
                  letterSpacing: '0.5px',
                }}
              >
                {link.label} ▾
              </Link>
              {dropdownOpen && (
                <ul
                  className="absolute top-full left-0 mt-2 list-none p-2 rounded-sm z-50"
                  style={{
                    background: 'white',
                    border: '1px solid var(--border)',
                    minWidth: '200px',
                    boxShadow: '0 8px 32px rgba(44,24,16,0.1)',
                  }}
                >
                  {link.dropdown.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block no-underline transition-all duration-150 rounded-sm"
                        style={{
                          padding: '10px 18px',
                          fontSize: '13px',
                          color: 'var(--text-mid)',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--terracotta)'
                          e.currentTarget.style.background = 'var(--cream)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text-mid)'
                          e.currentTarget.style.background = 'transparent'
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li key={link.href}>
              <Link
                href={link.href}
                className="no-underline transition-colors duration-200"
                style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  color: pathname === link.href ? 'var(--terracotta)' : 'var(--text-mid)',
                  letterSpacing: '0.5px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--terracotta)')}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = pathname === link.href ? 'var(--terracotta)' : 'var(--text-mid)'
                }}
              >
                {link.label}
              </Link>
            </li>
          )
        )}
        <li>
          <Link
            href="/contact"
            className="no-underline text-white text-sm px-5 py-2.5 rounded-sm transition-all duration-200"
            style={{ background: 'var(--terracotta)', fontSize: '13px' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--dark-mid)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--terracotta)')}
          >
            Get in Touch
          </Link>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span className="block w-6 h-px transition-all duration-300" style={{
          background: 'var(--text)',
          transform: mobileOpen ? 'translateY(8px) rotate(45deg)' : 'none',
        }} />
        <span className="block w-6 h-px transition-all duration-300" style={{
          background: 'var(--text)',
          opacity: mobileOpen ? 0 : 1,
        }} />
        <span className="block w-6 h-px transition-all duration-300" style={{
          background: 'var(--text)',
          transform: mobileOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
        }} />
      </button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed top-[72px] left-0 right-0 z-40 flex flex-col gap-5 px-5 py-6"
          style={{
            background: 'var(--warm-white)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                className="no-underline text-sm block"
                style={{ color: 'var(--text-mid)', fontWeight: 400 }}
              >
                {link.label}
              </Link>
              {link.dropdown && (
                <div className="flex flex-col gap-3 mt-3 pl-4">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="no-underline text-sm"
                      style={{ color: 'var(--text-light)' }}
                    >
                      → {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            className="no-underline text-white text-sm px-5 py-3 rounded-sm text-center"
            style={{ background: 'var(--terracotta)' }}
          >
            Get in Touch
          </Link>
        </div>
      )}
    </nav>
  )
}
