-- Clean up kirkkey.app entries from the WRONG Supabase project
-- IMPORTANT: Run this in the kirkkey.app Supabase project ONLY, NOT in wpomalaza project

-- First, verify what's in the projects table
SELECT title, created_at FROM projects ORDER BY created_at DESC;

-- Delete all Kirkkey.app entries (these were added by mistake)
DELETE FROM projects WHERE title = 'Kirkkey.app';

-- Verify they're deleted
SELECT title, created_at FROM projects ORDER BY created_at DESC;
