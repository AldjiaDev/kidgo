import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { LegendList } from '@legendapp/list';
import { observer } from '@legendapp/state/react';
import { Icon } from '@roninoss/icons';
import { useLocalSearchParams } from 'expo-router';
import { cssInterop } from 'nativewind';

import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import { Text } from '~/components/nativewindui/Text';
import { PlaceDetails } from '~/components/PlaceDetails';
import { useLocation } from '~/contexts/LocationContext';
import { useColorScheme } from '~/lib/useColorScheme';
import { getCategoryInfo } from '~/utils/category-formatter';
import { Tables } from '~/utils/database.types';
import { filterValidPlaces } from '~/utils/filter-valid-places';
import { places$ } from '~/utils/supabase-legend';

cssInterop(LegendList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});

const CategoryScreenContent = observer(() => {
  const { category: rawCategory } = useLocalSearchParams<{ category: string }>();
  const category = rawCategory ? decodeURIComponent(rawCategory) : null;
  const places = places$.get();
  const { colors } = useColorScheme();
  const { location, requestPermission, hasPermission } = useLocation();
  const [selectedPlace, setSelectedPlace] = useState<Tables<'places'> | null>(null);
  const placeDetailsSheetRef = useSheetRef();

  // Get user's current location
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  // Filter places by the selected category
  const validPlaces = filterValidPlaces(places, location, category);

  function keyExtractor(item: Tables<'places'> & { distance: number | null }) {
    return item.id;
  }

  function renderItemSeparator() {
    return <View className="mx-4 h-px bg-border" />;
  }

  function handleCloseAllSheets() {
    placeDetailsSheetRef.current?.dismiss();
  }

  function renderItem({ item: place }: { item: Tables<'places'> & { distance: number | null } }) {
    const categoryInfo = getCategoryInfo(place.category);

    const handlePlacePress = () => {
      setSelectedPlace(place);
      placeDetailsSheetRef.current?.present();
    };

    return (
      <TouchableOpacity className="px-4 py-3" onPress={handlePlacePress}>
        <View className="flex-row items-center gap-3">
          <View
            className={`h-12 w-12 items-center justify-center rounded-lg ${categoryInfo.backgroundColor}`}>
            <Text
              style={{
                fontSize: 20,
                lineHeight: 28,
              }}>
              {categoryInfo.emoji}
            </Text>
          </View>
          <View className="flex-1 gap-1">
            <View className="flex-row items-center justify-between">
              <Text className="font-medium text-foreground" numberOfLines={1}>
                {place.name}
              </Text>
              {place.distance !== null && (
                <Text className="text-xs text-muted-foreground">
                  {place.distance < 1
                    ? `${Math.round(place.distance * 1000)}m`
                    : `${place.distance.toFixed(1)}km`}
                </Text>
              )}
            </View>
            <View className="flex-row items-center gap-2">
              {place.category && (
                <Text className="text-sm text-muted-foreground">{place.category}</Text>
              )}
              {place.price_range && (
                <>
                  <Text className="text-sm text-muted-foreground">•</Text>
                  <Text className="text-sm text-muted-foreground">{place.price_range}</Text>
                </>
              )}
            </View>
            {place.address && (
              <Text className="text-sm text-muted-foreground" numberOfLines={1}>
                {place.address}
              </Text>
            )}
          </View>
          <Icon name="chevron-right" size={16} color={colors.grey} />
        </View>
      </TouchableOpacity>
    );
  }

  if (validPlaces.length === 0) {
    return (
      <View className="flex-1">
        <View className="flex-1 items-center justify-center p-8">
          <Text variant="heading" className="mb-2 text-center">
            Aucun lieu trouvé
          </Text>
          <Text variant="body" className="text-center text-muted-foreground">
            Il n&apos;y a pas encore de lieux dans cette catégorie.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <LegendList
        data={validPlaces}
        estimatedItemSize={80}
        contentContainerClassName="py-2"
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderItemSeparator}
        renderItem={renderItem}
        recycleItems
      />
      <Sheet ref={placeDetailsSheetRef} snapPoints={['65%', '85%']}>
        {selectedPlace && (
          <View className="px-4">
            <PlaceDetails data={selectedPlace} onClose={handleCloseAllSheets} />
          </View>
        )}
      </Sheet>
    </>
  );
});

export default function CategoryScreen() {
  return <CategoryScreenContent />;
}
