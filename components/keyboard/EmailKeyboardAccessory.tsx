import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { KeyboardExtender } from 'react-native-keyboard-controller';

import { Text } from '~/components/nativewindui/Text';

type EmailKeyboardAccessoryProps = {
  onSuggestionPress: (suggestion: string) => void;
  enabled?: boolean;
};

const EMAIL_SUGGESTIONS = [
  '@gmail.com',
  '@outlook.com',
  '@yahoo.com',
  '@hotmail.com',
  '@icloud.com',
];

export function EmailKeyboardAccessory({
  onSuggestionPress,
  enabled = true,
}: EmailKeyboardAccessoryProps) {
  if (!enabled) {
    return null;
  }

  return (
    <KeyboardExtender enabled={enabled}>
      <View className="bg-border/70 border-t border-border px-4 py-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {EMAIL_SUGGESTIONS.map((suggestion) => (
              <TouchableOpacity
                key={suggestion}
                onPress={() => onSuggestionPress(suggestion)}
                className="rounded-lg bg-primary px-3 py-2">
                <Text className="text-sm text-primary-foreground">{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </KeyboardExtender>
  );
}
