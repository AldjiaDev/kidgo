import { Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { toast } from 'sonner-native';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { parseArrayToString } from '~/utils/parseArrayToString';

type AppleMapsButtonProps = {
  address?: string | string[];
  lat?: number;
  lng?: number;
  children?: React.ReactNode;
};

async function openAppleMaps({
  address,
  lat,
  lng,
}: {
  address?: string | string[];
  lat?: number;
  lng?: number;
}) {
  let appleMapsUrl = '';
  let fallbackUrl = '';

  if (address) {
    const addressStr = parseArrayToString(address);
    const encodedAddress = encodeURIComponent(addressStr);
    appleMapsUrl = `maps://?q=${encodedAddress}`;
    fallbackUrl = `https://maps.apple.com/?q=${encodedAddress}`;
  } else if (lat && lng) {
    appleMapsUrl = `maps://?ll=${lat},${lng}`;
    fallbackUrl = `https://maps.apple.com/?ll=${lat},${lng}`;
  } else {
    console.warn('Aucune adresse ou coordonnées fournies pour Apple Maps.');
    toast.error("Impossible d'ouvrir Apple Maps : adresse ou coordonnées manquantes.");
    return;
  }

  try {
    const supported = await Linking.canOpenURL(appleMapsUrl);
    if (supported) {
      await Linking.openURL(appleMapsUrl);
    } else {
      await Linking.openURL(fallbackUrl);
    }
  } catch {
    Alert.alert(
      'Erreur',
      "Impossible d'ouvrir Apple Maps. Assurez-vous que l'application est installée.",
      [{ text: 'OK', style: 'default' }]
    );
  }
}

export function AppleMapsButton({ address, lat, lng, children }: AppleMapsButtonProps) {
  return (
    <Button
      variant="tonal"
      onPress={() => openAppleMaps({ address, lat, lng })}
      className="flex-row items-center gap-2">
      <Text>Ouvrir Apple Maps</Text>
      {children}
    </Button>
  );
}
