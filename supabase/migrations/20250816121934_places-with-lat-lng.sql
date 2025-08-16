-- Migration to update places table schema
-- Add new columns, rename existing ones, and remove deprecated columns

-- Add new columns
ALTER TABLE places 
ADD COLUMN description text,
ADD COLUMN website_url text,
ADD COLUMN category text,
ADD COLUMN area_type text CHECK (area_type IN ('Intérieur', 'Extérieur')),
ADD COLUMN latitude double precision,
ADD COLUMN longitude double precision,
ADD COLUMN price_range text CHECK (price_range IN ('Gratuit', '€', '€€', '€€€'));

-- Rename age_range to age_groups
ALTER TABLE places 
RENAME COLUMN age_range TO age_groups;

-- Remove deprecated columns
ALTER TABLE places 
DROP COLUMN IF EXISTS events,
DROP COLUMN IF EXISTS event_type;