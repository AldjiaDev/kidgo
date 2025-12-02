import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Stack, useRouter } from 'expo-router';

import { HeaderAvatar, HeaderButton } from '@/app/(discover)/_layout';
import { useAuth } from '@/hooks/useAuth';

export const unstable_settings = {
  anchor: 'index',
};

export { ErrorBoundary } from 'expo-router';

// These are the default stack options for iOS, they disable on other platforms.
export const DEFAULT_STACK_HEADER: NativeStackNavigationOptions =
  process.env.EXPO_OS !== 'ios'
    ? {}
    : {
        headerTransparent: true,
        headerBlurEffect: 'systemChromeMaterial',
        headerShadowVisible: true,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: 'transparent',
        },
        headerLargeTitle: true,
      };

export default function TabLayout() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <Stack screenOptions={DEFAULT_STACK_HEADER}>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          title: 'KidGO',
          headerLeft: () => <HeaderAvatar />,
          headerRight() {
            return isAuthenticated ? (
              <HeaderButton title="Ajouter un lieu" onPress={() => router.navigate('/new-place')} />
            ) : null;
          },
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
          animation: 'fade_from_bottom', // for android
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="feedback"
        options={{
          headerLargeTitle: true,
          title: 'Feedback',
        }}
      />
      <Stack.Screen
        name="new-place"
        options={{
          headerLargeTitle: true,
          title: 'Ajouter un lieu',
        }}
      />
    </Stack>
  );
}
