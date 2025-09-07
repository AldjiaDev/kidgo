import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, View } from 'react-native';
import { toast } from 'sonner-native';

import { Button } from '~/components/nativewindui/Button';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import { Text } from '~/components/nativewindui/Text';
import { TextField } from '~/components/nativewindui/TextField/TextField';
import { useLocation } from '~/contexts/LocationContext';
import { addPlace } from '~/utils/supabase-legend';

const CATEGORIES = [
  'Accrobranche',
  'Arène',
  'Bibliothèque',
  'Bowling',
  'Centre aquatique',
  'Centre commercial',
  'Centre culturel',
  'Centre de sciences',
  'Château',
  'Cinéma',
  'Église',
  'Escape game',
  'Ferme',
  'Hippodrome',
  'Jardin',
  'Jardin botanique',
  'Karting',
  'Lac',
  'Laser game',
  'Librairie',
  'Marché',
  'Mini golf',
  'Musée',
  'Opéra',
  'Parc',
  "Parc d'attractions",
  'Parc de loisirs',
  'Parc de trampolines',
  'Patinoire',
  'Piscine',
  'Place',
  'Quartier',
  'Site historique',
  'Théâtre',
  'Zoo',
];

const PRICE_RANGES = ['Gratuit', '€', '€€', '€€€'];

interface AddPlaceFormProps {
  onSubmit?: () => void;
  onCancel?: () => void;
}

interface FormData {
  name: string;
  category: string;
  description: string;
  address: string;
  price_range: string;
}

export function AddPlaceForm({ onSubmit, onCancel }: AddPlaceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryOnChange, setCategoryOnChange] = useState<((value: string) => void) | null>(null);
  const [priceOnChange, setPriceOnChange] = useState<((value: string) => void) | null>(null);
  const { location } = useLocation();
  const categorySheetRef = useSheetRef();
  const priceSheetRef = useSheetRef();

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

  return (
    <View className="flex-1 p-4">
      <Text className="mb-4 text-2xl font-bold">Ajouter un lieu</Text>

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
        render={({ field: { onChange, value } }) => {
          // Store the onChange function for use in the sheet
          if (categoryOnChange !== onChange) {
            setCategoryOnChange(() => onChange);
          }

          return (
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-foreground">Catégorie</Text>
              <Pressable
                onPress={() => categorySheetRef.current?.present()}
                className="rounded-md border border-input bg-background px-3 py-3"
                disabled={isSubmitting}>
                <Text className={value ? 'text-foreground' : 'text-muted-foreground'}>
                  {value || 'Sélectionnez une catégorie...'}
                </Text>
              </Pressable>
              {errors.category && (
                <Text className="mt-1 text-sm text-destructive">{errors.category.message}</Text>
              )}
            </View>
          );
        }}
      />

      <Controller
        control={control}
        name="price_range"
        render={({ field: { onChange, value } }) => {
          // Store the onChange function for use in the sheet
          if (priceOnChange !== onChange) {
            setPriceOnChange(() => onChange);
          }

          return (
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-foreground">Prix</Text>
              <Pressable
                onPress={() => priceSheetRef.current?.present()}
                className="rounded-md border border-input bg-background px-3 py-3"
                disabled={isSubmitting}>
                <Text className={value ? 'text-foreground' : 'text-muted-foreground'}>
                  {value || 'Sélectionnez une gamme de prix...'}
                </Text>
              </Pressable>
              {errors.price_range && (
                <Text className="mt-1 text-sm text-destructive">{errors.price_range.message}</Text>
              )}
            </View>
          );
        }}
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

      {/* Category Selection Sheet */}
      <Sheet ref={categorySheetRef} snapPoints={['50%']}>
        <View className="flex-1 p-4">
          <Text className="mb-4 text-lg font-semibold">Sélectionnez une catégorie</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                onPress={() => {
                  categoryOnChange?.(category);
                  categorySheetRef.current?.dismiss();
                }}
                className="border-b border-border py-3">
                <Text className="text-foreground">{category}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Sheet>

      {/* Price Selection Sheet */}
      <Sheet ref={priceSheetRef} snapPoints={['40%']}>
        <View className="flex-1 p-4">
          <Text className="mb-4 text-lg font-semibold">Sélectionnez une gamme de prix</Text>
          {PRICE_RANGES.map((price) => (
            <Pressable
              key={price}
              onPress={() => {
                priceOnChange?.(price);
                priceSheetRef.current?.dismiss();
              }}
              className="border-b border-border py-3">
              <Text className="text-foreground">{price}</Text>
            </Pressable>
          ))}
        </View>
      </Sheet>
    </View>
  );
}
