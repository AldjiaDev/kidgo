import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import { toast } from 'sonner-native';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { TextField } from '~/components/nativewindui/TextField/TextField';
import { BodyScrollView } from '~/components/ui/BodyScrollView';
import { useAuth } from '~/hooks/useAuth';

interface FeedbackFormData {
  category: string;
  message: string;
}

const FEEDBACK_CATEGORIES = [
  "Amélioration de l'application",
  'Problème technique',
  'Nouveau lieu à ajouter',
  'Lieu incorrect',
  'Suggestion générale',
  'Autre',
];

export default function FeedbackScreen() {
  const { session } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FeedbackFormData>({
    defaultValues: {
      category: '',
      message: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: FeedbackFormData) => {
    try {
      setIsSubmitting(true);

      Alert.alert('Feedback reçu', "Merci pour votre retour ! Nous l'examinerons attentivement.", [
        {
          text: 'OK',
          onPress: () => {
            reset();
            toast.success('Feedback envoyé avec succès');
          },
        },
      ]);
    } catch {
      toast.error("Erreur lors de l'envoi du feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingVertical: 16,
        paddingHorizontal: 16,
        gap: 16,
      }}>
      <View className="gap-4">
        <Text variant="title2" className="font-semibold">
          Votre avis nous intéresse
        </Text>
        <Text variant="body" className="text-muted-foreground">
          Partagez vos idées, signalez des problèmes ou suggérez des améliorations pour rendre KidGo
          encore meilleur.
        </Text>
      </View>

      <View className="gap-4">
        <Controller
          control={control}
          name="category"
          rules={{ required: 'Veuillez sélectionner une catégorie' }}
          render={({ field: { onChange, value } }) => (
            <View>
              <Text variant="footnote" className="mb-2 font-medium">
                Catégorie *
              </Text>
              <View className="gap-2">
                {FEEDBACK_CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    variant={value === category ? 'default' : 'tonal'}
                    onPress={() => onChange(category)}
                    className="justify-start">
                    <Text>{category}</Text>
                  </Button>
                ))}
              </View>
              {errors.category && (
                <Text variant="caption1" className="mt-1 text-destructive">
                  {errors.category.message}
                </Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="message"
          rules={{
            required: 'Veuillez entrer votre message',
            minLength: { value: 10, message: 'Le message doit contenir au moins 10 caractères' },
          }}
          render={({ field: { onChange, value } }) => (
            <View>
              <TextField
                label="Votre message *"
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={6}
                placeholder="Décrivez votre feedback en détail..."
                error={errors.message?.message}
              />
            </View>
          )}
        />

        {session?.user && (
          <View className="rounded-lg bg-muted p-3">
            <Text variant="caption1" className="text-muted-foreground">
              Envoyé depuis le compte: {session.user.email}
            </Text>
          </View>
        )}

        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isSubmitting}
          className="mt-4">
          <Text>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le feedback'}</Text>
        </Button>
      </View>
    </BodyScrollView>
  );
}
