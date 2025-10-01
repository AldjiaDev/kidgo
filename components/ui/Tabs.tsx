import React from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { BottomTabBarButtonProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
// Better transitions on web, no changes on native.
import { PlatformPressable } from '@react-navigation/elements';
import { Icon, type MaterialIconName } from '@roninoss/icons';
import * as Haptics from 'expo-haptics';
import { Label, NativeTabs } from 'expo-router/unstable-native-tabs';

import BlurTabBarBackground from './TabBarBackground';

// These are the default tab options for iOS, they disable on other platforms.
const DEFAULT_TABS: BottomTabNavigationOptions =
  process.env.EXPO_OS !== 'ios'
    ? {
        headerShown: false,
      }
    : {
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: BlurTabBarBackground,
        tabBarStyle: {
          // Use a transparent background on iOS to show the blur effect
          position: 'absolute',
        },
      };

export default function Tabs({
  screenOptions,
  children,
  ...props
}: React.ComponentProps<typeof NativeTabs>) {
  const processedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.props) {
      const childProps = child.props as any;
      const { systemImage, title, ...props } = childProps;
      if (systemImage || title != null) {
        return React.cloneElement(child, {
          ...props,
          options: {
            tabBarIcon: !systemImage
              ? undefined
              : (props: any) => <Icon name={systemImage} {...props} />,
            title,
            ...props.options,
          },
        });
      }
    }
    return child;
  });

  const { width } = useWindowDimensions();

  const isMd = width >= 768;
  const isLg = width >= 1024;

  return (
    <NativeTabs
      screenOptions={{
        ...DEFAULT_TABS,

        ...Platform.select({
          ios: isMd
            ? {
                tabBarPosition: 'left',
                tabBarVariant: 'material',
                tabBarLabelPosition: isLg ? undefined : 'below-icon',
                tabBarStyle: {
                  // Use a transparent background on iOS to show the blur effect
                  position: 'relative',
                },
              }
            : {
                tabBarPosition: 'bottom',
              },
          default: isMd
            ? {
                tabBarPosition: 'left',
                tabBarVariant: 'material',
                tabBarLabelPosition: isLg ? undefined : 'below-icon',
              }
            : {
                tabBarPosition: 'bottom',
              },
        } as any),

        ...screenOptions,
      }}
      {...props}>
      {processedChildren}
    </NativeTabs>
  );
}

Tabs.Screen = NativeTabs.Screen as React.FC<
  React.ComponentProps<typeof NativeTabs.Screen> & {
    /** Add a system image for the tab icon. */
    systemImage?: MaterialIconName;
    /** Set the title of the icon. */
    title?: string;
  }
>;

function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
