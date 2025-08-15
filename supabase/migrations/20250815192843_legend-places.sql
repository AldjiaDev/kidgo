-- Add timestamp and soft delete columns to places table
ALTER TABLE places 
ADD COLUMN created_at timestamptz default now(),
ADD COLUMN updated_at timestamptz default now(),
ADD COLUMN deleted boolean default false; -- needed for soft deletes

-- Create an updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at column
CREATE TRIGGER update_places_updated_at 
    BEFORE UPDATE ON places 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable realtime
alter
  publication supabase_realtime add table places;

-- We don't need to recreate the function `handle_times`, it already exists with todos migration
-- Just create a new trigger that uses the existing function

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON places
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();