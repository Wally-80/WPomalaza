-- Update EZQizy.com project image
UPDATE projects 
SET image_url = 'https://qzcjiswshnawchksudqo.supabase.co/storage/v1/object/public/portfolio-images/EZQizy.png',
    updated_at = NOW()
WHERE title = 'EZQizy.com';

-- Verify the update
SELECT id, title, image_url, live_url 
FROM projects 
WHERE title = 'EZQizy.com';
