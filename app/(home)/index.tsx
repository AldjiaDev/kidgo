import React from 'react';
import { View } from 'react-native';
import { Link } from 'expo-router';

import { Button } from '@/components/nativewindui/Button';
import { Text } from '@/components/nativewindui/Text';
import { PlacesSection } from '@/components/PlacesSection';
import { SearchResults } from '@/components/SearchResults';
import { Loading } from '@/components/Skeleton';
import { BodyScrollView } from '@/components/ui/BodyScrollView';
import { useHeaderSearchBar } from '@/lib/useHeaderSearchBar';

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
      <View className="mt-4 px-4">
        <Link href="/feedback" asChild>
          <Button variant="tonal">
            <Text>💬 Donner son avis</Text>
          </Button>
        </Link>
      </View>
    </BodyScrollView>
  );
}
