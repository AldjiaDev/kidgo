import 'expo-dev-client';

import { AppState } from 'react-native';
import { ReanimatedScreenProvider } from 'react-native-screens/reanimated';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';

import '../global.css';

import { ThemeProvider } from '~/components/ui/ThemeProvider';
import { supabase } from '~/utils/supabase-legend';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const StorybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';

export const unstable_settings = {
  initialRouteName: StorybookEnabled ? '(storybook)/index' : '(pages)/index',
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ReanimatedScreenProvider>
        <BottomSheetModalProvider>
          <ActionSheetProvider>
            <Stack screenOptions={SCREEN_OPTIONS}>
              <Stack.Protected guard={StorybookEnabled}>
                <Stack.Screen name="(storybook)/index" />
              </Stack.Protected>

              <Stack.Screen name="(pages)/index" />
            </Stack>
          </ActionSheetProvider>
        </BottomSheetModalProvider>
      </ReanimatedScreenProvider>
    </ThemeProvider>
  );
}

const SCREEN_OPTIONS = {
  headerShown: false,
  animation: 'ios_from_right', // for android
} as const;
