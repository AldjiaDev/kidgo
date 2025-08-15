import React, { useState } from 'react';
import { Alert, AppState, View } from 'react-native';
import { Input } from '@rneui/themed';

import { supabase } from '../lib/supabase';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

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
            signInWithEmail();
          }}
          variant="tonal">
          <Text>Se connecter</Text>
        </Button>
      </View>
      <View className="w-full py-1">
        <Button
          disabled={loading}
          onPress={() => {
            signUpWithEmail();
          }}>
          <Text>Créer un compte</Text>
        </Button>
      </View>
    </View>
  );
}
