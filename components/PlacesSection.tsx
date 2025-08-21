import { ScrollView, View } from 'react-native';
import { observer } from '@legendapp/state/react';
import { Link } from 'expo-router';

import { Text } from '~/components/nativewindui/Text';
import { POSTER_HEIGHT, POSTER_WIDTH, SkeletonSection } from '~/components/Skeleton';
import { getCategoryInfo } from '~/utils/categoryFormatter';
import { Tables } from '~/utils/database.types';
import { places$ } from '~/utils/supabase-legend';

export function PlaceItem({ place }: { place: Tables<'places'> }) {
  const categoryInfo = getCategoryInfo(place.category);

  return (
    <View className="mr-4">
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
        }}>
        <View
          className="overflow-hidden rounded-xl bg-background"
          style={{
            width: POSTER_WIDTH,
          }}>
          <View
            className={`rounded-xl ${categoryInfo.backgroundColor} flex items-center justify-center`}
            style={{
              width: POSTER_WIDTH,
              height: POSTER_HEIGHT,
            }}>
            <Text
              style={{
                fontSize: 40,
                lineHeight: 48,
              }}>
              {categoryInfo.emoji}
            </Text>
          </View>
          <View style={{ padding: 8, gap: 4 }}>
            <Text
              variant="caption1"
              numberOfLines={2}
              style={{
                width: '100%',
              }}>
              {place.name}
            </Text>
            <Text
              variant="caption2"
              className="text-muted-foreground"
              style={{
                width: '100%',
              }}>
              {place.category || 'Activité'}
            </Text>
          </View>
        </View>
      </Link>
    </View>
  );
}

export const PlacesSection = observer(({ priceRange }: { priceRange: string }) => {
  const places = places$.get();

  if (!places) {
    return <SkeletonSection />;
  }

  // Filter places by price range that have valid data
  const filteredPlaces = Object.values(places).filter(
    (place: Tables<'places'>) =>
      place.name !== null && place.price_range === priceRange && !place.deleted
  );

  if (filteredPlaces.length === 0) {
    return null; // Don't render empty sections
  }

  return (
    <View>
      <Text
        variant="heading"
        className="mb-3 ml-4"
        style={{
          width: 'auto',
          height: 20,
        }}>
        {priceRange}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}>
        {filteredPlaces.slice(0, 4).map((place) => (
          <PlaceItem key={place.id} place={place} />
        ))}
      </ScrollView>
    </View>
  );
});
