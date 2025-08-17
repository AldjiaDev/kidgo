import { ThemeToggle } from '~/components/ThemeToggle';
import Stack from '~/components/ui/Stack';

export const unstable_settings = {
  anchor: 'index',
};

export { ErrorBoundary } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        title: 'Recherche',
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="modal" options={MODAL_OPTIONS} />
    </Stack>
  );
}

const MODAL_OPTIONS = {
  presentation: 'modal',
  animation: 'fade_from_bottom', // for android
  title: 'Settings',
} as const;
