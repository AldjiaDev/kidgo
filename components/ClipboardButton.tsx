import * as Clipboard from 'expo-clipboard';
import { toast } from 'sonner-native';

import { Button } from '@/components/nativewindui/Button';
import { Text } from '@/components/nativewindui/Text';
import { parseArrayToString } from '@/utils/parse-array-to-string';

interface ClipboardButtonProps {
  address: string | string[];
}

export function ClipboardButton({ address }: ClipboardButtonProps) {
  async function copyToClipboard() {
    await Clipboard.setStringAsync(parseArrayToString(address));
    toast.success('Adresse copiée dans le presse-papiers');
  }

  return (
    <Button onPress={copyToClipboard}>
      <Text>Copier l’adresse</Text>
    </Button>
  );
}
