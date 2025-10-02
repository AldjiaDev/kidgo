-- Migration to delete `age_groups` from `places` table schema

-- Remove age_groups column from places table
ALTER TABLE places DROP COLUMN age_groups;