'use client';

import { ScrollViewProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBottomTabOverflow } from '~/components/ui/TabBarBackground';
import { useScrollToTop } from '~/hooks/useTabToTop';

export function BodyScrollView(props: ScrollViewProps & { ref?: React.Ref<Animated.ScrollView> }) {
  const paddingBottom = useBottomTabOverflow();
  const { bottom } = useSafeAreaInsets();

  const statusBarInset = useSafeAreaInsets().top; // inset of the status bar
  const largeHeaderInset = statusBarInset + 92; // inset to use for a large header since it's frame is equal to 96 + the frame of status bar

  useScrollToTop(props.ref!, -largeHeaderInset);

  return (
    <Animated.ScrollView
      scrollToOverflowEnabled
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      contentInset={{ bottom: paddingBottom }}
      scrollIndicatorInsets={{ bottom: paddingBottom - bottom }}
      {...props}
      className="bg-background"
      style={props.style}
    />
  );
}
