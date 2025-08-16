import { Linking, Platform, ScrollView, View } from 'react-native';
import { Icon } from '@roninoss/icons';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

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

  const handleWebsitePress = () => {
    if (website_url && website_url !== '#') {
      Linking.openURL(website_url);
    }
  };

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
              <Text variant="subhead" color="secondary">
                {category}
              </Text>
            </View>
          </View>

          {/* Description */}
          {description && (
            <View className="gap-2">
              <Text variant="heading" className="font-semibold">
                Description
              </Text>
              <Text variant="body" color="secondary">
                {description}
              </Text>
            </View>
          )}

          {/* Details Section */}
          <View className="gap-4">
            <Text variant="heading" className="font-semibold">
              Informations
            </Text>

            {/* Address */}
            {address && (
              <View className="flex-row gap-3">
                <Icon name="map-marker-outline" size={20} color={colors.grey} />
                <View className="flex-1">
                  <Text variant="body" color="secondary">
                    {address}
                  </Text>
                </View>
              </View>
            )}

            {/* Price Range */}
            {price_range && (
              <View className="flex-row gap-3">
                <Icon name="cart-outline" size={20} color={colors.grey} />
                <View className="flex-1">
                  <Text variant="body" color="secondary">
                    {price_range}
                  </Text>
                </View>
              </View>
            )}

            {/* Opening Hours */}
            {opening_hours && (
              <View className="flex-row gap-3">
                <Icon name="clock-outline" size={20} color={colors.grey} />
                <View className="flex-1">
                  <Text variant="body" color="secondary">
                    {opening_hours}
                  </Text>
                </View>
              </View>
            )}

            {/* Area Type */}
            {area_type && (
              <View className="flex-row gap-3">
                <Icon name="home-outline" size={20} color={colors.grey} />
                <View className="flex-1">
                  <Text variant="body" color="secondary">
                    {area_type}
                  </Text>
                </View>
              </View>
            )}

            {/* Website */}
            {website_url && website_url !== '#' && (
              <View className="flex-row gap-3">
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
          </View>
        </View>
      </ScrollView>
    </>
  );
}
