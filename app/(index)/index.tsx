/// <reference types="react/canary" />
// import { SearchPlaceholder } from "@/components/SearchPlaceholder";
// import { BodyScrollView } from "@/components/ui/BodyScrollView";
// import { renderSearchContents } from "@/functions/render-search";
// import { useHeaderSearch } from "@/hooks/useHeaderSearch";
import React from 'react';
import { ScrollView, View } from 'react-native';
import { observer } from '@legendapp/state/react';

import { Text } from '~/components/nativewindui/Text';
import { BodyScrollView } from '~/components/ui/BodyScrollView';
import { Tables } from '~/utils/database.types';
import { places$ } from '~/utils/supabase-legend';

const POSTER_WIDTH = 140;
const POSTER_HEIGHT = 210;

export default function HomeScreen() {
  // const text = useHeaderSearch({
  //   placeholder: "Shows, Movies, and More",
  // });

  // if (!text || text.length < 2) {
  //   return <SearchPlaceholder />;
  // }

  const text = 'Activités, Musée et plus';

  return <SearchPage text={text} />;
  // return <Loading />;
}

function SearchPage({ text }: { text: string }) {
  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingVertical: 16,
        gap: 2,
      }}>
      <React.Suspense fallback={<Loading />}>
        {/* {renderSearchContents(text)} */}
        <Text variant="body">{text}</Text>
        <PlacesSection priceRange="Gratuit" />
        <PlacesSection priceRange="€" />
        <PlacesSection priceRange="€€" />
        <PlacesSection priceRange="€€€" />
      </React.Suspense>
    </BodyScrollView>
  );
}

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
          <Text
            variant="caption1"
            numberOfLines={2}
            style={{
              height: 28,
              width: '100%',
            }}>
            {place.name}
          </Text>
          <Text
            variant="caption2"
            className="text-muted-foreground"
            style={{
              height: 12,
              width: '100%',
            }}>
            {place.category || 'Activité'}
          </Text>
        </View>
      </View>
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
