// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

/** @type {import('expo/metro-config').MetroConfig} */

const config = getDefaultConfig(__dirname);

// First apply Storybook configuration, then NativeWind
const configWithStorybook = withStorybook(config, {
  // When false, removes Storybook from bundle (useful for production)
  enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true',
});

module.exports = withNativeWind(configWithStorybook, { input: './global.css', inlineRem: 16 });
