import { forwardRef, useCallback } from 'react';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { Sheet } from '@/components/nativewindui/Sheet';
import { Text } from '@/components/nativewindui/Text';
import { CATEGORIES } from '@/utils/constants';

interface CategoriesBottomSheetProps {
  onItemPress: (category: string) => void;
  ref: React.RefObject<BottomSheetModal | null>;
}

export const CategoriesBottomSheet = forwardRef<BottomSheetModal, CategoriesBottomSheetProps>(
  ({ onItemPress }, ref) => {
    const DATA = CATEGORIES;

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
      <Sheet ref={ref} name="CategoriesSheet" snapPoints={['40%', '80%']}>
        <SafeAreaView className="flex-1 p-4" edges={['top', 'bottom']}>
          <Text className="mb-4 text-lg font-semibold">Sélectionnez une catégorie</Text>

          <BottomSheetScrollView keyboardDismissMode="on-drag" keyboardShouldPersistTaps="never">
            {DATA.map(renderItem)}
          </BottomSheetScrollView>
        </SafeAreaView>
      </Sheet>
    );
  }
);

CategoriesBottomSheet.displayName = 'CategoriesBottomSheet';
