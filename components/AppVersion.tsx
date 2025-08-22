import * as Application from 'expo-application';
import * as Updates from 'expo-updates';

import { Text } from '~/components/nativewindui/Text';

interface AppVersionProps {
  className?: string;
}

export function AppVersion({ className }: AppVersionProps) {
  const version = Application.nativeApplicationVersion || '1.0.0';
  const buildNumber = Application.nativeBuildVersion || '1';
  const updateId = Updates.updateId;

  const displayVersion = updateId
    ? `v${version}.${buildNumber}+${updateId.slice(0, 8)}`
    : `v${version}.${buildNumber}`;

  return (
    <Text variant="caption1" className={`py-4 text-muted-foreground ${className || ''}`}>
      {displayVersion}
    </Text>
  );
}
