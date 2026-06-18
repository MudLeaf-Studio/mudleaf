import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="pt-[72px]">
      <div style={{ background: 'var(--cream)', padding: '64px 48px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '16px' }}>Legal</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,4vw,56px)', color: 'var(--dark)', marginBottom: '16px' }}>Terms & Conditions</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-light)' }}>Last updated: June 2026</p>
        </div>
      </div>
      <article style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 48px 96px' }}>
        {[
          { heading: '1. About these terms', body: 'These terms govern your use of mudleaf.com.au and participation in Mudleaf programs. Mudleaf is operated by Monica and Philip Allan, ABN [number], Mannum SA 5238.' },
          { heading: '2. Our programs', body: 'Mudleaf delivers therapeutic horticulture and mental health wellbeing programs. Our programs are designed to build capacity and skills — they are not clinical treatment, crisis services, or a substitute for registered mental health care.' },
          { heading: '3. NDIS services', body: 'Mudleaf is an unregistered NDIS provider delivering services to self-managed and plan-managed participants only. All NDIS services are governed by a written service agreement provided before any program commences.' },
          { heading: '4. Participant responsibilities', body: 'Participants agree to engage respectfully with facilitators and other participants, attend sessions they have booked or give reasonable notice, provide accurate information when registering, and not record sessions without express consent of all participants.' },
          { heading: '5. Digital products', body: 'Digital products purchased through our Etsy shop are subject to Etsy\'s terms of service and our refund policy. All digital files are for personal use only and may not be redistributed or resold without permission.' },
          { heading: '6. Intellectual property', body: 'All content on mudleaf.com.au — including text, images, program materials, and the MLAT™ framework — is the intellectual property of Mudleaf and Monica Allan. MLAT™ is a trade mark of Mudleaf, with applications pending at IP Australia.' },
          { heading: '7. Limitation of liability', body: 'To the extent permitted by Australian law, Mudleaf\'s liability for any loss or damage is limited to the amount paid for the relevant program or product. We are not liable for indirect, consequential, or incidental losses.' },
          { heading: '8. Governing law', body: 'These terms are governed by the laws of South Australia, Australia. Disputes are subject to the exclusive jurisdiction of the courts of South Australia.' },
          { heading: '9. Contact', body: 'For any questions about these terms, contact us at enquiries@mudleaf.com.au.' },
        ].map((s) => (
          <div key={s.heading} style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--dark)', marginBottom: '12px' }}>{s.heading}</h2>
            <p style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', margin: 0 }}>{s.body}</p>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
          <Link href="/contact" style={{ color: 'var(--terracotta)', textDecoration: 'none', fontSize: '14px' }}>Contact us with any questions →</Link>
        </div>
      </article>
    </div>
  )
}
