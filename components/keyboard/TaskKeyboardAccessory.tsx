import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { KeyboardExtender } from 'react-native-keyboard-controller';

import { Text } from '~/components/nativewindui/Text';

type TaskKeyboardAccessoryProps = {
  onSuggestionPress: (suggestion: string) => void;
  enabled?: boolean;
};

const TASK_SUGGESTIONS = ['Acheter ', 'Appeler ', 'Envoyer ', 'Réserver ', 'Planifier ', 'Faire '];

export function TaskKeyboardAccessory({
  onSuggestionPress,
  enabled = true,
}: TaskKeyboardAccessoryProps) {
  if (!enabled) {
    return null;
  }

  return (
    <KeyboardExtender enabled={enabled}>
      <View className="bg-border/70 border-t border-border px-4 py-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {TASK_SUGGESTIONS.map((suggestion) => (
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
