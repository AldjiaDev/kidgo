import { Linking, View } from 'react-native';
import { Icon } from '@roninoss/icons';

import { ClipboardButton } from '~/components/ClipboardButton';
import { Text } from '~/components/nativewindui/Text';
import { WazeButton } from '~/components/WazeButton';
import { useColorScheme } from '~/lib/useColorScheme';
import { getCategoryInfo } from '~/utils/categoryFormatter';
import { Tables } from '~/utils/database.types';
import { parseArrayToString } from '~/utils/parseArrayToString';

interface PlaceDetailsProps {
  data: Tables<'places'>;
}

export function PlaceDetails({ data }: PlaceDetailsProps) {
  const { colors } = useColorScheme();
  const {
    name,
    description,
    address,
    category,
    area_type,
    price_range,
    opening_hours,
    website_url,
  } = data;

  function handleWebsitePress() {
    if (website_url && website_url !== '#') {
      Linking.openURL(parseArrayToString(website_url));
    }
  }

  return (
    <View className="gap-6">
      {/* Header Section */}
      <View className="flex-row items-center gap-3">
        <Text variant="heading">{getCategoryInfo(category).emoji}</Text>
        <View className="flex-1">
          <Text variant="heading" numberOfLines={2}>
            {name}
          </Text>
          <Text variant="subhead" className="text-muted-foreground">
            {category || 'Activité'}
          </Text>
        </View>
      </View>

      {description && <Text variant="body">{description}</Text>}

      <View className="gap-4">
        {price_range && (
          <View className="flex-row items-center gap-3">
            <Icon name="cart-outline" size={20} color={colors.grey} />

            <Text variant="callout" className="text-muted-foreground">
              {price_range}
            </Text>
          </View>
        )}

        {area_type && (
          <View className="flex-row items-center gap-3">
            <Icon name="home-outline" size={20} color={colors.grey} />

            <Text variant="callout" className="text-muted-foreground">
              {area_type}
            </Text>
          </View>
        )}

        {opening_hours && (
          <View className="flex-row items-center gap-3">
            <Icon name="clock-outline" size={20} color={colors.grey} />

            <Text variant="callout" className="text-muted-foreground">
              {opening_hours}
            </Text>
          </View>
        )}

        {website_url && website_url !== '#' && (
          <View className="flex-row items-center gap-3">
            <Icon name="web" size={20} color={colors.grey} />
            <View className="flex-1">
              <Text variant="callout" className="text-muted-foreground">
                Site web
              </Text>
              <Text variant="body" className="text-primary" onPress={handleWebsitePress}>
                Visiter {website_url}
              </Text>
            </View>
          </View>
        )}

        {address && (
          <>
            <View className="flex-row items-center gap-3">
              <Icon name="map-marker-outline" size={20} color={colors.grey} />
              <View className="flex-1">
                <Text variant="callout" className="text-muted-foreground" selectable>
                  {address}
                </Text>
              </View>
            </View>

            <View className="gap-2">
              <ClipboardButton address={address} />
              <WazeButton address={address} />
            </View>
          </>
        )}
      </View>
    </View>
  );
}
