import { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LocationPermissionBanner } from '~/components/LocationPermissionBanner';
import { Maps } from '~/components/Maps';
import { Button } from '~/components/nativewindui/Button';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import { Text } from '~/components/nativewindui/Text';
import { PlacesList } from '~/components/PlacesList';

export default function MapScreen() {
  const placesBottomSheetRef = useSheetRef();

  const handleSnapPress = useCallback(() => {
    placesBottomSheetRef.current?.present();
  }, [placesBottomSheetRef]);

  return (
    <SafeAreaView className="flex-1">
      <LocationPermissionBanner />
      <Maps />
      <Button
        onPress={() => handleSnapPress(1)}
        variant="primary"
        className="bottom-safe-offset-16 absolute left-4">
        <Text>Liste des lieux</Text>
      </Button>
      <Sheet ref={placesBottomSheetRef} snapPoints={['50%', '85%']} index={0}>
        <PlacesList />
      </Sheet>
    </SafeAreaView>
  );
}
