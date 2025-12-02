import { View, ViewProps } from 'react-native';

import { cn } from '@/lib/cn';

export function HStack({ className, ...props }: ViewProps) {
  return <View className={cn('flex-row', className)} {...props} />;
}

export function VStack({ className, ...props }: ViewProps) {
  return <View className={cn('flex-col', className)} {...props} />;
}
