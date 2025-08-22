import { Text, View } from 'react-native';

import { BodyScrollView } from '~/components/ui/BodyScrollView';
import { categoryMap } from '~/utils/categoryFormatter';

export default function PlaygroundCategories() {
  //render all categories
  const categories = Object.keys(categoryMap);

  return (
    <BodyScrollView>
      <Text>Playground Categories</Text>
      {categories.map((category) => (
        <View
          key={category}
          className={`h-12 w-12 items-center justify-center rounded-lg ${categoryMap[category].backgroundColor}`}>
          <Text
            style={{
              fontSize: 20,
              lineHeight: 28,
            }}>
            {categoryMap[category].emoji}
          </Text>
        </View>
      ))}

      <Text className="bg-amber-100 dark:bg-amber-900">bg-amber-100 dark:bg-amber-900</Text>
      <Text className="bg-blue-100 dark:bg-blue-900">bg-blue-100 dark:bg-blue-900</Text>
      <Text className="bg-cyan-100 dark:bg-cyan-900">bg-cyan-100 dark:bg-cyan-900</Text>
      <Text className="bg-emerald-100 dark:bg-emerald-900">bg-emerald-100 dark:bg-emerald-900</Text>
      <Text className="bg-fuchsia-100 dark:bg-fuchsia-900">bg-fuchsia-100 dark:bg-fuchsia-900</Text>
      <Text className="bg-gray-100 dark:bg-gray-900">bg-gray-100 dark:bg-gray-900</Text>
      <Text className="bg-green-100 dark:bg-green-900">bg-green-100 dark:bg-green-900</Text>
      <Text className="bg-indigo-100 dark:bg-indigo-900">bg-indigo-100 dark:bg-indigo-900</Text>
      <Text className="bg-lime-100 dark:bg-lime-900">bg-lime-100 dark:bg-lime-900</Text>
      <Text className="bg-neutral-100 dark:bg-neutral-900">bg-neutral-100 dark:bg-neutral-900</Text>
      <Text className="bg-orange-100 dark:bg-orange-900">bg-orange-100 dark:bg-orange-900</Text>
      <Text className="bg-pink-100 dark:bg-pink-900">bg-pink-100 dark:bg-pink-900</Text>
      <Text className="bg-purple-100 dark:bg-purple-900">bg-purple-100 dark:bg-purple-900</Text>
      <Text className="bg-red-100 dark:bg-red-900">bg-red-100 dark:bg-red-900</Text>
      <Text className="bg-rose-100 dark:bg-rose-900">bg-rose-100 dark:bg-rose-900</Text>
      <Text className="bg-sky-100 dark:bg-sky-900">bg-sky-100 dark:bg-sky-900</Text>
      <Text className="bg-slate-100 dark:bg-slate-900">bg-slate-100 dark:bg-slate-900</Text>
      <Text className="bg-stone-100 dark:bg-stone-900">bg-stone-100 dark:bg-stone-900</Text>
      <Text className="bg-teal-100 dark:bg-teal-900">bg-teal-100 dark:bg-teal-900</Text>
      <Text className="bg-violet-100 dark:bg-violet-900">bg-violet-100 dark:bg-violet-900</Text>
      <Text className="bg-yellow-100 dark:bg-yellow-900">bg-yellow-100 dark:bg-yellow-900</Text>
      <Text className="bg-zinc-100 dark:bg-zinc-900">bg-zinc-100 dark:bg-zinc-900</Text>
      <Text className="bg-muted">bg-muted</Text>
    </BodyScrollView>
  );
}
