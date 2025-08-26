import { Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { parseArrayToString } from '~/utils/parseArrayToString';

type WazeButtonProps = {
  address?: string | string[];
  lat?: number;
  lng?: number;
  children?: React.ReactNode;
};

function openWaze({
  address,
  lat,
  lng,
}: {
  address?: string | string[];
  lat?: number;
  lng?: number;
}) {
  return async function () {
    // Check if running on simulator
    const isSimulator = !Constants.isDevice;

    if (isSimulator) {
      Alert.alert(
        'Simulateur détecté',
        'La fonctionnalité Waze ne fonctionne pas sur le simulateur. Veuillez tester sur un appareil physique.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    let wazeUrl = '';
    let fallbackUrl = '';

    if (address) {
      const addressStr = parseArrayToString(address);
      const encodedAddress = encodeURIComponent(addressStr);
      wazeUrl = `waze://?q=${encodedAddress}`;
      fallbackUrl = `https://waze.com/ul?q=${encodedAddress}`;
    } else if (lat && lng) {
      wazeUrl = `waze://?ll=${lat},${lng}&navigate=yes`;
      fallbackUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
    } else {
      // @todo add a toast here
      // Optionally show a toast or alert here
      return;
    }

    try {
      const supported = await Linking.canOpenURL(wazeUrl);
      if (supported) {
        await Linking.openURL(wazeUrl);
      } else {
        await Linking.openURL(fallbackUrl);
      }
    } catch {
      Alert.alert(
        'Erreur',
        "Impossible d'ouvrir Waze. Assurez-vous que l'application est installée.",
        [{ text: 'OK', style: 'default' }]
      );
    }
  };
}

export function WazeButton({ address, lat, lng, children }: WazeButtonProps) {
  return (
    <Button
      variant="tonal"
      onPress={openWaze({ address, lat, lng })}
      className="flex-row items-center gap-2">
      <Text>Ouvrir Waze</Text>
      {children}
    </Button>
  );
}
