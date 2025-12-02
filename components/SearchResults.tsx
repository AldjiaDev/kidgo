import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { use$ } from '@legendapp/state/react';
import Fuse from 'fuse.js';

import { Text } from '@/components/nativewindui/Text';
import { PlaceItem } from '@/components/PlacesSection';
import { SkeletonSection } from '@/components/Skeleton';
import { Tables } from '@/utils/database.types';
import { places$ } from '@/utils/supabase-legend';

export function SearchResults({ searchValue }: { searchValue: string }) {
  const places = use$(places$);

  // Fuzzy search configuration
  const fuse = useMemo(() => {
    const validPlaces = Object.values(places).filter(
      (place: Tables<'places'>) => place.name !== null && !place.deleted
    );

    return new Fuse(validPlaces, {
      keys: [
        { name: 'name', weight: 2 },
        { name: 'category', weight: 1.5 },
        { name: 'description', weight: 1 },
        { name: 'address', weight: 1 },
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, [places]);

  // Perform fuzzy search
  const searchResults = useMemo(() => {
    if (!searchValue.trim()) {
      return [];
    }
    const results = fuse.search(searchValue);
    return results.map((result) => result.item);
  }, [fuse, searchValue]);

  if (!places) {
    return <SkeletonSection />;
  }

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
}
