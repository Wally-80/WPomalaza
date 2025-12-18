# Portfolio Optimization Plan

## Status
**Status:** In Progress
**Last Updated:** 2025-12-18

## Goal
To fix the "WPA" (PWA) issues, ensure the portfolio is installable, and add missing security configurations to conform to best practices.

## User Review Required
> [!IMPORTANT]
> **PWA Icons**: Your `manifest.json` currently only uses `icon.svg`. For best compatibility (especially on Android/iOS), we will add standard PNG icons (192x192 and 512x512). I will attempt to generate placeholders or use the SVG.

## Proposed Changes

### PWA Configuration
#### [MODIFY] `next.config.ts`
- Uncomment and configure `withPWA`.
- Add `public/sw.js` generation (handled by next-pwa).

#### [MODIFY] `public/manifest.json`
- Add standard icon sizes (192, 512).
- Add `categories`, `screenshots` (placeholders), and `id` for better installability.

### Security
#### [MODIFY] `next.config.ts`
- Add `headers()` function to inject:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `X-XSS-Protection: 1; mode=block`
  - `Content-Security-Policy` (Basic version to start)

#### [MODIFY] `app/layout.tsx`
- Enhance `metadata` with OpenGraph (OG) tags for social media sharing.

## Verification Plan
### Automated Tests
- Run `npm run build` to ensure PWA service worker is generated.
- Inspect `manifest.json` in Chrome DevTools > Application.
- Check headers in Network tab.
