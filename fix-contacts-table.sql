-- Diagnostic and Fix Script for Contacts Table
-- Run this in Supabase SQL Editor if contact form is not working

-- =====================================================
-- 1. CHECK IF CONTACTS TABLE EXISTS
-- =====================================================
SELECT EXISTS (
  SELECT FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_name = 'contacts'
) AS contacts_table_exists;

-- =====================================================
-- 2. CHECK CONTACTS TABLE STRUCTURE
-- =====================================================
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'contacts'
ORDER BY ordinal_position;

-- =====================================================
-- 3. CHECK RLS POLICIES ON CONTACTS TABLE
-- =====================================================
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'contacts';

-- =====================================================
-- 4. FIX: ENSURE RLS IS ENABLED
-- =====================================================
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 5. FIX: DROP EXISTING POLICIES (IF THEY EXIST)
-- =====================================================
DROP POLICY IF EXISTS "Public can create contacts" ON contacts;
DROP POLICY IF EXISTS "Authenticated users can view contacts" ON contacts;

-- =====================================================
-- 6. FIX: CREATE CORRECT RLS POLICIES
-- =====================================================

-- Allow anyone (anon) to insert contacts
CREATE POLICY "Public can create contacts"
ON contacts
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated users to view all contacts
CREATE POLICY "Authenticated users can view contacts"
ON contacts
FOR SELECT
TO authenticated
USING (true);

-- =====================================================
-- 7. TEST: INSERT A TEST CONTACT
-- =====================================================
-- Uncomment to test
-- INSERT INTO contacts (name, email, message, read)
-- VALUES ('Test User', 'test@example.com', 'This is a test message', false);

-- =====================================================
-- 8. VIEW ALL CONTACTS (FOR TESTING)
-- =====================================================
-- SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10;

-- =====================================================
-- NOTES:
-- =====================================================
-- If you still get errors after running this:
-- 1. Check browser console for detailed error messages
-- 2. Verify your Supabase project URL and anon key are correct
-- 3. Make sure the contacts table was created with the correct schema
-- =====================================================
