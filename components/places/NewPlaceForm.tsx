import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as Location from 'expo-location';
import { toast } from 'sonner-native';

import { Button } from '~/components/nativewindui/Button';
import { useSheetRef } from '~/components/nativewindui/Sheet';
import { Text } from '~/components/nativewindui/Text';
import { TextField } from '~/components/nativewindui/TextField/TextField';
import { CategoriesBottomSheet } from '~/components/places/CategoriesBottomSheet';
import { PriceRangeBottomSheet } from '~/components/places/PriceRangeBottomSheet';
import { PressableInput } from '~/components/PressableInput';
import { addPlace } from '~/utils/supabase-legend';

interface NewPlaceFormProps {
  onSubmit: () => void;
  onCancel: () => void;

  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  location: Location.LocationObject | null;
  setPriceOnChange: (fn: (value: string) => void) => void;
  setCategoryOnChange: (fn: (value: string) => void) => void;
}

interface FormData {
  name: string;
  category: string;
  description: string;
  address: string;
  price_range: string;
}

export function NewPlaceForm({
  onSubmit,
  onCancel,
  isSubmitting,
  setIsSubmitting,
  location,
}: NewPlaceFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      category: '',
      description: '',
      address: '',
      price_range: '',
    },
    mode: 'onChange',
  });

  const onSubmitForm = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      addPlace({
        name: data.name.trim(),
        category: data.category.trim() || undefined,
        description: data.description.trim() || undefined,
        address: data.address.trim() || undefined,
        price_range: data.price_range.trim() || undefined,
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      });

      // Reset form
      reset();
      onSubmit?.();
      toast.success('Lieu ajouté ! Notre équipe va vérifier les informations.');
    } catch {
      // Handle error silently - Legend State will retry automatically
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoriesSheetRef = useSheetRef();
  const priceRangeSheetRef = useSheetRef();

  function openCategoriesSheet() {
    categoriesSheetRef.current?.present();
  }

  function openPriceRangeSheet() {
    priceRangeSheetRef.current?.present();
  }

  return (
    <View className="flex-1 p-4">
      <Controller
        control={control}
        name="name"
        rules={{
          required: 'Le nom du lieu est obligatoire',
          minLength: {
            value: 2,
            message: 'Le nom doit contenir au moins 2 caractères',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Nom du lieu *"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Nom du lieu"
            className="mb-4"
            editable={!isSubmitting}
            errorMessage={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Description"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Décrivez ce lieu..."
            multiline
            numberOfLines={3}
            className="mb-6"
            editable={!isSubmitting}
            errorMessage={errors.description?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <PressableInput
            label="Catégorie"
            value={value}
            placeholder="Sélectionnez une catégorie..."
            onPress={openCategoriesSheet}
            disabled={isSubmitting}
            errorMessage={errors.category?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="price_range"
        render={({ field: { onChange, value } }) => (
          <PressableInput
            label="Prix"
            value={value}
            placeholder="Sélectionnez une gamme de prix..."
            onPress={openPriceRangeSheet}
            disabled={isSubmitting}
            errorMessage={errors.price_range?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="address"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Adresse"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Adresse complète"
            className="mb-4"
            editable={!isSubmitting}
            errorMessage={errors.address?.message}
          />
        )}
      />

      <View className="flex-row gap-3">
        <Button variant="secondary" onPress={onCancel} className="flex-1" disabled={isSubmitting}>
          <Text>Annuler</Text>
        </Button>

        <Button
          onPress={handleSubmit(onSubmitForm)}
          className="flex-1"
          disabled={!isValid || isSubmitting}>
          <Text>{isSubmitting ? 'Ajout...' : 'Ajouter'}</Text>
        </Button>
      </View>

      <CategoriesBottomSheet
        ref={categoriesSheetRef}
        onItemPress={(category: string) => {
          console.log('🚀 ~ NewPlaceForm ~ category:', category);
        }}
      />
      <PriceRangeBottomSheet
        ref={priceRangeSheetRef}
        onItemPress={(price: string) => {
          console.log('🚀 ~ NewPlaceForm ~ price:', price);
        }}
      />
    </View>
  );
}
