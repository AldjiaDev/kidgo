import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { PlacesList } from '~/components/PlacesList';

export default function Screen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      <View className="flex-row items-center justify-between px-4 pt-4">
        <Text variant="largeTitle">Découvrir</Text>
        <Link href="/(discover)/maps" asChild>
          <Button variant="tonal">
            <Text>Carte</Text>
          </Button>
        </Link>
      </View>
      <PlacesList />
    </SafeAreaView>
  );
}
