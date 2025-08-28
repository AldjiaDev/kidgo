import * as React from 'react';
import { Pressable, View } from 'react-native';
import { clsx } from 'clsx';

import { SegmentControlProps } from '~/components/nativewindui/SegmentedControl/SegmentedControl.ios';
import { Text } from '~/components/nativewindui/Text';
import { cn } from '~/lib/cn';

export function SegmentedControl({
  values,
  selectedIndex,
  onIndexChange,
  onValueChange,
  enabled = true,
  iosMomentary: _iosMomentary,
}: SegmentControlProps) {
  const id = React.useId();

  function onPress(index: number, value: string) {
    return () => {
      onIndexChange?.(index);
      onValueChange?.(value);
    };
  }
  return (
    <View className="bg-card-background/40 flex-row rounded-lg border border-border">
      {values.map((value, index) => {
        return (
          <View key={`segment:${id}-${index}-${value}`} className="flex-1 gap-2 py-1">
            <View
              className={clsx(
                'px-1',
                index !== values?.length - 1 && selectedIndex !== index && 'border-r border-border'
              )}>
              <Pressable
                disabled={!enabled}
                hitSlop={10}
                className={cn(
                  'flex w-full rounded-md py-1 text-center',
                  selectedIndex === index && 'bg-background'
                )}
                onPress={onPress(index, value)}>
                <Text className={'text-center text-[13px] font-medium'}>{value}</Text>
              </Pressable>
            </View>
          </View>
        );
      })}
    </View>
  );
}
