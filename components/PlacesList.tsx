import { Text, TouchableOpacity, View } from 'react-native';
import { LegendList } from '@legendapp/list';
import { observer } from '@legendapp/state/react';
import { Icon } from '@roninoss/icons';
import { Link } from 'expo-router';
import { cssInterop } from 'nativewind';

import { useColorScheme } from '~/lib/useColorScheme';
import { Tables } from '~/utils/database.types';
import { places$ } from '~/utils/supabase-legend';

cssInterop(LegendList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PlacesListProps {}

const PlacesListContent = observer(() => {
  const places = places$.get();
  const { colors } = useColorScheme();

  // Filter places that have valid coordinates
  const validPlaces = places
    ? Object.values(places).filter(
        (place: Tables<'places'>) =>
          place.latitude !== null &&
          place.longitude !== null &&
          place.name !== null &&
          !place.deleted
      )
    : [];

  function keyExtractor(item: Tables<'places'>) {
    return item.id;
  }

  function renderItemSeparator() {
    return (
      <View className="px-4">
        <View className="border-b border-border" />
      </View>
    );
  }

  function renderItem({ item: place }: { item: Tables<'places'> }) {
    return (
      <Link
        href={{
          pathname: '/(index)/modal',
          params: {
            id: place.id,
            name: place.name || '',
            description: place.description || '',
            address: place.address || '',
            category: place.category || '',
            area_type: place.area_type || '',
            price_range: place.price_range || '',
            opening_hours: place.opening_hours || '',
            website_url: place.website_url || '',
            latitude: String(place.latitude || ''),
            longitude: String(place.longitude || ''),
          },
        }}
        asChild>
        <TouchableOpacity className="px-4 py-3">
          <View className="flex-row items-center gap-3">
            <View className="h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Icon name="map-marker-outline" size={20} color={colors.grey} />
            </View>
            <View className="flex-1 gap-1">
              <Text className="font-medium text-foreground" numberOfLines={1}>
                {place.name}
              </Text>
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
      </Link>
    );
  }

  return (
    <LegendList
      data={validPlaces}
      estimatedItemSize={80}
      contentContainerClassName="py-2"
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderItemSeparator}
      renderItem={renderItem}
      recycleItems
    />
  );
});

export function PlacesList(props: PlacesListProps) {
  return <PlacesListContent />;
}
