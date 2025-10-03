import { Pressable, View } from 'react-native';
import { LegendList } from '@legendapp/list';
import { cssInterop } from 'nativewind';

import { Text } from '~/components/nativewindui/Text';
import { CATEGORIES } from '~/utils/constants';
import { getCategoryInfo } from '~/utils/categoryFormatter';

cssInterop(LegendList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});

interface FilterBarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function FilterBar({ selectedCategory, onCategoryChange }: FilterBarProps) {
  // Add "All" option at the beginning
  const categoriesWithAll = [null, ...CATEGORIES];

  function renderItem({ item: category }: { item: string | null }) {
    const isSelected = selectedCategory === category;
    const categoryInfo = getCategoryInfo(category);

    return (
      <Pressable
        onPress={() => onCategoryChange(category)}
        className={`mr-2 rounded-lg px-3 py-2 ${
          isSelected
            ? 'bg-primary'
            : category === null
              ? 'bg-muted'
              : categoryInfo.backgroundColor
        }`}>
        <View className="flex-row items-center gap-2">
          <Text style={{ fontSize: 20 }}>{categoryInfo.emoji}</Text>
          <Text className={isSelected ? 'font-semibold text-primary-foreground' : 'text-foreground'}>
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
      contentContainerClassName="px-4 py-2"
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
    />
  );
}
