import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { sql } from 'drizzle-orm'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
export const db = drizzle(pool)
export async function createOrder(order: { id: string; productId: string; amount: string; currency: string; paymentId: string }) { await db.execute(sql`INSERT INTO shop_orders (id, product_id, amount, currency, mollie_payment_id) VALUES (${order.id}, ${order.productId}, ${order.amount}, ${order.currency}, ${order.paymentId})`) }
export async function getOrder(id: string) { const result = await db.execute(sql`SELECT id, product_id, amount, currency, mollie_payment_id, status FROM shop_orders WHERE id = ${id} LIMIT 1`); return result.rows[0] as { id: string; product_id: string; amount: string; currency: string; mollie_payment_id: string; status: string } | undefined }
export async function updateOrderStatus(paymentId: string, status: string) { await db.execute(sql`UPDATE shop_orders SET status = CASE WHEN status = 'paid' THEN status ELSE ${status} END, updated_at = now() WHERE mollie_payment_id = ${paymentId}`) }
