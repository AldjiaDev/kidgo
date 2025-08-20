import { ScrollView, View } from 'react-native';

export const POSTER_WIDTH = 140;
export const POSTER_HEIGHT = 210;

export function Loading() {
  return (
    <View style={{ gap: 24 }}>
      <SkeletonSection />
      <SkeletonSection />
      <SkeletonSection />
    </View>
  );
}

export function SkeletonItem() {
  return (
    <View className="mx-4">
      <View
        className="overflow-hidden rounded-xl bg-background"
        style={{
          width: POSTER_WIDTH,
        }}>
        <View
          className="rounded-xl bg-muted"
          style={{
            width: POSTER_WIDTH,
            height: POSTER_HEIGHT,
          }}
        />
        <View style={{ padding: 8, gap: 4 }}>
          <View
            className="rounded bg-muted"
            style={{
              height: 14,
              width: '80%',
            }}
          />
          <View
            className="rounded bg-muted"
            style={{
              height: 12,
              width: '30%',
            }}
          />
        </View>
      </View>
    </View>
  );
}

export function SkeletonSection() {
  return (
    <View>
      <View
        className="rounded bg-muted"
        style={{
          width: 100,
          height: 20,
          marginBottom: 12,
          marginLeft: 16,
        }}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}>
        {[...Array(4)].map((_, i) => (
          <SkeletonItem key={i} />
        ))}
      </ScrollView>
    </View>
  );
}
