import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { Button } from '~/components/nativewindui/Button';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import { Text } from '~/components/nativewindui/Text';
import { CATEGORIES, PRICE_RANGES } from '~/utils/constants';

interface FilterBarProps {
  selectedCategory: string | null;
  selectedPriceRange: string | null;
  onCategoryChange: (category: string | null) => void;
  onPriceRangeChange: (priceRange: string | null) => void;
}

export function FilterBar({
  selectedCategory,
  selectedPriceRange,
  onCategoryChange,
  onPriceRangeChange,
}: FilterBarProps) {
  const categorySheetRef = useSheetRef();
  const priceSheetRef = useSheetRef();
  const [tempCategory, setTempCategory] = useState<string | null>(selectedCategory);
  const [tempPriceRange, setTempPriceRange] = useState<string | null>(selectedPriceRange);

  function handleCategoryApply() {
    onCategoryChange(tempCategory);
    categorySheetRef.current?.dismiss();
  }

  function handlePriceRangeApply() {
    onPriceRangeChange(tempPriceRange);
    priceSheetRef.current?.dismiss();
  }

  function handleCategoryReset() {
    setTempCategory(null);
    onCategoryChange(null);
    categorySheetRef.current?.dismiss();
  }

  function handlePriceRangeReset() {
    setTempPriceRange(null);
    onPriceRangeChange(null);
    priceSheetRef.current?.dismiss();
  }

  return (
    <>
      <View className="flex-row gap-2 px-4 py-2">
        <Button
          variant={selectedCategory ? 'primary' : 'tonal'}
          onPress={() => {
            setTempCategory(selectedCategory);
            categorySheetRef.current?.present();
          }}
          className="flex-row items-center gap-1">
          <Text>{selectedCategory || 'Catégorie'}</Text>
        </Button>

        <Button
          variant={selectedPriceRange ? 'primary' : 'tonal'}
          onPress={() => {
            setTempPriceRange(selectedPriceRange);
            priceSheetRef.current?.present();
          }}
          className="flex-row items-center gap-1">
          <Text>{selectedPriceRange || 'Prix'}</Text>
        </Button>

        {(selectedCategory || selectedPriceRange) && (
          <Button
            variant="tonal"
            onPress={() => {
              onCategoryChange(null);
              onPriceRangeChange(null);
              setTempCategory(null);
              setTempPriceRange(null);
            }}>
            <Text>Réinitialiser</Text>
          </Button>
        )}
      </View>

      {/* Category Selection Sheet */}
      <Sheet ref={categorySheetRef} snapPoints={['70%']}>
        <View className="flex-1 p-4">
          <Text className="mb-4 text-lg font-semibold">Filtrer par catégorie</Text>
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            <Pressable
              onPress={() => setTempCategory(null)}
              className="mb-2 rounded-lg border border-border bg-background p-3">
              <Text
                className={
                  tempCategory === null ? 'font-semibold text-primary' : 'text-foreground'
                }>
                Toutes les catégories
              </Text>
            </Pressable>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                onPress={() => setTempCategory(category)}
                className="mb-2 rounded-lg border border-border bg-background p-3">
                <Text
                  className={
                    tempCategory === category ? 'font-semibold text-primary' : 'text-foreground'
                  }>
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <View className="mt-4 flex-row gap-2">
            <Button variant="tonal" onPress={handleCategoryReset} className="flex-1">
              <Text>Réinitialiser</Text>
            </Button>
            <Button onPress={handleCategoryApply} className="flex-1">
              <Text>Appliquer</Text>
            </Button>
          </View>
        </View>
      </Sheet>

      {/* Price Range Selection Sheet */}
      <Sheet ref={priceSheetRef} snapPoints={['40%']}>
        <View className="flex-1 p-4">
          <Text className="mb-4 text-lg font-semibold">Filtrer par prix</Text>
          <View className="flex-1">
            <Pressable
              onPress={() => setTempPriceRange(null)}
              className="mb-2 rounded-lg border border-border bg-background p-3">
              <Text
                className={
                  tempPriceRange === null ? 'font-semibold text-primary' : 'text-foreground'
                }>
                Tous les prix
              </Text>
            </Pressable>
            {PRICE_RANGES.map((price) => (
              <Pressable
                key={price}
                onPress={() => setTempPriceRange(price)}
                className="mb-2 rounded-lg border border-border bg-background p-3">
                <Text
                  className={
                    tempPriceRange === price ? 'font-semibold text-primary' : 'text-foreground'
                  }>
                  {price}
                </Text>
              </Pressable>
            ))}
          </View>
          <View className="mt-4 flex-row gap-2">
            <Button variant="tonal" onPress={handlePriceRangeReset} className="flex-1">
              <Text>Réinitialiser</Text>
            </Button>
            <Button onPress={handlePriceRangeApply} className="flex-1">
              <Text>Appliquer</Text>
            </Button>
          </View>
        </View>
      </Sheet>
    </>
  );
}
