import { ScrollView, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { router } from 'expo-router';

import { AddPlaceForm } from '~/components/AddPlaceForm';
import { Text } from '~/components/nativewindui/Text';
import { BodyScrollView } from '~/components/ui/BodyScrollView';

export default function NewPlaceScreen() {
  function handlePlaceAdded(data) {
    console.log('🚀 ~ handlePlaceAdded ~ data:', data);
  }

  function handleCancel() {
    router.back();
  }

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} className="flex-1">
      <BodyScrollView
        contentContainerStyle={{
          paddingVertical: 16,
          gap: 2,
        }}>
        <AddPlaceForm onSubmit={handlePlaceAdded} onCancel={handleCancel} />
      </BodyScrollView>
    </KeyboardAvoidingView>
  );
}
