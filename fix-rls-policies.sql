-- Fix RLS policies to allow anonymous users to view projects
-- Run this in Supabase SQL Editor

-- First, grant SELECT permission to anon and authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON projects TO anon, authenticated;
GRANT ALL ON projects TO authenticated;

-- Drop and recreate the policies
DROP POLICY IF EXISTS "Public can view projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can manage projects" ON projects;

-- Allow anonymous users to SELECT (view) all projects
CREATE POLICY "Public can view projects"
ON projects FOR SELECT
TO anon, authenticated
USING (true);

-- Allow authenticated users to do everything
CREATE POLICY "Authenticated users can manage projects"
ON projects FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Verify the policies are set correctly
SELECT
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'projects';

-- Test that anonymous can now see all projects
SELECT COUNT(*) as total_projects FROM projects;
