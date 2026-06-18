import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="pt-[72px]">
      <div style={{ background: 'var(--cream)', padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '16px' }}>Legal</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,4vw,56px)', color: 'var(--dark)', marginBottom: '16px' }}>Privacy Policy</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-light)' }}>Last updated: June 2026</p>
        </div>
      </div>
      <article style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 48px 96px' }}>
        {[
          { heading: '1. Who we are', body: 'Mudleaf is operated by Monica and Philip Allan, ABN [number], based in Mannum SA 5238, Australia. We can be contacted at enquiries@mudleaf.com.au.' },
          { heading: '2. What information we collect', body: 'We collect information you provide directly — including your name, email address, and any details submitted through our contact or feedback forms. We do not collect payment information directly; purchases through Etsy are handled by Etsy\'s own systems.' },
          { heading: '3. How we use your information', body: 'We use your information to respond to enquiries, deliver programs you have registered for, send service updates and documentation, and improve our services. We do not use your information for unsolicited marketing without your consent.' },
          { heading: '4. NDIS participant information', body: 'If you are an NDIS participant, we may collect additional information necessary to provide services under your plan. This information is used only for service delivery and invoicing purposes and is handled in accordance with NDIS Privacy Guidance.' },
          { heading: '5. Storage and security', body: 'Your data is stored securely using Supabase, a cloud database provider. Data is encrypted in transit and at rest. We take reasonable steps to protect your information from unauthorised access, loss, or disclosure.' },
          { heading: '6. Disclosure to third parties', body: 'We do not sell or share your personal information with third parties for marketing purposes. We may share information with service providers who assist us in operating our programs, where those providers are bound by appropriate confidentiality obligations.' },
          { heading: '7. Access and correction', body: 'You have the right to access the personal information we hold about you and to request corrections. Contact us at enquiries@mudleaf.com.au. We will respond within 30 days.' },
          { heading: '8. Complaints', body: 'If you have a concern about how we have handled your personal information, please contact us first at enquiries@mudleaf.com.au. If unsatisfied, you may contact the Office of the Australian Information Commissioner at oaic.gov.au.' },
          { heading: '9. Changes to this policy', body: 'We may update this policy from time to time. The current version is always available at mudleaf.com.au/privacy.' },
        ].map((s) => (
          <div key={s.heading} style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--dark)', marginBottom: '12px' }}>{s.heading}</h2>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', margin: 0 }}>{s.body}</p>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
          <Link href="/contact" style={{ color: 'var(--terracotta)', textDecoration: 'none', fontSize: '14px' }}>Contact us with any privacy questions →</Link>
        </div>
      </article>
    </div>
  )
}
