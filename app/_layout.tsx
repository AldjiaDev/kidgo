import '../global.css';
import 'expo-dev-client';

import { Icon } from '@roninoss/icons';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';
import { ThemeToggle } from '~/components/ThemeToggle';
import { cn } from '~/lib/cn';
import { useColorScheme } from '~/lib/useColorScheme';
import { ThemeProvider } from '~/components/ui/ThemeProvider';
import { ReanimatedScreenProvider } from 'react-native-screens/reanimated';
import Tabs from '~/components/ui/Tabs';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

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
                <Tabs.Screen name="(index)" title="Search" systemImage="magnify" />
                <Tabs.Screen name="(map)" title="Map" systemImage="map" />
                <Tabs.Screen name="(settings)" title="From Expo" systemImage="cog" />
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

const MODAL_OPTIONS = {
  presentation: 'modal',
  animation: 'fade_from_bottom', // for android
  title: 'Settings',
  headerRight: () => <ThemeToggle />,
} as const;
