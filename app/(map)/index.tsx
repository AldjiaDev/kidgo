import { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Container } from '~/components/Container';
import { LocationPermissionBanner } from '~/components/LocationPermissionBanner';
import { Maps } from '~/components/Maps';
import { SegmentedControl } from '~/components/nativewindui/SegmentedControl/SegmentedControl';
import { PlacesList } from '~/components/PlacesList';

export default function MapScreen() {
  const statusBarInset = useSafeAreaInsets().top; // inset of the status bar
  const largeHeaderInset = statusBarInset + 38; // inset to use for a large header since it's frame is equal to 96 + the frame of status bar

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View className="flex-1">
      <LocationPermissionBanner />
      <View className="absolute left-4 right-4 z-10" style={{ top: largeHeaderInset }}>
        <SegmentedControl
          values={['Carte', 'Liste']}
          selectedIndex={selectedIndex}
          onIndexChange={(index) => {
            setSelectedIndex(index);
          }}
        />
      </View>
      {selectedIndex === 0 && <Maps />}
      {selectedIndex === 1 && (
        <Container>
          <PlacesList />
        </Container>
      )}
    </View>
  );
}
