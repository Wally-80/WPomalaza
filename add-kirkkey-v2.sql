-- Alternative version to add kirkkey.app
-- If the previous version didn't work, try this one

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
SELECT title, created_at FROM projects WHERE title = 'Kirkkey.app';
