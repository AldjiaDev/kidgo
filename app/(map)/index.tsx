import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Container } from '~/components/Container';
import { LocationPermissionBanner } from '~/components/LocationPermissionBanner';
import { Maps } from '~/components/Maps';
import { SegmentedControl } from '~/components/nativewindui/SegmentedControl/SegmentedControl';
import { PlacesList } from '~/components/PlacesList';

export default function MapScreen() {
  const statusBarInset = useSafeAreaInsets().top; // inset of the status bar

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SafeAreaView className="flex-1">
      <LocationPermissionBanner />
      <View className="absolute left-4 right-4 z-10" style={{ top: statusBarInset }}>
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
    </SafeAreaView>
  );
}
