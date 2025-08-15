import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Input } from '@rneui/themed';
import { Session } from '@supabase/supabase-js';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
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
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Nom d'utilisateur"
          value={username || ''}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          onPress={() => updateProfile({ username, avatar_url: avatarUrl })}
          disabled={loading}>
          <Text>{loading ? 'Chargement ...' : 'Mettre à jour'}</Text>
        </Button>
      </View>

      <View style={styles.verticallySpaced}>
        <Button onPress={() => supabase.auth.signOut()} variant="tonal">
          <Text>Se déconnecter</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  mt20: {
    marginTop: 20,
  },
  verticallySpaced: {
    alignSelf: 'stretch',
    paddingBottom: 4,
    paddingTop: 4,
  },
});
