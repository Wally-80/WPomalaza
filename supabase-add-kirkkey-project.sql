-- Add kirkkey.app project to portfolio
-- Run this in Supabase SQL Editor

INSERT INTO projects (
  title,
  description,
  technologies,
  live_url,
  github_url,
  featured,
  image_url
) VALUES (
  'Kirkkey.app',
  'A web application for managing and organizing your digital workspace efficiently.',
  ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  'https://kirkkey.app',
  NULL, -- Add your GitHub URL here if you want to share it
  true, -- Set as featured project
  NULL -- Add an image URL if you have one
);
