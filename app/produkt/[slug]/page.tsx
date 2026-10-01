import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/products'
import ProductPage from '@/components/product-page'

export const dynamic = 'force-dynamic'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { slug } = await params
  const { error } = await searchParams

  const product = getProduct(slug)
  if (!product) notFound()

  return <ProductPage product={product} error={error} />
}
