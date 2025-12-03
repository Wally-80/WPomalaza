-- Debug projects to see what's in the database
-- Run this in Supabase SQL Editor

-- Check all projects with all fields
SELECT
  id,
  title,
  description,
  image_url,
  technologies,
  github_url,
  live_url,
  featured,
  created_at,
  updated_at
FROM projects
ORDER BY created_at DESC;

-- Check for duplicates
SELECT title, COUNT(*) as count
FROM projects
GROUP BY title
HAVING COUNT(*) > 1;

-- Remove duplicate kirkkey.app entries (keep the oldest one by created_at)
DELETE FROM projects
WHERE title = 'Kirkkey.app'
AND id NOT IN (
  SELECT id
  FROM projects
  WHERE title = 'Kirkkey.app'
  ORDER BY created_at ASC
  LIMIT 1
);

-- Verify final state
SELECT title, created_at FROM projects ORDER BY created_at DESC;
