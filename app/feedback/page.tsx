'use client'
import { PageHero } from '@/components/ui'

export const metadata = {
  title: 'Feedback & Concerns | Mudleaf',
  description: 'Share feedback, raise a concern, or make a suggestion. All feedback is received directly by Monica Allan.',
}

export default function FeedbackPage() {
  return (
    <div className="pt-[72px]">
      <PageHero
        tag="Community"
        title="Feedback & Concerns"
        subtitle="Your experience matters to us. Whether you want to share what is working, raise a concern, suggest something, or tell us something we need to hear — this is the place to do it."
        dark={false}
      />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 48px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Info */}
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', color: 'var(--dark)', marginBottom: '20px' }}>
              We want to hear from you
            </h2>
            {[
              'Mudleaf is a community-facing practice. That means the people who participate in our programs, work alongside us, or encounter our services have a genuine voice in how we operate.',
              'We welcome all feedback — positive, constructive, and critical. If something in a program did not work for you, if you experienced something that felt wrong, or if you have an idea that could make Mudleaf better, we want to know.',
              'All feedback is received by Monica Allan directly. You can choose to share your name and contact details, or submit anonymously.',
            ].map((text, i) => (
              <p key={i} style={{ fontSize: '15px', lineHeight: '1.85', color: 'var(--text-mid)', marginBottom: '16px' }}>{text}</p>
            ))}

            <div className="flex flex-col gap-4 mt-8">
              {[
                { title: 'Program feedback', desc: 'What worked, what didn\'t, what you wish had been different — about any Mudleaf program or session.' },
                { title: 'Concerns', desc: 'If something felt unsafe, inappropriate, or contrary to your dignity and rights — please tell us. We take these matters seriously and will respond promptly.' },
                { title: 'Suggestions', desc: 'Ideas for new programs, content, resources, or ways of working that could better serve participants and the community.' },
                { title: 'Compliments', desc: 'If something made a genuine difference — we want to know that too. It helps us understand what matters most.' },
              ].map((item) => (
                <div key={item.title} style={{ background: 'var(--cream)', padding: '20px 24px', borderRadius: '2px', borderLeft: '3px solid var(--sage)' }}>
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', color: 'var(--dark)', marginBottom: '6px' }}>{item.title}</h4>
                  <p style={{ fontSize: '13px', lineHeight: '1.7', color: 'var(--text-mid)', margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--terracotta-pale)', border: '1px solid var(--border)', padding: '20px 24px', borderRadius: '2px', marginTop: '24px' }}>
              <p style={{ fontSize: '13px', lineHeight: '1.75', color: 'var(--text-mid)', margin: 0 }}>
                <strong style={{ color: 'var(--dark)' }}>NDIS participants:</strong> If your concern relates to your NDIS supports or the quality of service delivery, you also have the right to contact the NDIS Quality and Safeguards Commission directly at{' '}
                <strong>1800 035 544</strong> or{' '}
                <a href="https://www.ndiscommission.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terracotta)' }}>ndiscommission.gov.au</a>.
                {' '}You do not need to raise it with us first.
              </p>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: 'var(--cream)', padding: '40px', borderRadius: '2px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--dark)', marginBottom: '8px' }}>
              Submit Feedback
            </h3>
            <p style={{ fontSize: '13px', lineHeight: '1.7', color: 'var(--text-mid)', marginBottom: '24px' }}>
              Name and contact details are optional. Anonymous submissions are welcomed.
            </p>
            <form className="flex flex-col gap-5">
              <div>
                <label className="form-label">Feedback Type</label>
                <select className="form-input">
                  <option value="">Select one...</option>
                  {['Program feedback', 'Concern or complaint', 'Suggestion', 'Compliment', 'Other'].map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Which program or service? (optional)</label>
                <select className="form-input">
                  <option value="">Select if applicable...</option>
                  {['MLAT Level 1', 'MLAT Level 2', 'Therapeutic Horticulture Program', 'Corporate Program', 'Shop / Digital Products', 'Website or online content', 'General — not program specific'].map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Your Feedback</label>
                <textarea placeholder="Share what you would like us to know..." rows={6} className="form-input resize-y" />
              </div>

              <div style={{ background: 'white', borderRadius: '2px', padding: '16px', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-mid)', marginBottom: '12px', fontWeight: 500 }}>
                  Would you like a response? (optional)
                </p>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="form-label">Your Name</label>
                    <input type="text" placeholder="Optional — leave blank to submit anonymously" className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input type="email" placeholder="Optional — required only if you want a response" className="form-input" />
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--sage-light)', borderRadius: '2px', padding: '14px 16px', borderLeft: '3px solid var(--sage)' }}>
                <p style={{ fontSize: '12px', lineHeight: '1.7', color: 'var(--text-mid)', margin: 0 }}>
                  All feedback is received by Monica Allan directly. We aim to acknowledge concerns within two business days and resolve them within ten. Anonymous feedback will not receive a personal response but will be read and considered.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-white text-sm rounded-sm transition-colors duration-200"
                style={{ background: 'var(--terracotta)', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
