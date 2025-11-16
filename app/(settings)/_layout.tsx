import { Pressable, View } from 'react-native';
import { Icon } from '@roninoss/icons';
import { Link, Stack } from 'expo-router';

import { ThemeToggle } from '~/components/ThemeToggle';
import { cn } from '~/lib/cn';
import { useColorScheme } from '~/lib/useColorScheme';

export const unstable_settings = {
  anchor: 'index',
};

export { ErrorBoundary } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        title: 'Settings',
      }}>
      <Stack.Screen name="index" options={INDEX_OPTIONS} />
      <Stack.Screen name="playground" />
      <Stack.Screen name="playground-todos" />
    </Stack>
  );
}

const INDEX_OPTIONS = {
  headerLargeTitle: true,
  title: 'Profile',
  headerRight: () => <ThemeToggle />,
} as const;

function SettingsIcon() {
  const { colors } = useColorScheme();
  return (
    <Link href="/modal" asChild>
      <Pressable className="opacity-80">
        {({ pressed }) => (
          <View className={cn(pressed ? 'opacity-50' : 'opacity-90')}>
            <Icon name="cog-outline" color={colors.foreground} />
          </View>
        )}
      </Pressable>
    </Link>
  );
}
