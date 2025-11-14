import { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { router } from 'expo-router';

import { NewPlaceForm } from '~/components/places/NewPlaceForm';
import { BodyScrollView } from '~/components/ui/BodyScrollView';
import { useLocation } from '~/contexts/LocationContext';

export default function NewPlaceScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryOnChange, setCategoryOnChange] = useState<((value: string) => void) | null>(null);
  const { location } = useLocation();

  function handlePlaceAdded(data) {
    console.log('🚀 ~ handlePlaceAdded ~ data:', data);
  }

  function handleCancel() {
    router.back();
  }

  return (
    <KeyboardAvoidingView className="flex-1">
      <BodyScrollView
        contentContainerStyle={{
          paddingVertical: 16,
          gap: 2,
        }}>
        <NewPlaceForm
          onSubmit={handlePlaceAdded}
          onCancel={handleCancel}
          categoryOnChange={categoryOnChange}
          setCategoryOnChange={setCategoryOnChange}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          location={location}
        />
      </BodyScrollView>
    </KeyboardAvoidingView>
  );
}
