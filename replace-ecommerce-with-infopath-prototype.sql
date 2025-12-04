-- Replace E-commerce App with INFOPATH UI Prototype project
-- Run this in Supabase SQL Editor after deploying the prototype

-- First, delete the E-commerce App project
DELETE FROM projects
WHERE title = 'E-commerce App';

-- Then, add the INFOPATH UI Prototype project
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
  'YOUR_DEPLOYMENT_URL_HERE', -- Example: 'https://username.github.io/infopath-prototype'
  'YOUR_GITHUB_REPO_URL_HERE', -- Example: 'https://github.com/username/infopath-prototype'
  true, -- Set as featured project
  'YOUR_SUPABASE_IMAGE_URL_HERE' -- Example: 'https://project.supabase.co/storage/v1/object/public/portfolio-images/infopath-screenshot.png'
);

-- ================================================================================
-- INSTRUCTIONS:
-- ================================================================================
--
-- 1. Deploy the prototype first (see DEPLOY-INFOPATH-PROTOTYPE.md for instructions)
--    Location: c:\Users\walte\OneDrive\Desktop\infopath-prototype-deploy\
--
-- 2. After deployment, replace the placeholders above:
--    - YOUR_DEPLOYMENT_URL_HERE: Your GitHub Pages or Netlify URL
--    - YOUR_GITHUB_REPO_URL_HERE: Your GitHub repository URL
--    - YOUR_SUPABASE_IMAGE_URL_HERE: Screenshot uploaded to Supabase Storage
--
-- 3. Run this script in Supabase SQL Editor
--
-- ================================================================================
