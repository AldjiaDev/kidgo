import { Text } from '~/components/nativewindui/Text';
import { BodyScrollView } from '~/components/ui/BodyScrollView';

export default function SettingsScreen() {
  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingVertical: 16,
        gap: 2,
      }}>
      <Text>Feed me</Text>
    </BodyScrollView>
  );
}
