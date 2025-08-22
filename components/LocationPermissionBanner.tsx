import { View } from 'react-native';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { useLocation } from '~/contexts/LocationContext';

export function LocationPermissionBanner() {
  const { hasPermission, isLoading, requestPermission } = useLocation();

  if (hasPermission) {
    return null;
  }

  return (
    <View className="absolute left-4 right-4 top-20 z-10 rounded-lg bg-card p-4 shadow-sm">
      <View className="gap-3">
        <View className="flex-row items-center gap-2">
          <Text style={{ fontSize: 20 }}>📍</Text>
          <Text variant="subhead" className="flex-1 font-semibold">
            Localisation
          </Text>
        </View>
        <Text variant="caption1" className="text-muted-foreground">
          Autorisez la localisation pour voir les activités près de chez vous et calculer les
          distances.
        </Text>
        <Button
          variant="primary"
          size="sm"
          onPress={requestPermission}
          disabled={isLoading}
          className="self-start">
          <Text variant="caption1" className="text-primary-foreground">
            {isLoading ? 'Chargement...' : 'Autoriser la localisation'}
          </Text>
        </Button>
      </View>
    </View>
  );
}
