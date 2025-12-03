-- Step 1: Check all ACDC Improvement projects
SELECT id, title, image_url, created_at 
FROM projects 
WHERE title = 'ACDC Improvement'
ORDER BY created_at;

-- Step 2: Delete duplicate ACDC Improvement projects (keeps only the first one)
DELETE FROM projects 
WHERE title = 'ACDC Improvement' 
AND id NOT IN (
  SELECT id 
  FROM projects 
  WHERE title = 'ACDC Improvement'
  ORDER BY created_at
  LIMIT 1
);

-- Step 3: Update the remaining project with the correct image
UPDATE projects 
SET image_url = 'https://qzcjiswshnawchksudqo.supabase.co/storage/v1/object/public/portfolio-images/ACDC.png',
    updated_at = NOW()
WHERE title = 'ACDC Improvement';

-- Step 4: Verify the result
SELECT id, title, image_url, live_url 
FROM projects 
WHERE title = 'ACDC Improvement';
