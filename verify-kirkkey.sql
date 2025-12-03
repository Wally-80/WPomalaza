-- Verify kirkkey.app exists and has valid data
SELECT
  id,
  title,
  description,
  image_url,
  technologies,
  github_url,
  live_url,
  featured,
  created_at
FROM projects
WHERE title = 'Kirkkey.app';

-- Check if technologies array is valid
SELECT
  title,
  technologies,
  array_length(technologies, 1) as tech_count
FROM projects
WHERE title = 'Kirkkey.app';

-- Count total projects
SELECT COUNT(*) as total_projects FROM projects;
