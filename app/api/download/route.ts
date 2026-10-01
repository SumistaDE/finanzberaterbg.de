import { NextResponse, type NextRequest } from 'next/server'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { getPayment } from '@/lib/mollie'
import { getProduct } from '@/lib/products'

export const runtime = 'nodejs'

// The PDFs live outside public/, so they are only reachable through this route
// and only after a confirmed payment. Served with a private cache header.
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('payment') || ''
  if (!id) return NextResponse.json({ error: 'Missing payment id' }, { status: 400 })

  try {
    const payment = await getPayment(id)
    if (payment.status !== 'paid' && payment.status !== 'authorized') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 403 })
    }

    const metadata = (payment.metadata || {}) as { productId?: string }
    const product = metadata.productId ? getProduct(metadata.productId) : null
    if (!product?.manualFile) {
      return NextResponse.json({ error: 'No document for this order' }, { status: 404 })
    }

    const filePath = path.join(process.cwd(), 'private', 'downloads', product.manualFile)
    let data: Buffer
    try {
      data = await readFile(filePath)
    } catch {
      console.error('[download] document missing on disk:', product.manualFile)
      return NextResponse.json(
        { error: 'Document not available yet' },
        { status: 404 },
      )
    }

    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${product.manualFile}"`,
        'Cache-Control': 'private, no-store',
      },
    })
  } catch (err) {
    console.error('[download] failed:', err)
    return NextResponse.json({ error: 'Could not verify payment' }, { status: 502 })
  }
}
