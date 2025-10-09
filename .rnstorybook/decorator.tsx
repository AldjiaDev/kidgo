import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Decorator } from '@storybook/react';

export const StorybookDecorator: Decorator = (Story) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <Story />
      </ScrollView>
    </View>
  );
};
