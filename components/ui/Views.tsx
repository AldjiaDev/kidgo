import { View, ViewProps } from 'react-native';

export function HStack(props: ViewProps) {
  return <View className="flex-row" {...props} />;
}

export function VStack(props: ViewProps) {
  return <View className="flex-col" {...props} />;
}
