import 'react-native-get-random-values';

import { observable } from '@legendapp/state';
import { observablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage';
import { configureSynced } from '@legendapp/state/sync';
import { syncedSupabase } from '@legendapp/state/sync-plugins/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

import { Database } from '~/utils/database.types';

const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL || 'change_me',
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'change_me'
);

// Provide a function to generate ids locally
const generateId = () => uuidv4();

// Create a configured sync function
const customSynced = configureSynced(syncedSupabase, {
  // Use React Native Async Storage
  persist: {
    plugin: observablePersistAsyncStorage({
      AsyncStorage,
    }),
  },
  generateId,
  supabase,
  changesSince: 'last-sync',
  fieldCreatedAt: 'created_at',
  fieldUpdatedAt: 'updated_at',
  // Optionally enable soft deletes
  fieldDeleted: 'deleted',
});

export const todos$ = observable(
  customSynced({
    supabase,
    collection: 'todos',
    select: (from) => from.select('id,counter,text,done,created_at,updated_at,deleted'),
    actions: ['read', 'create', 'update', 'delete'],
    realtime: true,
    // Persist data and pending changes locally
    persist: {
      name: 'todos',
      retrySync: true, // Persist pending changes and retry
    },
    retry: {
      infinite: true, // Retry changes with exponential backoff
    },
  })
);

export function addTodo(text: string) {
  const id = generateId();
  // Add keyed by id to the todos$ observable to trigger a create in Supabase
  todos$[id].assign({
    id,
    text,
  });
}

export function toggleDone(id: string) {
  todos$[id].done.set((prev) => !prev);
}
