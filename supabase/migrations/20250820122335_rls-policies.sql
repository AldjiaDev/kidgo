-- Migration script to create RLS policies for the 'places' and 'events' tables
-- See https://www.youtube.com/watch?v=0-167q0CcqI
create policy "Enable read access for all users"
on "public"."places"
for select using (true);

create policy "Enable insert for authenticated users only"
on "public"."places"
for insert to authenticated
with check (true);

create policy "Enable read access for all users"
on "public"."events"
for select using (true);

create policy "Enable read access for all users"
on "public"."todos"
for select using (true);
