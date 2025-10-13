import { forwardRef, useCallback } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { Sheet } from '~/components/nativewindui/Sheet';
import { CATEGORIES } from '~/utils/constants';

interface CategoriesBottomSheetProps {
  index?: number;
  onItemPress: (category: string) => void;
  // categoryOnChange?: ((value: string) => void) | null;
}

export const CategoriesBottomSheet = forwardRef<BottomSheetModal, CategoriesBottomSheetProps>(
  ({ index, onItemPress }, ref) => {
    const DATA = CATEGORIES;

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
        key="CategoriesSheet"
        name="CategoriesSheet"
        index={1}
        snapPoints={['40%', '80%']}>
        <View className="flex-1 p-4">
          <Text className="mb-4 text-lg font-semibold">Sélectionnez une catégorie</Text>

          <BottomSheetScrollView
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="never"
            // style={scrollViewStyle}
            // contentContainerStyle={scrollViewContentContainer}
          >
            {DATA.map(renderItem)}
          </BottomSheetScrollView>
        </View>
      </Sheet>
    );
  }
);

CategoriesBottomSheet.displayName = 'CategoriesBottomSheet';
