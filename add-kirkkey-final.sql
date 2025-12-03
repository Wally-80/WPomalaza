-- Add Kirkkey.app to the wpomalaza project database
-- Run this in your Supabase SQL Editor (make sure you're in the qzcjiswshnawchksudqo project)

-- First, verify current projects
SELECT title FROM projects ORDER BY created_at DESC;

-- Add Kirkkey.app
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

-- Verify it was added - should show 5 projects now
SELECT title, created_at FROM projects ORDER BY created_at DESC;
