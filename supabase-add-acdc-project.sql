-- Insert ACDC Improvement project
INSERT INTO projects (
  title,
  description,
  image_url,
  technologies,
  github_url,
  live_url,
  featured
) VALUES (
  'ACDC Improvement',
  'Professional business improvement consulting platform. Features comprehensive service offerings, team management, and client engagement tools designed for operational excellence and continuous improvement.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070',
  ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
  null,
  'https://acdcimprovement.com',
  true
);

-- Note: Upload a screenshot of acdcimprovement.com to Supabase Storage
-- and update the image_url with: 
-- https://qzcjiswshnawchksudqo.supabase.co/storage/v1/object/public/portfolio-images/ACDC.png
