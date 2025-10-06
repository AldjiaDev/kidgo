import { Pressable, View } from 'react-native';
import { LegendList } from '@legendapp/list';
import { router } from 'expo-router';
import { cssInterop } from 'nativewind';

import { Text } from '~/components/nativewindui/Text';
import { getCategoryInfo } from '~/utils/categoryFormatter';
import { CATEGORIES } from '~/utils/constants';

cssInterop(LegendList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});

interface FilterBarProps {
  selectedCategory?: string | null;
}

export function FilterBar({ selectedCategory }: FilterBarProps) {
  // Add "All" option at the beginning
  const categoriesWithAll = [null, ...CATEGORIES];

  function renderItem({ item: category }: { item: string | null }) {
    const isSelected = selectedCategory === category;
    const categoryInfo = getCategoryInfo(category);

    function handleCategoryPress() {
      if (category === null) {
        // Navigate back to discover index for "All"
        router.push('/(discover)');
      } else {
        // Navigate to category page
        router.push(`/(discover)/${encodeURIComponent(category)}`);
      }
    }

    return (
      <Pressable
        onPress={handleCategoryPress}
        className={`ml-2 rounded-lg px-3 py-2 ${
          isSelected ? 'bg-primary' : category === null ? 'bg-muted' : categoryInfo.backgroundColor
        }`}>
        <View className="flex-row items-center gap-2">
          <Text variant="body">{categoryInfo.emoji}</Text>
          <Text
            className={isSelected ? 'font-semibold text-primary-foreground' : 'text-foreground'}>
            {category || 'Tout'}
          </Text>
        </View>
      </Pressable>
    );
  }

  function keyExtractor(item: string | null) {
    return item || 'all';
  }

  return (
    <LegendList
      data={categoriesWithAll}
      estimatedItemSize={80}
      horizontal
      contentContainerClassName="px-2 py-2"
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
    />
  );
}
