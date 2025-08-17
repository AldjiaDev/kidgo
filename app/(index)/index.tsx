import React from 'react';
import { ScrollView, View } from 'react-native';
import { observer } from '@legendapp/state/react';
import { Link } from 'expo-router';

import { Text } from '~/components/nativewindui/Text';
import { BodyScrollView } from '~/components/ui/BodyScrollView';
import { useHeaderSearchBar } from '~/lib/useHeaderSearchBar';
import { Tables } from '~/utils/database.types';
import { places$ } from '~/utils/supabase-legend';

const POSTER_WIDTH = 140;
const POSTER_HEIGHT = 210;

export default function HomeScreen() {
  const searchValue = useHeaderSearchBar({
    hideWhenScrolling: false,
    placeholder: 'Rechercher des activités...',
  });

  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingVertical: 16,
        gap: 2,
      }}>
      <React.Suspense fallback={<Loading />}>
        {searchValue ? (
          <SearchResults searchValue={searchValue} />
        ) : (
          <>
            <PlacesSection priceRange="Gratuit" />
            <PlacesSection priceRange="€" />
            <PlacesSection priceRange="€€" />
            <PlacesSection priceRange="€€€" />
          </>
        )}
      </React.Suspense>
    </BodyScrollView>
  );
}

const SearchResults = observer(({ searchValue }: { searchValue: string }) => {
  const places = places$.get();

  if (!places) {
    return <SkeletonSection />;
  }

  // Filter places by search value across multiple fields
  const searchResults = Object.values(places).filter(
    (place: Tables<'places'>) =>
      place.name !== null &&
      !place.deleted &&
      (place.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        (place.category && place.category.toLowerCase().includes(searchValue.toLowerCase())) ||
        (place.description &&
          place.description.toLowerCase().includes(searchValue.toLowerCase())) ||
        (place.address && place.address.toLowerCase().includes(searchValue.toLowerCase())))
  );

  if (searchResults.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <Text variant="heading" className="mb-2 text-center">
          Aucun résultat trouvé
        </Text>
        <Text variant="body" className="text-center text-muted-foreground">
          Essayez de modifier votre recherche ou explorez nos catégories.
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Text variant="heading" className="mb-3 ml-4">
        {searchResults.length} résultat{searchResults.length > 1 ? 's' : ''} pour &quot;
        {searchValue}&quot;
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}>
        {searchResults.slice(0, 10).map((place) => (
          <PlaceItem key={place.id} place={place} />
        ))}
      </ScrollView>
    </View>
  );
});

function Loading() {
  return (
    <View style={{ gap: 24 }}>
      <SkeletonSection />
      <SkeletonSection />
      <SkeletonSection />
    </View>
  );
}

const PlacesSection = observer(({ priceRange }: { priceRange: string }) => {
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

function PlaceItem({ place }: { place: Tables<'places'> }) {
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
            className="rounded-xl bg-muted"
            style={{
              width: POSTER_WIDTH,
              height: POSTER_HEIGHT,
            }}
          />
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

function SkeletonItem() {
  return (
    <View className="mx-4">
      <View
        className="overflow-hidden rounded-xl bg-background"
        style={{
          width: POSTER_WIDTH,
        }}>
        <View
          className="rounded-xl bg-muted"
          style={{
            width: POSTER_WIDTH,
            height: POSTER_HEIGHT,
          }}
        />
        <View style={{ padding: 8, gap: 4 }}>
          <View
            className="rounded bg-muted"
            style={{
              height: 14,
              width: '80%',
            }}
          />
          <View
            className="rounded bg-muted"
            style={{
              height: 12,
              width: '30%',
            }}
          />
        </View>
      </View>
    </View>
  );
}

function SkeletonSection() {
  return (
    <View>
      <View
        className="rounded bg-muted"
        style={{
          width: 100,
          height: 20,
          marginBottom: 12,
          marginLeft: 16,
        }}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}>
        {[...Array(4)].map((_, i) => (
          <SkeletonItem key={i} />
        ))}
      </ScrollView>
    </View>
  );
}
