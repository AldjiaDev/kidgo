import Account from '~/components/Account';
import Auth from '~/components/Auth';
import { BodyScrollView } from '~/components/ui/BodyScrollView';
import { useAuth } from '~/hooks/useAuth';

export default function ProfileScreen() {
  const { session, isAuthenticated } = useAuth();

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
