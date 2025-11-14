import { forwardRef, useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { Sheet } from '~/components/nativewindui/Sheet';
import { PRICE_RANGES } from '~/utils/constants';

interface PriceRangeBottomSheetProps {
  index?: number;
  onItemPress: (category: string) => void;
  ref: React.RefObject<BottomSheetModal | null>;
}

export const PriceRangeBottomSheet = forwardRef<BottomSheetModal, PriceRangeBottomSheetProps>(
  ({ index, onItemPress }, ref) => {
    const DATA = PRICE_RANGES;

    const renderItem = useCallback(
      (item: string, index: number) => (
        <Pressable
          key={item}
          onPress={() => onItemPress(item)}
          className="border-b border-border py-3">
          <Text className="text-foreground">{item}</Text>
        </Pressable>
      ),
      [onItemPress]
    );

    return (
      <Sheet
        ref={ref}
        key="PriceRangeSheet"
        name="PriceRangeSheet"
        index={1}
        snapPoints={['40%', '80%']}>
        <View className="flex-1 p-4">
          <Text className="mb-4 text-lg font-semibold">Sélectionnez une gamme de prix</Text>

          {/* {DATA.map(renderItem)} */}
        </View>
      </Sheet>
    );
  }
);

PriceRangeBottomSheet.displayName = 'PriceRangeBottomSheet';
