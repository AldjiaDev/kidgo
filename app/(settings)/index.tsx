import { Link } from 'expo-router';

import { AppVersion } from '~/components/AppVersion';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { BodyScrollView } from '~/components/ui/BodyScrollView';

export default function SettingsScreen() {
  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingVertical: 16,
        paddingHorizontal: 8,
        gap: 2,
      }}>
      <Link href="/(settings)/profile" asChild>
        <Button variant="primary" className="w-full">
          <Text>Mon profil</Text>
        </Button>
      </Link>
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
