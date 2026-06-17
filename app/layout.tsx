import type { Metadata } from 'next'
import '../styles/globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ThemeProvider from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Mudleaf™ | Therapeutic Horticulture & Wellbeing | Mannum SA',
  description: 'Mudleaf combines therapeutic horticulture, mindfulness, and evidence-based mental health programs to build capacity and wellbeing. NDIS provider. Mannum, South Australia.',
  keywords: 'therapeutic horticulture, NDIS, mental health, Mannum SA, MLAT, mindfulness, capacity building',
  openGraph: {
    title: 'Mudleaf™ | Therapeutic Horticulture & Wellbeing',
    description: 'Evidence-based therapeutic horticulture and wellbeing programs. NDIS capacity building. Mannum, South Australia.',
    url: 'https://www.mudleaf.com.au',
    siteName: 'Mudleaf',
    locale: 'en_AU',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Nav />
          <main className="page-transition">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
