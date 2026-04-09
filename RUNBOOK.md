# Runbook - WPomalaza

## Deployment
1. Ensure all environment variables are set in your hosting provider (Vercel/Firebase).
2. Run `npm run build` locally to verify there are no compilation errors.
3. Push to `main` branch to trigger automatic deployment via Vercel/GitHub Actions.

## Database Migrations (Firebase)
- Since Firestore is schemaless, ensure any code changes that depend on new fields (like `display_order` or `proposal_status`) have proper fallbacks for existing documents.

## Rollback
1. Revert the last merge commit in Git.
2. Push to `main` to redeploy the previous stable version.
3. In case of database issues, use the Firebase Console to restore data if backups are available.
