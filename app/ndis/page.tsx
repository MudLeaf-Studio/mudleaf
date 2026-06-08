'use client'
import { PageHero, Reveal } from '@/components/ui'
import Link from 'next/link'


export default function NDISPage() {
  return (
    <div className="pt-[72px]">
      <PageHero
        tag="NDIS"
        title={<>Supporting NDIS<br />participants to thrive</>}
        subtitle="Mudleaf is an unregistered NDIS provider welcoming self-managed and plan-managed participants. Our programs focus on building real capacity — skills and wellbeing that extend beyond the session and into everyday life."
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 48px' }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-16">

        {/* Main content */}
        <div className="lg:col-span-2">
          {[
            {
              title: 'How Mudleaf works with NDIS',
              paras: [
                'As an unregistered NDIS provider, Mudleaf is available to participants who self-manage their funding or who are plan-managed. We are not available to agency-managed participants at this time.',
                'All Mudleaf programs are designed under the Capacity Building support category — specifically Improved Daily Living Skills (CB Daily Activity). Our programs build practical, transferable skills in horticulture, emotional regulation, mindfulness, and self-management.',
              ],
            },
            {
              title: 'How to access Mudleaf with your NDIS plan',
              paras: [
                'If you are self-managed, you can pay for Mudleaf services directly from your plan funds and claim reimbursement through the NDIS myplace portal.',
                'If you are plan-managed, your plan manager can pay Mudleaf directly. Contact us first and we will provide a service agreement and invoice template to share with your plan manager.',
                'We do not require a support coordinator to access most programs, though we are happy to liaise with your support coordinator if you have one.',
              ],
            },
            {
              title: 'Service agreements and invoicing',
              paras: [
                'We provide a written service agreement prior to commencing any program. Invoices include the NDIS support item number, unit price, and quantity of units — in the format required for NDIS claiming and plan management.',
                'Contact us at enquiries@mudleaf.com.au to discuss your needs and we will provide all the documentation required to get started.',
              ],
            },
          ].map((section) => (
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
              What participants can access
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'MLAT™ — Mindfulness Lived Awareness Training (online, 8–12 week programs)',
                'Therapeutic horticulture workshops (in-person group, Mannum SA)',
                'Group programs focused on social connection and community participation',
                'Digital workbooks and self-guided resources',
              ].map((item) => (
                <li key={item} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', fontSize: '14px', color: 'var(--text-mid)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--terracotta)', fontWeight: 'bold' }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5 lg:sticky lg:top-24 self-start">
          <div style={{ background: 'var(--terracotta)', padding: '32px', borderRadius: '2px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'white', marginBottom: '12px' }}>
              Ready to get started?
            </h3>
            <p style={{ fontSize: '13px', lineHeight: '1.75', color: 'rgba(255,255,255,0.8)', marginBottom: '20px' }}>
              Contact us to discuss your NDIS plan and which programs are right for you. We respond within two business days.
            </p>
            <Link href="/contact" style={{ display: 'inline-block', background: 'white', color: 'var(--terracotta)', padding: '10px 20px', fontSize: '13px', textDecoration: 'none', borderRadius: '2px', fontWeight: 500 }}>
              Get in touch
            </Link>
          </div>
          {[
            { title: 'Provider status', detail: 'Unregistered NDIS Provider\nABN: [ABN number]\nAvailable to: Self-managed, Plan-managed' },
            { title: 'Support category', detail: 'Capacity Building — Improved Daily Living (CB Daily Activity)\nSupport item: 09_009_0117_6_3' },
            { title: 'Location', detail: 'In-person: Mannum SA 5238\nOnline programs: Available nationally' },
          ].map((card) => (
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
