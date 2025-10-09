import { View } from 'react-native';
import { Stack } from 'expo-router';

import Storybook from '../../.rnstorybook';

export default function StorybookLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Storybook />
    </View>
  );
}
