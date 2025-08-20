import React from 'react';
import { Link } from 'expo-router';

import { PlaceItem, PlacesSection } from '~/components/PlacesSection';
import { SearchResults } from '~/components/SearchResuts';
import { Loading, SkeletonSection } from '~/components/Skeleton';
import { BodyScrollView } from '~/components/ui/BodyScrollView';
import { useHeaderSearchBar } from '~/lib/useHeaderSearchBar';

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
