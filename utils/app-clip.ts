import { displayOverlay, isClip } from 'react-native-app-clip';

/**
 * Check if the current app instance is running as an App Clip
 * @returns true if running as App Clip, false if running as full app
 */
export function checkIsAppClip(): boolean {
  return isClip();
}

/**
 * Display the native iOS overlay that promotes the full app to App Clip users
 * This should be called at appropriate moments to encourage users to download the full app
 */
export function showFullAppPrompt(): void {
  if (isClip()) {
    displayOverlay();
  }
}

/**
 * Helper function to determine if App Clip specific features should be enabled
 * @returns true if App Clip features should be shown
 */
export function shouldShowAppClipFeatures(): boolean {
  return isClip();
}