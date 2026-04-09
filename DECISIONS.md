# Decisions - WPomalaza

## AD-001: Migration to Firebase
**Status:** Decided
**Context:** Decided to migrate from Supabase to Firebase for easier management of real-time features and simpler authentication integration with Next.js.
**Consequence:** All future admin features (Proposal Manager, Inbox) will use Firestore.

## AD-002: Service Proposal System
**Status:** Decided
**Context:** Need a professional way to send and track service proposals.
**Decision:** Implement a `proposals` collection in Firestore and a public-facing `/proposal/[id]` route. Use a "Digital Signature" field for acceptance tracking.

## AD-003: Dynamic Social Media Management
**Status:** Decided
**Context:** Managing social media links was previously manual and required code changes.
**Decision:** Implement a dynamic configuration system in Firestore (`config/socials`) to allow the Admin Portal to manage platforms without code deployments.
