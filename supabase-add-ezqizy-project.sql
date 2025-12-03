-- Insert EZQizy.com project
INSERT INTO projects (
  title,
  description,
  image_url,
  technologies,
  github_url,
  live_url,
  featured
) VALUES (
  'EZQizy.com',
  'Interactive quiz platform with real-time scoring, customizable templates, and analytics for educators. Built with modern web technologies for optimal performance and user experience.',
  'https://qzcjiswshnawchksudqo.supabase.co/storage/v1/object/public/portfolio-images/EZQizy.png',
  ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
  null,
  'https://ezqizy.com',
  true
);

-- Note: This will use your custom EZQizy.com screenshot
