import { SafeAreaView } from 'react-native-safe-area-context';

import { PlacesList } from '~/components/PlacesList';

export default function Screen() {
  return (
    <SafeAreaView className="flex-1 bg-background py-12" edges={['top', 'left', 'right']}>
      <PlacesList />
    </SafeAreaView>
  );
}
