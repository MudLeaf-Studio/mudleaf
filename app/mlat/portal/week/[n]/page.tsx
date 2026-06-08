import { WeekContent } from './WeekContent'

export function generateStaticParams() {
  return Array.from({ length: 12 }, (_, i) => ({ n: String(i + 1) }))
}

export default async function WeekPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params
  const weekNum = parseInt(n, 10)
  return (
    <div className="pt-[72px]" style={{ minHeight: '100vh', background: 'var(--warm-white)' }}>
      <WeekContent weekNum={weekNum} />
    </div>
  )
}
