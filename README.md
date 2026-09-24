# Shree Sanjay Equipments: Website

A product catalogue and enquiry website for **Shree Sanjay
Equipments**, Coimbatore. Built with Next.js (App Router), TypeScript,
Tailwind CSS v4, and Framer Motion.

Visitors can browse equipment and contact the team by phone, WhatsApp,
email or the enquiry form to ask about pricing, availability and services.

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
CONTACT_FROM_EMAIL=Website Enquiry <website@your-verified-domain.com>
```

Without `RESEND_API_KEY`, the contact form reports that it is unavailable
and directs visitors to call or use WhatsApp. Set the key before going live.
The `CONTACT_FROM_EMAIL` address must use a domain verified for sending in
Resend. Restart the local server after changing `.env.local`, and set the
same variables in your hosting provider for the deployed site.

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

Product images live in `public/images/products/` and are connected through
the `images` array in `lib/products.ts`. Products without an image show a
simple placeholder. To add or replace photography:

1. Drop optimized images into `public/images/products/`.
2. Set that product's `images` array in `lib/products.ts` to the matching
   public paths, such as `/images/products/example.png`.
3. The product card and gallery will use those images automatically.

## Notes

- Google Fonts (Manrope / Inter) are loaded via
  `next/font/google` and are fetched at build time: this requires
  normal internet access (works out of the box on Vercel or any machine
  with unrestricted network access).
- WhatsApp enquiry links are generated dynamically per product in
  `lib/whatsapp.ts`: update `WHATSAPP_NUMBER` there if the primary
  number changes.
- Before launch: run `npm run build` once with real environment
  variables set, and add your Resend API key so contact-form enquiries
  actually reach `sanjayequipments@gmail.com`.
