import * as React from 'react';
import { useRef } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';

import { useColorScheme } from '~/lib/useColorScheme';

const Sheet = React.forwardRef<
  BottomSheetModal,
  React.ComponentPropsWithoutRef<typeof BottomSheetModal>
>(({ index = -1, backgroundStyle, style, handleIndicatorStyle, ...props }, ref) => {
  const { colors } = useColorScheme();

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
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
});

function useSheetRef() {
  return useRef<BottomSheetModal>(null);
}

Sheet.displayName = 'Sheet';

export { Sheet, useSheetRef };
