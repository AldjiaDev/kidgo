import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LegendList } from '@legendapp/list';
import { observer } from '@legendapp/state/react';
import { Icon } from '@roninoss/icons';
import * as Location from 'expo-location';
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

  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  // Get user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // Calculate distance between two coordinates using Haversine formula
  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

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

  function renderItem({ item: place }: { item: Tables<'places'> & { distance: number | null } }) {
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
