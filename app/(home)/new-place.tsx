import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import BottomSheet from '@gorhom/bottom-sheet';
import { router } from 'expo-router';

import { Button } from '~/components/nativewindui/Button';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import { Text } from '~/components/nativewindui/Text';
import { NewPlaceForm } from '~/components/places/NewPlaceForm';
import { BodyScrollView } from '~/components/ui/BodyScrollView';
import { useLocation } from '~/contexts/LocationContext';
import { CATEGORIES, PRICE_RANGES } from '~/utils/constants';

export default function NewPlaceScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryOnChange, setCategoryOnChange] = useState<((value: string) => void) | null>(null);
  const [priceOnChange, setPriceOnChange] = useState<((value: string) => void) | null>(null);
  const { location } = useLocation();
  const priceSheetRef = useSheetRef();

  function handlePlaceAdded(data) {
    console.log('🚀 ~ handlePlaceAdded ~ data:', data);
  }

  function handleCancel() {
    router.back();
  }

  function openPriceSheet() {
    console.log('🚀 ~ openPriceSheet ~ priceSheetRef:', priceSheetRef);
    priceSheetRef?.current?.present();
  }

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} className="flex-1">
      <BodyScrollView
        contentContainerStyle={{
          paddingVertical: 16,
          gap: 2,
        }}>
        <NewPlaceForm
          onSubmit={handlePlaceAdded}
          onCancel={handleCancel}
          categoryOnChange={categoryOnChange}
          setCategoryOnChange={setCategoryOnChange}
          priceOnChange={priceOnChange}
          setPriceOnChange={setPriceOnChange}
          // categorySheetRef={categorySheetRef}
          priceSheetRef={priceSheetRef}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          location={location}
        />

        <Button variant="tonal" onPress={openPriceSheet} className="mx-4 mt-4">
          <Text>Open Price</Text>
        </Button>
      </BodyScrollView>

      {/* Price Selection Sheet */}
      <Sheet ref={priceSheetRef} snapPoints={['40%', '80%']}>
        <View className="flex-1 p-4">
          <Text className="mb-4 text-lg font-semibold">Sélectionnez une gamme de prix</Text>
          {PRICE_RANGES.map((price) => (
            <Pressable
              key={price}
              onPress={() => {
                priceOnChange?.(price);
                priceSheetRef.current?.dismiss();
              }}
              className="border-b border-border py-3">
              <Text className="text-foreground">{price}</Text>
            </Pressable>
          ))}
        </View>
      </Sheet>
    </KeyboardAvoidingView>
  );
}
