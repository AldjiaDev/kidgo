# Supabase

## Database

```console
supabase migrations new xxxxx
supabase db push
```

##  Generating Types

Generate types for your project to produce the `database.types.ts` file:

```console
supabase gen types typescript --project-id "$PROJECT_REF" --schema public > utils/database.types.ts
```

Then you can [supply the type definitions to `supabase-js` like so](https://supabase.com/docs/guides/api/rest/generating-types#using-typescript-type-definitions).
