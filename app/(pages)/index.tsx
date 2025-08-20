import { View } from 'react-native';
import { Link, Slot } from 'expo-router';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true' ? (
        <Link href="/(storybook)">Open Storybook</Link>
      ) : null}
    </View>
  );
}
