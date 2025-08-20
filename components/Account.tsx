import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Session } from '@supabase/supabase-js';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { TextField } from '~/components/nativewindui/TextField/TextField';
import { supabase } from '~/utils/supabase-legend';

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, avatar_url }: { username: string; avatar_url: string }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="mt-10 p-3">
      <View className="mt-5 self-stretch py-1">
        <TextField label="Email" value={session?.user?.email} disabled />
      </View>
      <View className="self-stretch py-1">
        <TextField
          label="Nom d'utilisateur"
          value={username || ''}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View className="mt-5 self-stretch py-1">
        <Button
          onPress={() => updateProfile({ username, avatar_url: avatarUrl })}
          disabled={loading}>
          <Text>{loading ? 'Chargement ...' : 'Mettre à jour'}</Text>
        </Button>
      </View>

      <View className="self-stretch py-1">
        <Button onPress={() => supabase.auth.signOut()} variant="tonal">
          <Text>Se déconnecter</Text>
        </Button>
      </View>
    </View>
  );
}
