import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import { Avatar, AvatarFallback } from '~/components/nativewindui/Avatar';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { PlacesList } from '~/components/PlacesList';

function Header() {
  return (
    <View className="flex-row items-center justify-between px-4 pt-4">
      <View className="flex-row items-center">
        <Link href="/(discover)/settings">
          <Avatar alt={'KGO'}>
            <AvatarFallback>
              <Text className="text-foreground">KGO</Text>
            </AvatarFallback>
          </Avatar>
        </Link>
        <Text variant="largeTitle" className="ml-4">
          Découvrir
        </Text>
      </View>
      <Link href="/(discover)/map" asChild>
        <Button variant="tonal">
          <Text>Carte</Text>
        </Button>
      </Link>
    </View>
  );
}

export default function Screen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      <Header />
      <PlacesList />
    </SafeAreaView>
  );
}
