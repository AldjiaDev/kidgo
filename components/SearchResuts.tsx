import { ScrollView, View } from 'react-native';
import { observer } from '@legendapp/state/react';

import { Text } from '~/components/nativewindui/Text';
import { PlaceItem } from '~/components/PlacesSection';
import { SkeletonSection } from '~/components/Skeleton';
import { Tables } from '~/utils/database.types';
import { places$ } from '~/utils/supabase-legend';

export const SearchResults = observer(({ searchValue }: { searchValue: string }) => {
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
