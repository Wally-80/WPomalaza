-- Check if kirkkey.app exists now
SELECT COUNT(*) as total FROM projects;
SELECT * FROM projects WHERE title = 'Kirkkey.app';
SELECT title FROM projects ORDER BY created_at DESC;
