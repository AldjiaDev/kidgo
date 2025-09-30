import Stack from '~/components/ui/Stack';

export const unstable_settings = {
  anchor: 'index',
};

export { ErrorBoundary } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={INDEX_OPTIONS} />
      <Stack.Screen name="modal" options={MODAL_OPTIONS} />
      <Stack.Screen name="feedback" options={FEEDBACK_OPTIONS} />
    </Stack>
  );
}

const INDEX_OPTIONS = {
  headerLargeTitle: true,
  title: 'KidGO',
} as const;

const FEEDBACK_OPTIONS = {
  headerLargeTitle: true,
  title: 'Feedback',
} as const;

const MODAL_OPTIONS = {
  presentation: 'modal',
  animation: 'fade_from_bottom', // for android
  headerShown: false,
} as const;
