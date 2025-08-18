import RNSegmentedControl from '@react-native-segmented-control/segmented-control';

export type SegmentControlProps = {
  enabled?: boolean;
  onIndexChange?: (index: number) => void;
  onValueChange?: (value: string) => void;
  selectedIndex?: number;
  values: string[];
  materialTextClassName?: string;
  /**
   * If true, then selecting a segment won't persist visually. The onValueChange callback will still work as expected.
   */
  iosMomentary?: boolean;
};

export function SegmentedControl({
  values,
  selectedIndex,
  onIndexChange,
  onValueChange: onValueChangeProp,
  enabled = true,
  iosMomentary,
  materialTextClassName: _materialTextClassName,
}: SegmentControlProps) {
  function onChange(event: { nativeEvent: { selectedSegmentIndex: number } }) {
    onIndexChange?.(event.nativeEvent.selectedSegmentIndex);
  }

  function onValueChange(value: string) {
    onValueChangeProp?.(value);
  }
  return (
    <RNSegmentedControl
      enabled={enabled}
      values={values}
      selectedIndex={selectedIndex}
      onChange={onChange}
      onValueChange={onValueChange}
      momentary={iosMomentary}
    />
  );
}
