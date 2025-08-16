import 'expo-dev-client';

import { AppState, Pressable, View } from 'react-native';
import { ReanimatedScreenProvider } from 'react-native-screens/reanimated';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Icon } from '@roninoss/icons';
import { Link } from 'expo-router';

import '../global.css';

import Tabs from '~/components/ui/Tabs';
import { ThemeProvider } from '~/components/ui/ThemeProvider';
import { cn } from '~/lib/cn';
import { useColorScheme } from '~/lib/useColorScheme';
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
    <>
      <ThemeProvider>
        <ReanimatedScreenProvider>
          <BottomSheetModalProvider>
            <ActionSheetProvider>
              {/* <Stack screenOptions={SCREEN_OPTIONS}>
              <Stack.Screen name="index" options={INDEX_OPTIONS} />
              <Stack.Screen name="modal" options={MODAL_OPTIONS} />
            </Stack> */}

              <Tabs>
                <Tabs.Screen name="(index)" title="Recherche" systemImage="magnify" />
                <Tabs.Screen name="(map)" title="Carte" systemImage="map" />
                <Tabs.Screen name="(settings)" title="Profile" systemImage="cog" />
                <Tabs.Screen name="+not-found" title="Non trouvé" options={{ href: null }} />
              </Tabs>
            </ActionSheetProvider>
          </BottomSheetModalProvider>
        </ReanimatedScreenProvider>
      </ThemeProvider>
    </>
  );
}

const SCREEN_OPTIONS = {
  animation: 'ios_from_right', // for android
} as const;

const INDEX_OPTIONS = {
  headerLargeTitle: true,
  title: 'Kid GO',
  headerRight: () => <SettingsIcon />,
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
