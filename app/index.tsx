import { Redirect } from 'expo-router';

export default function IndexScreen() {
  // fix the inintial load that lands on `/` and redirects to `/customization`
  return <Redirect href="/(home)" />;
}
