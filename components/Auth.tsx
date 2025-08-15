import { useState } from 'react';
import { Alert, View } from 'react-native';
import { Input } from '@rneui/themed';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { supabase } from '~/utils/supabase-legend';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  return (
    <View className="mt-10 p-3">
      <View className="mb-5 w-full py-1">
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View className="w-full py-1">
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
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
