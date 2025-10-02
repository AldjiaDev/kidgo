-- Migration to add `image_url` to `places` and `events` tables schema

-- Add `image_url` column to `places`
ALTER TABLE places ADD COLUMN image_url TEXT;

-- Add `image_url` column to `events`
ALTER TABLE events ADD COLUMN image_url TEXT;
