import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
};
