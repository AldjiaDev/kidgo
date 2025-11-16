import { Pressable, View } from 'react-native';

import { Text } from '~/components/nativewindui/Text';

interface PressableInputProps {
  label: string;
  value: string;
  placeholder: string;
  onPress: () => void;
  disabled?: boolean;
  errorMessage?: string;
  className?: string;
}

export function PressableInput({
  label,
  value,
  placeholder,
  onPress,
  disabled = false,
  errorMessage,
  className = '',
}: PressableInputProps) {
  return (
    <View className={`mb-4 ${className}`}>
      <Text className="mb-2 text-sm font-medium text-foreground">{label}</Text>
      <Pressable
        onPress={onPress}
        className="rounded-md border border-input bg-background px-3 py-3"
        disabled={disabled}
        style={({ pressed }) => ({
          opacity: pressed ? 0.8 : 1,
        })}>
        <Text className={value ? 'text-foreground' : 'text-muted-foreground'}>
          {value || placeholder}
        </Text>
      </Pressable>
      {errorMessage && <Text className="mt-1 text-sm text-destructive">{errorMessage}</Text>}
    </View>
  );
}
