-- Fix kirkkey.app duplicates - check data quality first
-- Run this in Supabase SQL Editor

-- First, see both kirkkey entries with all their data
SELECT
  id,
  title,
  description,
  technologies,
  image_url,
  github_url,
  live_url,
  featured,
  created_at
FROM projects
WHERE title = 'Kirkkey.app'
ORDER BY created_at ASC;

-- Delete ALL kirkkey.app entries (we'll re-add a clean one)
DELETE FROM projects WHERE title = 'Kirkkey.app';

-- Add ONE clean kirkkey.app entry
INSERT INTO projects (
  title,
  description,
  technologies,
  live_url,
  featured
) VALUES (
  'Kirkkey.app',
  'A web application for managing and organizing your digital workspace efficiently.',
  ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  'https://kirkkey.app',
  true
);

-- Verify final state - should show 4 unique projects
SELECT title, technologies, created_at FROM projects ORDER BY created_at DESC;
