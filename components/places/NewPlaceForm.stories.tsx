import { NewPlaceForm } from '~/components/places/NewPlaceForm';

export default {
  title: 'Components/NewPlaceForm',
  component: NewPlaceForm,
};

export const Default = () => {
  function handleLog() {
    console.log('change');
  }
  return (
    <NewPlaceForm
      onSubmit={() => {}}
      onCancel={() => {}}
      categoryOnChange={null}
      priceOnChange={null}
      categorySheetRef={undefined}
      priceSheetRef={undefined}
      isSubmitting={false}
      setIsSubmitting={handleLog}
      location={{
        coords: {
          latitude: 0,
          longitude: 0,
          altitude: null,
          accuracy: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: 0,
        mocked: undefined,
      }}
      setPriceOnChange={handleLog}
      setCategoryOnChange={handleLog}
    />
  );
};
