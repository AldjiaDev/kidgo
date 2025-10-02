import { Alert } from 'react-native';
import * as Device from 'expo-device';
import * as Linking from 'expo-linking';
import { toast } from 'sonner-native';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { parseArrayToString } from '~/utils/parse-array-to-string';

type WazeButtonProps = {
  address?: string | string[];
  lat?: number;
  lng?: number;
  children?: React.ReactNode;
};

async function openWaze({
  address,
  lat,
  lng,
}: {
  address?: string | string[];
  lat?: number;
  lng?: number;
}) {
  // Check if running on simulator
  const isSimulator = !Device.isDevice;

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
    console.warn('Aucune adresse ou coordonnées fournies pour Waze.');
    toast.error("Impossible d'ouvrir Waze : adresse ou coordonnées manquantes.");
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
}

export function WazeButton({ address, lat, lng, children }: WazeButtonProps) {
  return (
    <Button
      variant="tonal"
      onPress={() => openWaze({ address, lat, lng })}
      className="flex-row items-center gap-2">
      <Text>Ouvrir Waze</Text>
      {children}
    </Button>
  );
}
