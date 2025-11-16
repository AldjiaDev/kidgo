import { Button } from 'react-native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Stack, useRouter } from 'expo-router';

import { useAuth } from '~/hooks/useAuth';

export const unstable_settings = {
  anchor: 'index',
};

export { ErrorBoundary } from 'expo-router';

// These are the default stack options for iOS, they disable on other platforms.
const DEFAULT_STACK_HEADER: NativeStackNavigationOptions =
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
          headerRight() {
            return (
              isAuthenticated && (
                <Button title="Ajouter un lieu" onPress={() => router.push('/new-place')} />
              )
            );
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
