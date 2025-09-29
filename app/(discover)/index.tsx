import { Button, Text, View } from 'react-native';
import { Link } from 'expo-router';

import { PlacesList } from '~/components/PlacesList';

export default function Screen() {
  return (
    <View>
      <Text>Categories</Text>

      <PlacesList />
    </View>
  );
}
