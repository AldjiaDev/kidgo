import React from 'react';
import { View } from 'react-native';
import { Icon } from '@roninoss/icons';
import { Link } from 'expo-router';

import { NewPlaceForm } from '~/components/places/NewPlaceForm';
import { Button } from '~/components/nativewindui/Button';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import { Text } from '~/components/nativewindui/Text';
import { PlacesSection } from '~/components/PlacesSection';
import { SearchResults } from '~/components/SearchResults';
import { Loading } from '~/components/Skeleton';
import { BodyScrollView } from '~/components/ui/BodyScrollView';
import { useAuth } from '~/hooks/useAuth';
import { useHeaderSearchBar } from '~/lib/useHeaderSearchBar';

export default function HomeScreen() {
  const { isAuthenticated } = useAuth();
  const addPlaceSheetRef = useSheetRef();
  function handleAddPlaceClick() {
    console.log('🚀 ~ handleAddPlaceClick ~ addPlaceSheetRef:', addPlaceSheetRef);
    addPlaceSheetRef.current?.present();
  }

  function handlePlaceAdded() {
    addPlaceSheetRef.current?.dismiss();
  }

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
            {isAuthenticated && (
              <Link href="/(home)/new-place" asChild>
                <Button
                  onPress={handleAddPlaceClick}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.8 : 1,
                  })}>
                  <Icon name="plus" size={24} color="white" />
                  <Text>Ajouter un lieu</Text>
                </Button>
              </Link>
            )}
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

      {/* Add Place Bottom Sheet */}

      <Sheet ref={addPlaceSheetRef} snapPoints={['65%', '85%']}>
        <Text variant="largeTitle">Ajouter un lieu</Text>
        {/* <NewPlaceForm
          onSubmit={handlePlaceAdded}
          onCancel={() => addPlaceSheetRef.current?.dismiss()}
        /> */}
      </Sheet>
    </BodyScrollView>
  );
}
