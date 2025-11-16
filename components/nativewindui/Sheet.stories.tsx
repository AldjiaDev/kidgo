import { View } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { Button } from '~/components/nativewindui/Button';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import { Text } from '~/components/nativewindui/Text';

export default {
  title: 'Sheet',
  component: Sheet,
};

export const Default = () => {
  const bottomSheetModalRef = useSheetRef();

  function openSheet() {
    bottomSheetModalRef.current?.present();
  }

  return (
    <View>
      <Button onPress={openSheet}>
        <Text>Open Sheet</Text>
      </Button>
      <Sheet ref={bottomSheetModalRef} snapPoints={['75%']}>
        <BottomSheetScrollView>
          <Text variant="title1">Hello</Text>
        </BottomSheetScrollView>
      </Sheet>
    </View>
  );
};
