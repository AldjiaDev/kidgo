import 'expo-dev-client';

import { AppState } from 'react-native';
import { ReanimatedScreenProvider } from 'react-native-screens/reanimated';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
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

export default function TabLayout() {
  return (
    <ThemeProvider>
      <LocationProvider>
        <ReanimatedScreenProvider>
          <BottomSheetModalProvider>
            <ActionSheetProvider>
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
            </ActionSheetProvider>
          </BottomSheetModalProvider>
          <Toaster />
        </ReanimatedScreenProvider>
      </LocationProvider>
    </ThemeProvider>
  );
}
