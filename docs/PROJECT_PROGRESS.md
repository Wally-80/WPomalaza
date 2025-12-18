# Project Progress & Checklist

## Phase 1: PWA Implementation
**Goal:** Enable Progressive Web App features for installability and offline capability.

- [x] **Configure Next.js PWA**
  - [x] Uncomment `withPWA` in `next.config.ts` (Switched to `@ducanh2912/next-pwa`)
  - [x] Configure PWA options (dest, register, skipWaiting)
  - [x] Verify `sw.js` generation on build (Requires `--webpack` flag)
- [x] **Manifest & Icons**
  - [x] Update `manifest.json` with full metadata (name, description, theme_color)
  - [x] Add 192x192 PNG icon (Generated from user image)
  - [x] Add 512x512 PNG icon (Generated from user image)
  - [x] Add `maskable` icon support
  - [x] Add screenshots to manifest (for app store checks)
- [x] **Layout Integration**
  - [x] Verify `manifest` link in `layout.tsx`
  - [x] Ensure viewport / theme-color meta tags are correct

## Phase 2: Security Hardening
**Goal:** Implement best-practice security headers and verify content safety.

- [x] **HTTP Headers (next.config.ts)**
  - [x] Implement `X-Content-Type-Options: nosniff`
  - [x] Implement `X-Frame-Options: DENY` (Used SAMEORIGIN)
  - [x] Implement `Referrer-Policy: strict-origin-when-cross-origin`
  - [x] Implement `X-XSS-Protection: 1; mode=block`
  - [ ] Implement `Content-Security-Policy` (CSP) - *Deferred to avoid breakage*
- [x] **Supabase Security**
  - [x] Audit RLS (Row Level Security) policies for sensitive tables
  - [x] Verify API key restrictions (if applicable)

## Phase 3: SEO & Performance
**Goal:** Optimize for search engines and social sharing.

- [x] **Metadata (layout.tsx)**
  - [x] Add Open Graph (OG) title, description, and image
  - [x] Add Twitter Card metadata
- [x] **Robots & Sitemap**
  - [x] Create `robots.txt`
  - [x] Generate `sitemap.xml`

## Phase 4: Final Verification
**Goal:** Ensure everything works in a production-like environment.

- [x] **Build Check**
  - [x] Run `npm run build` without errors
  - [x] Confirmed `sw.js` generation (with `next build --webpack`)
- [ ] **Lighthouse Audit** (User to perform)
