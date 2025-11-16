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
  setPriceOnChange?: (fn: (value: string) => void) => void;
  setCategoryOnChange?: (fn: (value: string) => void) => void;
}

export interface NewPlaceFormData {
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
    setValue,
    formState: { errors, isValid },
  } = useForm<NewPlaceFormData>({
    defaultValues: {
      name: '',
      category: '',
      description: '',
      address: '',
      price_range: '',
    },
    mode: 'onChange',
  });

  const onSubmitForm = async function (data: NewPlaceFormData) {
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
    console.log('🚀 ~ openCategoriesSheet ~ categoriesSheetRef:', categoriesSheetRef);
    console.log(
      '🚀 ~ openCategoriesSheet ~ categoriesSheetRef.current:',
      categoriesSheetRef.current
    );
    categoriesSheetRef.current?.present();
  }

  function openPriceRangeSheet() {
    console.log('🚀 ~ openPriceRangeSheet ~ priceRangeSheetRef:', priceRangeSheetRef);
    console.log(
      '🚀 ~ openPriceRangeSheet ~ priceRangeSheetRef.current:',
      priceRangeSheetRef.current
    );
    priceRangeSheetRef.current?.present();
  }

  function handleCategorySelect(category: string) {
    console.log('🚀 ~ NewPlaceForm ~ category:', category);
    setValue('category', category, { shouldValidate: true });
    categoriesSheetRef.current?.dismiss();
  }

  function handlePriceRangeSelect(price: string) {
    console.log('🚀 ~ NewPlaceForm ~ price:', price);
    setValue('price_range', price, { shouldValidate: true });
    priceRangeSheetRef.current?.dismiss();
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
        render={({ field: { value } }) => (
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
        render={({ field: { value } }) => (
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

      <CategoriesBottomSheet ref={categoriesSheetRef} onItemPress={handleCategorySelect} />
      <PriceRangeBottomSheet ref={priceRangeSheetRef} onItemPress={handlePriceRangeSelect} />
    </View>
  );
}
