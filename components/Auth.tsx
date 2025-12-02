import { useState } from 'react';
import { Alert, View } from 'react-native';

import { Button } from '@/components/nativewindui/Button';
import { Text } from '@/components/nativewindui/Text';
import { TextField } from '@/components/nativewindui/TextField/TextField';
import { Checkbox } from '@/components/ui/checkbox';
import { HStack } from '@/components/ui/Views';
import { supabase } from '@/utils/supabase-legend';

export function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisble, setIsVisble] = useState(true);
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Vérifiez votre email pour confirmer votre compte.');
    setLoading(false);
  }

  function toggleSecureText() {
    setIsVisble((prev) => !prev);
  }

  return (
    <View className="mt-10 p-3">
      <View className="mb-5 w-full py-1">
        <TextField
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
        />
      </View>
      <View className="w-full py-1">
        <TextField
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="********"
          secureTextEntry={isVisble}
        />
        <HStack className="align-center">
          <Checkbox checked={!isVisble} onCheckedChange={toggleSecureText} className="mr-1 mt-1" />
          <Text className="text-muted" onPress={toggleSecureText}>
            {!isVisble ? 'Masquer' : 'Afficher'} le mot de passe
          </Text>
        </HStack>
      </View>
      <View className="mt-5 w-full py-1">
        <Button
          disabled={loading}
          onPress={() => {
            signUpWithEmail();
          }}>
          <Text>Créer un compte</Text>
        </Button>
      </View>
      <View className="w-full py-1">
        <Button
          disabled={loading}
          onPress={() => {
            signInWithEmail();
          }}
          variant="tonal">
          <Text>Se connecter</Text>
        </Button>
      </View>
    </View>
  );
}
