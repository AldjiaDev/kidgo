import { forwardRef, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { Sheet } from '@/components/nativewindui/Sheet';
import { Text } from '@/components/nativewindui/Text';
import { PRICE_RANGES } from '@/utils/constants';

interface PriceRangeBottomSheetProps {
  onItemPress: (category: string) => void;
  ref: React.RefObject<BottomSheetModal | null>;
}

export const PriceRangeBottomSheet = forwardRef<BottomSheetModal, PriceRangeBottomSheetProps>(
  ({ onItemPress }, ref) => {
    const DATA = PRICE_RANGES;

    const renderItem = useCallback(
      (item: string, index: number) => (
        <Pressable
          key={`${item}-${index}`}
          onPress={() => onItemPress(item)}
          className="border-b border-border py-3">
          <Text className="text-foreground">{item}</Text>
        </Pressable>
      ),
      [onItemPress]
    );

    return (
      <Sheet ref={ref} key="PriceRangeSheet" name="PriceRangeSheet" snapPoints={['40%', '80%']}>
        <View className="flex-1 p-4">
          <Text className="mb-4 text-lg font-semibold">Sélectionnez une gamme de prix</Text>

          <BottomSheetScrollView keyboardDismissMode="on-drag" keyboardShouldPersistTaps="never">
            {DATA.map(renderItem)}
          </BottomSheetScrollView>
        </View>
      </Sheet>
    );
  }
);

PriceRangeBottomSheet.displayName = 'PriceRangeBottomSheet';
