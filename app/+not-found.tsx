import { View } from 'react-native';
import { Link } from 'expo-router';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';

export default function NotFoundScreen() {
  return (
    <>
      {/* <Stack.Screen options={{ title: 'Oops!' }} /> */}
      <View className="flex-1 items-center justify-center bg-background p-5">
        <Text variant="largeTitle">{"This screen doesn't exist."}</Text>

        <Link href="/" className="m-4 py-4" asChild>
          <Button>
            <Text>Go to home screen</Text>
          </Button>
        </Link>
      </View>
    </>
  );
}
