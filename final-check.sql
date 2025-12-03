-- Final comprehensive check
-- Run this in Supabase SQL Editor

-- Check total count
SELECT COUNT(*) as total_projects FROM projects;

-- List ALL projects with key fields
SELECT
  title,
  live_url,
  featured,
  created_at
FROM projects
ORDER BY created_at DESC;

-- Check specifically for ACDC project
SELECT title, created_at FROM projects WHERE title LIKE '%ACDC%' OR title LIKE '%Improvement%';
