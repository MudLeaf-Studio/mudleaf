import Link from 'next/link'

export default function RefundsPage() {
  return (
    <div className="pt-[72px]">
      <div style={{ background: 'var(--cream)', padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '16px' }}>Legal</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,4vw,56px)', color: 'var(--dark)', marginBottom: '16px' }}>Refund Policy</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-light)' }}>Last updated: June 2026</p>
        </div>
      </div>
      <article style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 48px 96px' }}>
        {[
          { heading: 'Programs and services', body: 'Cancellations made more than 7 days before program commencement will receive a full refund. Cancellations within 7 days may receive a partial refund at our discretion. Once a program has commenced, refunds are not available for completed sessions. Contact us at enquiries@mudleaf.com.au.' },
          { heading: 'NDIS participants', body: 'Refunds for NDIS-funded services are handled in accordance with your service agreement and the NDIS Pricing Arrangements and Price Limits. Contact us first at enquiries@mudleaf.com.au, or raise concerns directly with your plan manager or the NDIS Quality and Safeguards Commission.' },
          { heading: 'Digital products', body: 'Because digital products are delivered immediately upon purchase and cannot be returned, we generally do not offer refunds on digital downloads. If you experience a technical issue with a file, contact us and we will resolve it promptly. Etsy purchases are also subject to Etsy\'s purchase protection policies.' },
          { heading: 'Exceptional circumstances', body: 'We understand that unexpected circumstances arise. If your situation is not covered by this policy, please contact us directly. We will always try to reach a fair outcome.' },
          { heading: 'How to request a refund', body: 'Email enquiries@mudleaf.com.au with your name, the program or product, date of purchase, and reason for your request. We aim to respond within two business days and process approved refunds within 10 business days.' },
          { heading: 'Australian Consumer Law', body: 'Nothing in this policy limits or excludes your rights under the Australian Consumer Law. If a product or service has a major failure, you are entitled to a remedy under the Australian Consumer Law regardless of this policy.' },
        ].map((s) => (
          <div key={s.heading} style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--dark)', marginBottom: '12px' }}>{s.heading}</h2>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', margin: 0 }}>{s.body}</p>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
          <Link href="/contact" style={{ color: 'var(--terracotta)', textDecoration: 'none', fontSize: '14px' }}>Contact us to discuss a refund →</Link>
        </div>
      </article>
    </div>
  )
}
