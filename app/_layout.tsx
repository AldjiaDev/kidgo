import 'expo-dev-client';

import { useEffect } from 'react';
import { AppState, Platform } from 'react-native';
import { ReanimatedScreenProvider } from 'react-native-screens/reanimated';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { Toaster } from 'sonner-native';

import '../global.css';

import { ThemeProvider } from '~/components/ui/ThemeProvider';
import { LocationProvider } from '~/contexts/LocationContext';
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

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ReanimatedScreenProvider>
        <LocationProvider>
          <BottomSheetModalProvider>
            <ActionSheetProvider>
              <RootNavigator />
            </ActionSheetProvider>
          </BottomSheetModalProvider>
        </LocationProvider>
        <Toaster />
      </ReanimatedScreenProvider>
    </ThemeProvider>
  );
}

function RootNavigator() {
  const router = useRouter();

  // run Storybook with `npm run storybook` command
  useEffect(() => {
    if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true') {
      // fix for Expo Router navigation issue on iOS
      // see https://github.com/expo/router/issues/740#issuecomment-1629471113
      if (Platform.OS === 'ios') {
        setTimeout(() => {
          router.replace('/(home)/storybook');
        }, 1);
      } else {
        setImmediate(() => {
          router.replace('/storybook');
        });
      }
    }
  });

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(home)">
        <Label>Acceuil</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(discover)">
        <Icon sf="map" drawable="custom_map_drawable" />
        <Label>Découvrir</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
