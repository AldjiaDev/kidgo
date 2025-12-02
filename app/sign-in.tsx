import Account from '@/components/Account';
import { Auth } from '@/components/Auth';
import { BodyScrollView } from '@/components/ui/BodyScrollView';
import { useAuth } from '@/hooks/useAuth';

export default function SignInScreen() {
  const { session } = useAuth();

  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingVertical: 16,
        paddingHorizontal: 8,
        gap: 2,
      }}>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    </BodyScrollView>
  );
}
