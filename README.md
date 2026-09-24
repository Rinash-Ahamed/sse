# Shree Sanjay Equipments: Website

A premium product catalogue and enquiry website for **Shree Sanjay
Equipments**, Coimbatore. Built with Next.js (App Router), TypeScript,
Tailwind CSS v4, and Framer Motion.

This is a discovery → enquiry site, not an ecommerce checkout: visitors
browse equipment, view specifications, and reach out via WhatsApp, email
or the contact form for current pricing.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```
RESEND_API_KEY=          # from https://resend.com: required to actually send contact-form emails
CONTACT_TO_EMAIL=sanjayequipments@gmail.com
CONTACT_FROM_EMAIL=Website Enquiry <onboarding@resend.dev>
```

Without `RESEND_API_KEY` set, the contact form still validates and
responds successfully, but the enquiry is only logged to the server
console instead of emailed: set the key before going live.

## Project structure

```
app/
  page.tsx                  Home
  products/page.tsx          /products: search + category filter
  products/[slug]/page.tsx   /products/[slug]: product detail
  about/page.tsx             /about
  contact/page.tsx           /contact
  api/contact/route.ts       Contact form email handler (Resend)
  sitemap.ts, robots.ts      SEO
components/
  layout/                    Navbar, Footer, WhatsApp bubble
  sections/                  Homepage sections (hero, categories, etc.)
  products/                  Product card, grid, gallery, info panel
  contact/                   Contact form
  ui/                        Shared building blocks (reveal text, labels,
                              placeholder imagery)
lib/
  products.ts                Product data model + seed catalogue
  whatsapp.ts                 wa.me link builders
  schema.ts                   Zod contact-form schema
public/images/brand/          Logo assets you supplied
```

## Editing the product catalogue

All products live in a single file: `lib/products.ts`. Each product
follows the `Product` type: add, edit or remove entries there; the
`/products` listing, filters, product pages, sitemap and related-product
sections all read from this one source.

**No specifications or prices have been invented.** Every seed product
currently uses `priceStatus: "contact-for-latest-price"`. When you have
confirmed specifications or pricing for a product, add them to its
`specifications` array or set `price` / `priceStatus: "confirmed"`,
empty specification/feature sections are automatically hidden rather
than shown blank.

## Product photography

No product photographs were supplied yet, so every product and category
currently displays a restrained blueprint-style placeholder panel
(labelled "Photograph to be added") instead of a stock photo. To add real
photography:

1. Drop optimized images into `public/images/products/`.
2. Extend the `Product` type usage in `lib/products.ts` with an `images`
   array pointing at those files.
3. Swap `MachinePlaceholder` for a `next/image` render in
   `components/products/ProductGallery.tsx` and `ProductCard.tsx`.

## Notes

- Google Fonts (Manrope / Inter / JetBrains Mono) are loaded via
  `next/font/google` and are fetched at build time: this requires
  normal internet access (works out of the box on Vercel or any machine
  with unrestricted network access).
- WhatsApp enquiry links are generated dynamically per product in
  `lib/whatsapp.ts`: update `WHATSAPP_NUMBER` there if the primary
  number changes.
- Before launch: run `npm run build` once with real environment
  variables set, and add your Resend API key so contact-form enquiries
  actually reach `sanjayequipments@gmail.com`.
