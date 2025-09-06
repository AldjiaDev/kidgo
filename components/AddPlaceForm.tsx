import { useState } from 'react';
import { View } from 'react-native';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { TextField } from '~/components/nativewindui/TextField/TextField';
import { useLocation } from '~/contexts/LocationContext';
import { addPlace } from '~/utils/supabase-legend';

interface AddPlaceFormProps {
  onSubmit?: () => void;
  onCancel?: () => void;
}

export function AddPlaceForm({ onSubmit, onCancel }: AddPlaceFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { location } = useLocation();

  const handleSubmit = () => {
    if (!name.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      addPlace({
        name: name.trim(),
        category: category.trim() || undefined,
        description: description.trim() || undefined,
        address: address.trim() || undefined,
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      });

      // Reset form
      setName('');
      setCategory('');
      setDescription('');
      setAddress('');

      onSubmit?.();
    } catch (error) {
      // Handle error silently - Legend State will retry automatically
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="mb-4 text-2xl font-bold">Ajouter un lieu</Text>

      <TextField
        label="Nom du lieu *"
        value={name}
        onChangeText={setName}
        placeholder="Nom du lieu"
        className="mb-4"
        editable={!isSubmitting}
      />

      <TextField
        label="Catégorie"
        value={category}
        onChangeText={setCategory}
        placeholder="ex: Parc, Musée, Restaurant..."
        className="mb-4"
        editable={!isSubmitting}
      />

      <TextField
        label="Adresse"
        value={address}
        onChangeText={setAddress}
        placeholder="Adresse complète"
        className="mb-4"
        editable={!isSubmitting}
      />

      <TextField
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="Décrivez ce lieu..."
        multiline
        numberOfLines={3}
        className="mb-6"
        editable={!isSubmitting}
      />

      <View className="flex-row gap-3">
        <Button variant="secondary" onPress={onCancel} className="flex-1" disabled={isSubmitting}>
          <Text>Annuler</Text>
        </Button>

        <Button onPress={handleSubmit} className="flex-1" disabled={!name.trim() || isSubmitting}>
          <Text>{isSubmitting ? 'Ajout...' : 'Ajouter'}</Text>
        </Button>
      </View>
    </View>
  );
}
