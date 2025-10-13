import { Stack } from 'expo-router';

export const unstable_settings = {
  anchor: 'index',
};

export { ErrorBoundary } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Découvrir', headerShown: false }} />
      <Stack.Screen name="map" options={{ title: '', headerTransparent: true }} />
      <Stack.Screen
        name="[category]"
        options={({ route }) => ({
          title: (route.params as any)?.category || 'Catégorie',
          headerShown: true,
          headerTransparent: true,
          headerBlurEffect: 'systemChromeMaterial',
          headerShadowVisible: true,
          headerLargeTitleShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: 'transparent',
          },
        })}
      />
      <Stack.Screen name="settings" options={{ title: 'Settings', headerTransparent: true }} />
    </Stack>
  );
}
