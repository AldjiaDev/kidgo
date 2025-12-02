import * as React from 'react';
import { forwardRef, useCallback, useRef } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';

import { useColorScheme } from '@/lib/useColorScheme';

const Sheet = forwardRef<BottomSheetModal, React.ComponentPropsWithoutRef<typeof BottomSheetModal>>(
  ({ index = 1, backgroundStyle, style, handleIndicatorStyle, ...props }, ref) => {
    const { colors } = useColorScheme();

    const renderBackdrop = React.useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      ),
      []
    );
    return (
      <BottomSheetModal
        ref={ref}
        index={index}
        backgroundStyle={
          backgroundStyle ?? {
            backgroundColor: colors.card,
          }
        }
        style={
          style ?? {
            borderWidth: 1,
            borderColor: colors.grey5,
            borderTopStartRadius: 16,
            borderTopEndRadius: 16,
          }
        }
        handleIndicatorStyle={
          handleIndicatorStyle ?? {
            backgroundColor: colors.grey4,
          }
        }
        backdropComponent={renderBackdrop}
        {...props}
      />
    );
  }
);

function useSheetRef() {
  return useRef<BottomSheetModal>(null);
}

/**
 * Provides imperative controls and a ref for managing a BottomSheetModal.
 *
 * This hook exposes a mutable ref to attach to a BottomSheetModal, plus stable
 * callbacks to present and dismiss the sheet.
 *
 * Usage:
 * - Assign `ref` to the BottomSheetModal component via the `ref` prop.
 * - Call `open()` to present the sheet.
 * - Call `close()` to dismiss the sheet.
 *
 * @remarks
 * - Ensure your app is wrapped with `BottomSheetModalProvider` when using `@gorhom/bottom-sheet`.
 * - The `open` and `close` callbacks are memoized and stable across renders.
 *
 * @returns An object containing:
 * - `ref`: React.MutableRefObject<BottomSheetModal | null> — attach to the BottomSheetModal instance.
 * - `open`: () => void — presents the bottom sheet.
 * - `close`: () => void — dismisses the bottom sheet.
 *
 * @example
 * const { ref, open, close } = useBottomSheet();
 * return (
 *   <>
 *     <Button title="Open sheet" onPress={open} />
 *     <BottomSheetModal ref={ref} snapPoints={['50%']} />
 *     <Button title="Close sheet" onPress={close} />
 *   </>
 * );
 */
export const useBottomSheet = () => {
  const ref = useRef<BottomSheetModal>(null);

  const open = useCallback(() => {
    ref.current?.present();
  }, []);

  const close = useCallback(() => {
    ref.current?.dismiss();
  }, []);

  return { ref, open, close };
};

Sheet.displayName = 'Sheet';

export { Sheet, useSheetRef };
