import { Button, ButtonProps, DynamicColorIOS } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';

import { DEFAULT_STACK_HEADER } from '~/app/(home)/_layout';
import { Avatar, AvatarFallback } from '~/components/nativewindui/Avatar';
import { Text } from '~/components/nativewindui/Text';
export const unstable_settings = {
  anchor: 'index',
};

export { ErrorBoundary } from 'expo-router';

export function HeaderButton(props: ButtonProps) {
  return (
    <Button
      color={DynamicColorIOS({
        dark: 'white',
        light: 'black',
      })}
      {...props}
    />
  );
}

export function HeaderAvatar() {
  return (
    <Link href="/(home)/settings">
      <Avatar alt={'KGO'}>
        <AvatarFallback>
          <Text className="text-foreground">KGO</Text>
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}

export default function TabLayout() {
  const router = useRouter();

  return (
    <Stack screenOptions={DEFAULT_STACK_HEADER}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Découvrir',
          headerLargeTitle: true,
          headerLeft: () => <HeaderAvatar />,
          headerRight: () => (
            <HeaderButton title="Carte" onPress={() => router.navigate('/(discover)/map')} />
          ),
        }}
      />
      <Stack.Screen name="map" options={{ title: '', headerTransparent: true }} />
      <Stack.Screen
        name="[category]"
        options={({ route }) => ({
          title: (route.params as any)?.category || 'Catégorie',
          headerShown: true,
          headerTransparent: true,
          headerBlurEffect: 'systemChromeMaterial',
          headerShadowVisible: true,
          headerLargeTitleShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: 'transparent',
          },
        })}
      />
      <Stack.Screen name="settings" options={{ title: 'Settings', headerTransparent: true }} />
    </Stack>
  );
}
