import { View } from 'react-native';

import { Text } from '~/components/nativewindui/Text';

export default function Screen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>[id]</Text>
    </View>
  );
}
