import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { LegendList } from '@legendapp/list';
import { observer } from '@legendapp/state/react';
import { Icon } from '@roninoss/icons';
import { cssInterop } from 'nativewind';

import { FilterBar } from '~/components/FilterBar';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import { Text } from '~/components/nativewindui/Text';
import { PlaceDetails } from '~/components/PlaceDetails';
import { VStack } from '~/components/ui/Views';
import { useLocation } from '~/contexts/LocationContext';
import { useColorScheme } from '~/lib/useColorScheme';
import { calculateDistance } from '~/utils/calculate-distance';
import { getCategoryInfo } from '~/utils/category-formatter';
import { Tables } from '~/utils/database.types';
import { places$ } from '~/utils/supabase-legend';

cssInterop(LegendList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});

const PlacesListContent = observer(() => {
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

  // Filter places that have valid coordinates and are nearby
  const validPlaces = places
    ? Object.values(places)
        .filter(
          (place: Tables<'places'>) =>
            place.latitude !== null &&
            place.longitude !== null &&
            place.name !== null &&
            !place.deleted
        )
        .map((place: Tables<'places'>) => {
          let distance = null;
          if (location && place.latitude && place.longitude) {
            distance = calculateDistance(
              location.coords.latitude,
              location.coords.longitude,
              parseFloat(String(place.latitude)),
              parseFloat(String(place.longitude))
            );
          }
          return { ...place, distance };
        })
        .filter((place) => !location || place.distance === null || place.distance <= 50) // Within 50km
        .sort((a, b) => {
          // Sort by distance if available, otherwise by name
          if (a.distance !== null && b.distance !== null) {
            return a.distance - b.distance;
          }
          if (a.distance !== null) return -1;
          if (b.distance !== null) return 1;
          return (a.name || '').localeCompare(b.name || '');
        })
    : [];

  function keyExtractor(item: Tables<'places'> & { distance: number | null }) {
    return item.id;
  }

  function renderItemSeparator() {
    return (
      <View className="px-4">
        <View className="border-b border-border" />
      </View>
    );
  }

  function handleCloseAllSheets() {
    placeDetailsSheetRef.current?.dismiss();
    setSelectedPlace(null);
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

  return (
    <>
      <VStack className="gap-4 pt-4">
        <Text variant="heading" className="px-4">
          Filtrer par catégorie
        </Text>
        <FilterBar />
      </VStack>
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

export function PlacesList() {
  return <PlacesListContent />;
}
