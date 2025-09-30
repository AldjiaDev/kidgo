import { Platform, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { PlaceDetails } from '~/components/PlaceDetails';
import Stack from '~/components/ui/Stack';
import { useColorScheme } from '~/lib/useColorScheme';

export default function ModalScreen() {
  const { colorScheme } = useColorScheme();
  const {
    name,
    description,
    address,
    category,
    area_type,
    price_range,
    opening_hours,
    website_url,
  } = useLocalSearchParams();

  const data = {
    name,
    description,
    address,
    category,
    area_type,
    price_range,
    opening_hours,
    website_url,
  };

  return (
    <>
      <StatusBar
        style={Platform.OS === 'ios' ? 'light' : colorScheme === 'dark' ? 'light' : 'dark'}
      />

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <PlaceDetails data={data} />
      </ScrollView>
    </>
  );
}
