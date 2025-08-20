import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';

import Account from '~/components/Account';
import Auth from '~/components/Auth';
import { BodyScrollView } from '~/components/ui/BodyScrollView';
import { supabase } from '~/utils/supabase-legend';

export default function ProfileScreen() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingVertical: 16,
        gap: 2,
      }}>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    </BodyScrollView>
  );
}
