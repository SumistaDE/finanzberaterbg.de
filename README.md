# finanzberaterbg.de

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_YPZ36Rrow0bt1IOvLev1qrINBsQq)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Shop: services (Mollie)

The site sells its services through Mollie. The catalog lives in
`lib/products.ts` and is listed on `/dienstleistungen`:

| Service | Price | Document |
|---|---|---|
| Tarifanalyse und Optimierung (Finanzberaterbg.de) | 49 EUR | none |
| Tarifanalyse mit Optimierung, Planung und Smart-Meter-Vermittlung | 198 EUR | PDF manual |
| Handbuch "Weniger zahlen fuer Strom und Gas" - Teil 1 | 98 EUR | PDF (5 pages) |
| Handbuch "Weniger zahlen fuer Strom und Gas" - Teil 2 | 98 EUR | PDF (4 pages) |
| Handbuch "Weniger zahlen fuer Strom und Gas" - Teil 3 | 98 EUR | PDF (5 pages) |
| Handbuch "Weniger zahlen fuer Strom und Gas" - Komplettset | 294 EUR | PDF (14 pages) |

The handbook was split into three parts so each can be sold separately at
98 EUR. The Komplettset sells all three at once.

Flow:

1. The homepage CTA and `/produkt/tarifanalyse-smart-meter` link to the product page.
2. The customer enters their email and submits the form to `POST /api/checkout`.
3. The server creates a Mollie payment (amount from the server-side catalog),
   points the redirect at the real payment id, and redirects to the hosted checkout.
4. After paying, the customer returns to `/danke`, which re-checks the payment
   status with Mollie and shows the confirmation plus a PDF download.
5. `POST /api/webhook` (called by Mollie) confirms the payment and emails the
   PDF manual to the customer.

### Environment variables

Copy `.env.example` to `.env.local` (local) or set them in Vercel → Settings →
Environment Variables (production):

| Variable | Purpose |
|---|---|
| `MOLLIE_API_KEY` | Mollie API key (`live_...` or `test_...`) |
| `BASE_URL` | Public base URL, used for redirect + webhook |
| `CURRENCY` | Currency, default `EUR` |
| `RESEND_API_KEY` | Resend key for emailing the PDF manual |
| `MAIL_FROM` | Verified sender address for the manual email |

### The PDF documents

Sellable PDFs live in `private/downloads/` - **not** in `public/`, so they are
never reachable by a direct link. They are served only by
`/api/download?payment=tr_...` after the payment status is confirmed as paid,
and are attached to the confirmation email straight from disk.

To add or replace a document, drop the file into `private/downloads/` and set
`manualFile` (the bare filename) on the product in `lib/products.ts`.

### Webhooks

Mollie must be able to reach `POST {BASE_URL}/api/webhook` over the internet.
Localhost is not reachable, so during local development the webhook URL is
omitted and the `/danke` page confirms the payment by re-checking the status
directly with Mollie. In production `BASE_URL` is public and webhooks are used.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
