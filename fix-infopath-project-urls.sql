-- Fix the INFOPATH UI Prototype project with correct URLs
-- Run this in Supabase SQL Editor to fix the broken URLs

-- First, let's delete the broken entry (if it exists)
DELETE FROM projects
WHERE title = 'UI Prototype' OR title = 'INFOPATH UI Prototype';

-- Also delete the E-commerce App if it still exists
DELETE FROM projects
WHERE title = 'E-commerce App';

-- Now add the INFOPATH UI Prototype with CORRECT URLs
INSERT INTO projects (
  title,
  description,
  technologies,
  live_url,
  github_url,
  featured,
  image_url
) VALUES (
  'INFOPATH UI Prototype',
  'Interactive HTML/CSS/JavaScript prototype showcasing a modern mobile application interface with multiple screens, dark mode, smooth animations, and responsive design patterns.',
  ARRAY['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
  'https://wally-80.github.io/infopath-ui-prototype/',
  'https://github.com/Wally-80/infopath-ui-prototype',
  true,
  NULL -- We'll update this after you upload the screenshot
);

-- ================================================================================
-- INSTRUCTIONS:
-- ================================================================================
--
-- 1. First, check if your GitHub Pages site is live:
--    Visit: https://wally-80.github.io/infopath-ui-prototype/
--
-- 2. If the site is live, run this script in Supabase SQL Editor
--
-- 3. After running this script:
--    - Take a screenshot of the live site
--    - Upload it to Supabase Storage (portfolio-images bucket)
--    - Then run the update script to add the image URL
--
-- ================================================================================
