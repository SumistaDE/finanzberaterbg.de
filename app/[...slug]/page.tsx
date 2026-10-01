import { SitePage } from '../page'
import { LegalPage } from '@/components/legal-page'

const LEGAL = new Set(['impressum', 'datenschutz', 'agb'])

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const first = slug[0]
  if (slug.length === 1 && LEGAL.has(first)) {
    return <LegalPage slug={first} />
  }
  return <SitePage path={`/${slug.join('/')}`} />
}
