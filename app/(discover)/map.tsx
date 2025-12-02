import { SafeAreaView } from 'react-native-safe-area-context';

import { LocationPermissionBanner } from '@/components/LocationPermissionBanner';
import { Maps } from '@/components/Maps';
import { Sheet, useSheetRef } from '@/components/nativewindui/Sheet';
import { PlacesList } from '@/components/PlacesList';

export default function MapScreen() {
  const placesSheetRef = useSheetRef();

  return (
    <SafeAreaView className="flex-1">
      <LocationPermissionBanner />
      <Maps />
      <Sheet ref={placesSheetRef} snapPoints={['65%', '85%']} index={0}>
        <PlacesList />
      </Sheet>
    </SafeAreaView>
  );
}
