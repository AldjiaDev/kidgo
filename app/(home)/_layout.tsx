import Stack from '~/components/ui/Stack';

export const unstable_settings = {
  anchor: 'index',
};

export { ErrorBoundary } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          title: 'KidGO',
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
          animation: 'fade_from_bottom', // for android
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="feedback"
        options={{
          headerLargeTitle: true,
          title: 'Feedback',
        }}
      />
      <Stack.Screen
        name="new-place"
        options={{
          headerLargeTitle: true,
          title: 'Ajouter un lieu',
          presentation: 'modal',
          animation: 'slide_from_bottom', // for android
        }}
      />
    </Stack>
  );
}
