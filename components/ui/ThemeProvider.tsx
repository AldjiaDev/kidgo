import { PropsWithChildren } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme, useInitialAndroidBarSync } from '@/lib/useColorScheme';
import { NAV_THEME } from '@/theme/theme';

export function ThemeProvider({ children }: PropsWithChildren) {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
          <NavThemeProvider value={NAV_THEME[colorScheme]}>{children}</NavThemeProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </>
  );
}
