-- Update Kirkkey project with image URL
-- Run this in Supabase SQL Editor

UPDATE projects
SET image_url = 'https://qzcjiswshnawchksudqo.supabase.co/storage/v1/object/public/portfolio-images/KirkKey.png'
WHERE title = 'Kirkkey.app';

-- Verify the update
SELECT title, image_url, featured
FROM projects
WHERE title = 'Kirkkey.app';
