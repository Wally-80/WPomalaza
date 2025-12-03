-- Re-add kirkkey.app project (it was accidentally deleted)
-- Run this in Supabase SQL Editor

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

-- Verify it was added
SELECT title, technologies, created_at FROM projects ORDER BY created_at DESC;
