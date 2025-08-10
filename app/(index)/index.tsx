/// <reference types="react/canary" />
import { ScrollView, View } from "react-native";

// import { SearchPlaceholder } from "@/components/SearchPlaceholder";
// import { BodyScrollView } from "@/components/ui/BodyScrollView";
// import { renderSearchContents } from "@/functions/render-search";
// import { useHeaderSearch } from "@/hooks/useHeaderSearch";
import React from "react";

const POSTER_WIDTH = 140;
const POSTER_HEIGHT = 210;

export default function HomeScreen() {
  // const text = useHeaderSearch({
  //   placeholder: "Shows, Movies, and More",
  // });

  // if (!text || text.length < 2) {
  //   return <SearchPlaceholder />;
  // }

  // return <SearchPage text={text} />;
  return <Loading />;
}

// function SearchPage({ text }: { text: string }) {
//   return (
//     <BodyScrollView
//       contentContainerStyle={{
//         paddingVertical: 16,
//         gap: 2,
//       }}
//     >
//       <React.Suspense fallback={<Loading />}>
//         {renderSearchContents(text)}
//       </React.Suspense>
//     </BodyScrollView>
//   );
// }

function Loading() {
  return (
    <View style={{ gap: 24 }}>
      <SkeletonSection />
      <SkeletonSection />
      <SkeletonSection />
    </View>
  );
}

function SkeletonItem() {
  return (
    <View style={{ marginHorizontal: 4 }}>
      <View
        className="bg-background rounded-xl overflow-hidden"
        style={{
          width: POSTER_WIDTH,
        }}
      >
        <View
          className="bg-muted rounded-xl"
          style={{
            width: POSTER_WIDTH,
            height: POSTER_HEIGHT,
          }}
        />
        <View style={{ padding: 8, gap: 4 }}>
          <View
            className="bg-muted rounded"
            style={{
              height: 14,
              width: "80%",
            }}
          />
          <View
            className="bg-muted rounded"
            style={{
              height: 12,
              width: "30%",
            }}
          />
        </View>
      </View>
    </View>
  );
}

function SkeletonSection() {
  return (
    <View>
      <View
        className="bg-muted rounded"
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
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {[...Array(4)].map((_, i) => (
          <SkeletonItem key={i} />
        ))}
      </ScrollView>
    </View>
  );
}
