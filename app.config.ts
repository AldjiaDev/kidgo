import type { ConfigContext, ExpoConfig } from 'expo/config';

import { version } from './package.json';

// Replace these with your EAS project ID and project slug.
// You can find them at https://expo.dev/accounts/[account]/projects/[project].
const EAS_PROJECT_ID = 'deebf523-c9e6-43a0-9e68-e04966557e2b';
const PROJECT_SLUG = 'kidgo';
const OWNER = 'weshipit';

// App production config
const APP_NAME = 'Kid GO';
const BUNDLE_IDENTIFIER = 'com.weshipit.kidgo';
const PACKAGE_NAME = 'com.weshipit.kidgo';
const ICON = './assets/images/icons/iOS-Prod.png';
const ADAPTIVE_ICON = './assets/images/icons/Android-Prod.png';
const SCHEME = 'kidgo';

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log('⚙️ Building app for environment:', process.env.APP_ENV);
  const { name, bundleIdentifier, icon, adaptiveIcon, packageName, scheme } = getDynamicAppConfig(
    (process.env.APP_ENV as 'development' | 'preview' | 'production') || 'development'
  );

  return {
    ...config,
    name: name,
    version, // Automatically bump your project version with `yarn patch`, `yarn minor` or `yarn major`.
    slug: PROJECT_SLUG, // Must be consistent across all environments.
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    icon: icon,
    scheme: scheme,
    ios: {
      supportsTablet: true,
      bundleIdentifier: bundleIdentifier,
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      package: packageName,
      adaptiveIcon: {
        foregroundImage: adaptiveIcon,
        backgroundColor: '#3579f4',
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      'expo-web-browser',
      [
        'expo-splash-screen',
        {
          resizeMode: 'contain',
          image: './assets/images/splash-icon-light.png',
          backgroundColor: '#f2f1f6',
          dark: {
            image: './assets/images/splash-icon-dark.png',
            backgroundColor: '#020204',
          },
          ios: {
            imageWidth: 200,
          },
          android: {
            imageWidth: 200,
          },
        },
      ],
    ],
    extra: {
      router: {},
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    owner: OWNER,
  };
};

// Dynamically configure the app based on the environment.
// Update these placeholders with your actual values.
export const getDynamicAppConfig = (environment: 'development' | 'preview' | 'production') => {
  if (environment === 'production') {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      icon: ICON,
      adaptiveIcon: ADAPTIVE_ICON,
      scheme: SCHEME,
    };
  }

  if (environment === 'preview') {
    return {
      name: `${APP_NAME} Preview`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      icon: './assets/images/icons/iOS-Prev.png',
      adaptiveIcon: './assets/images/icons/Android-Prev.png',
      scheme: `${SCHEME}-prev`,
    };
  }

  return {
    name: `${APP_NAME} Development`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    icon: './assets/images/icons/iOS-Dev.png',
    adaptiveIcon: './assets/images/icons/Android-Dev.png',
    scheme: `${SCHEME}-dev`,
  };
};
