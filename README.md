# Kid GO App

> This is a React Native application for Kid GO, a collection of activities for families.

## Getting Started

First time here? Follow [setup guide](./docs/setup.md) to get started.

Install dependencies and launch the app:

```console
bun install
bun start
```

## Stack

- React Native with Expo
- Expo Router
- [NativeWind](https://www.nativewind.dev/) and [NativeWindUI](https://nativewindui.com/component/button)
- [icons](https://github.com/roninoss/icons)
- [Supabase](https://supabase.com/) for authentication and database
- [iOS App Clip](https://github.com/bndkt/react-native-app-clip) for lightweight app experiences

## iOS App Clip

This app includes iOS App Clip support, allowing users to quickly access a lightweight version of the app without installing the full application. The App Clip is automatically configured for all environments:

- **Development**: `com.weshipit.kidgo.dev.Clip`
- **Preview**: `com.weshipit.kidgo.preview.Clip`
- **Production**: `com.weshipit.kidgo.Clip`

To test the App Clip:
1. Run `npx expo run:ios --scheme` and select the App Clip scheme
2. Use the utility functions in `utils/app-clip.ts` to detect if running as App Clip and show promotion overlays

## Design

- [UX and wireframe](https://excalidraw.com/#json=lkGItA5_efXmwOf_muWk6,tQ5Zbm8U50CapfkbTCNgOw)
