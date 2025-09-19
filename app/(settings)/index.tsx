import { View } from 'react-native';
import { Link } from 'expo-router';

import Account from '~/components/Account';
import { AppVersion } from '~/components/AppVersion';
import Auth from '~/components/Auth';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { BodyScrollView } from '~/components/ui/BodyScrollView';
import { useAuth } from '~/hooks/useAuth';

export default function SettingsScreen() {
  const { session, isAuthenticated } = useAuth();

  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingVertical: 16,
        paddingHorizontal: 8,
        gap: 2,
      }}>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}

      {/* Feedback Link */}
      <View className="mt-4">
        <Link href="/(settings)/feedback" asChild>
          <Button variant="tonal">
            <Text>💬 Donner son avis</Text>
          </Button>
        </Link>
      </View>

      <AppVersion />
      {__DEV__ && (
        <>
          <Link href="/(settings)/playground" asChild>
            <Button>
              <Text>Playground</Text>
            </Button>
          </Link>
          <Link href="/(settings)/playground-todos" asChild>
            <Button>
              <Text>Playground Todos</Text>
            </Button>
          </Link>
          <Link href="/(settings)/playground-categories" asChild>
            <Button>
              <Text>Playground Categories</Text>
            </Button>
          </Link>
        </>
      )}
    </BodyScrollView>
  );
}
