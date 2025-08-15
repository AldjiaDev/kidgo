import Stack from '~/components/ui/Stack';

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
      <Stack.Screen name="index" />
      <Stack.Screen name="playground" />
      <Stack.Screen name="playground-todos" />
    </Stack>
  );
}
