# Setup

1. Install the package manager with

```console
brew install oven-sh/bun/bun
bun install
```

2. Create iOS build with

```console
npx expo prebuild --platform=ios
bun ios
```

3. fetch credentials with

```console
eas env:pull development|preview|production
```
