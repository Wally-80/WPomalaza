-- Test if kirkkey.app is visible with current RLS policies
-- Run this in Supabase SQL Editor

-- First, check what's actually in the database (this bypasses RLS)
SELECT
  id,
  title,
  description,
  technologies,
  image_url,
  created_at
FROM projects
WHERE title = 'Kirkkey.app';

-- Check all RLS policies on projects table
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'projects';

-- Test what a public/anonymous user can see (simulating your browser)
SET ROLE anon;
SELECT title, created_at FROM projects ORDER BY created_at DESC;
RESET ROLE;

-- Count what anon can see vs what actually exists
SET ROLE anon;
SELECT COUNT(*) as anon_can_see FROM projects;
RESET ROLE;

SELECT COUNT(*) as actually_exists FROM projects;
