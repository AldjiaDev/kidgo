import * as Clipboard from 'expo-clipboard';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';

interface ClipboardButtonProps {
  address: string | string[];
}

export function ClipboardButton({ address }: ClipboardButtonProps) {
  async function copyToClipboard() {
    await Clipboard.setStringAsync(Array.isArray(address) ? address.join(', ') : address);
  }

  return (
    <Button onPress={copyToClipboard}>
      <Text>Copier l’adresse</Text>
    </Button>
  );
}
