import { Linking, Platform, ScrollView, View } from 'react-native';
import { Icon } from '@roninoss/icons';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import Stack from '~/components/ui/Stack';
import { useColorScheme } from '~/lib/useColorScheme';

export default function ModalScreen() {
  const { colors, colorScheme } = useColorScheme();
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

  function handleWebsitePress() {
    if (website_url && website_url !== '#') {
      Linking.openURL(website_url);
    }
  }

  async function copyToClipboard() {
    await Clipboard.setStringAsync(address);
  }

  return (
    <>
      <StatusBar
        style={Platform.OS === 'ios' ? 'light' : colorScheme === 'dark' ? 'light' : 'dark'}
      />
      <Stack.Screen options={{ title: '' }} />
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <View className="gap-6">
          {/* Header Section */}
          <View className="gap-2">
            <Text variant="title1" className="font-bold">
              {name}
            </Text>
            <View className="flex-row items-center gap-2">
              <Text variant="subhead">{category}</Text>
            </View>
          </View>

          {/* Description */}
          {description && (
            <View className="gap-2">
              <Text variant="body">{description}</Text>
            </View>
          )}

          {/* Details Section */}
          <View className="gap-4">
            {/* Price Range */}
            {price_range && (
              <View className="flex-row items-center gap-3">
                <Icon name="cart-outline" size={20} color={colors.grey} />
                <View className="flex-1">
                  <Text variant="body">{price_range}</Text>
                </View>
              </View>
            )}

            {/* Area Type */}
            {area_type && (
              <View className="flex-row items-center gap-3">
                <Icon name="home-outline" size={20} color={colors.grey} />
                <View className="flex-1">
                  <Text variant="body">{area_type}</Text>
                </View>
              </View>
            )}

            {/* Opening Hours */}
            {opening_hours && (
              <View className="flex-row items-center gap-3">
                <Icon name="clock-outline" size={20} color={colors.grey} />
                <View className="flex-1">
                  <Text variant="body">{opening_hours}</Text>
                </View>
              </View>
            )}

            {/* Website */}
            {website_url && website_url !== '#' && (
              <View className="flex-row items-center gap-3">
                <Icon name="web" size={20} color={colors.grey} />
                <View className="flex-1">
                  <Text variant="subhead" className="font-medium">
                    Site web
                  </Text>
                  <Text variant="body" className="text-primary" onPress={handleWebsitePress}>
                    Visiter le site
                  </Text>
                </View>
              </View>
            )}

            {/* Address */}
            {address && (
              <>
                <View className="flex-row items-center gap-3">
                  <Icon name="map-marker-outline" size={20} color={colors.grey} />
                  <View className="flex-1">
                    <Text variant="body">{address}</Text>
                  </View>
                </View>

              <View className='gap-2'>
                <Button onPress={copyToClipboard}>
                  <Text>Copier l’adresse</Text>
                </Button>

                {/* add a Button open on Waze mobile app */}
                <Button
                  onPress={() => {
                    Linking.openURL(`https://waze.com/ul?q=${encodeURIComponent(address)}`);
                  }}
                  variant="tonal">
                  <Text>Ouvrir Waze</Text>
                </Button>
                </View>
              </>
            )}

          </View>
        </View>
      </ScrollView>
    </>
  );
}
