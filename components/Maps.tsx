import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { observer } from '@legendapp/state/react';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { Icon } from '@roninoss/icons';

import { AddPlaceForm } from '~/components/AddPlaceForm';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import { Text } from '~/components/nativewindui/Text';
import { PlaceDetails } from '~/components/PlaceDetails';
import { useColorScheme } from '~/lib/useColorScheme';
import { useLocation } from '~/contexts/LocationContext';
import { Tables } from '~/utils/database.types';
import { places$ } from '~/utils/supabase-legend';

const LILLE_COORDINATES = {
  coordinates: {
    latitude: 50.6292, // Default to Lille center
    longitude: 3.0573,
  },
  zoom: 13,
};

// Bottom sheet content component
function PlaceBottomSheetContent({ selectedPlace }: { selectedPlace: Tables<'places'> | null }) {
  return (
    <View className="flex-1 p-4">
      {selectedPlace ? (
        <PlaceDetails data={selectedPlace} />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-muted-foreground">
            Appuyez sur un marqueur pour voir les détails
          </Text>
        </View>
      )}
    </View>
  );
}

const MapsContent = observer(() => {
  const places = places$.get();
  const { location, requestPermission, hasPermission } = useLocation();
  const { colors } = useColorScheme();

  const bottomSheetModalRef = useSheetRef();
  const addPlaceSheetRef = useSheetRef();

  const [selectedPlace, setSelectedPlace] = useState<Tables<'places'> | null>(null);

  // Function to handle marker clicks
  const handleMarkerClick = (markerId: string) => {
    const place = validPlaces.find((p) => p.id === markerId);
    if (place) {
      setSelectedPlace(place);
      bottomSheetModalRef.current?.present();
    }
  };

  // Function to handle add place button click
  const handleAddPlaceClick = () => {
    addPlaceSheetRef.current?.present();
  };

  // Function to handle successful place addition
  const handlePlaceAdded = () => {
    addPlaceSheetRef.current?.dismiss();
  };

  // Common camera position logic
  const getCameraPosition = () => {
    return location
      ? {
          coordinates: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          zoom: 13,
        }
      : LILLE_COORDINATES;
  };

  // @todo migrate Location state to a context provider
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  // Filter places that have valid coordinates
  const validPlaces = places
    ? Object.values(places).filter(
        (place: Tables<'places'>) =>
          place.latitude !== null &&
          place.longitude !== null &&
          place.name !== null &&
          !place.deleted
      )
    : [];

  // Create base marker data
  const createBaseMarker = (place: Tables<'places'>) => ({
    id: place.id,
    coordinates: {
      latitude: place.latitude!,
      longitude: place.longitude!,
    },
    title: place.name!,
  });

  // Create markers for Apple Maps
  const appleMarkers: AppleMaps.Marker[] = validPlaces.map(createBaseMarker);

  // Create markers for Google Maps (with snippet)
  const googleMarkers: GoogleMaps.Marker[] = validPlaces.map((place) => ({
    ...createBaseMarker(place),
    snippet: place.category || undefined,
  }));

  // Common marker click handler
  const markerClickHandler = (marker: { id?: string }) => {
    if (marker.id) {
      handleMarkerClick(marker.id);
    }
  };

  // Common map properties
  const commonMapProps = {
    onMarkerClick: markerClickHandler,
    cameraPosition: getCameraPosition(),
    properties: {
      selectionEnabled: false,
    },
  };

  // Render map based on platform
  const renderMap = () => {
    if (Platform.OS === 'ios') {
      return (
        <AppleMaps.View
          style={StyleSheet.absoluteFill}
          markers={appleMarkers}
          {...commonMapProps}
          properties={{
            ...commonMapProps.properties,
            mapType: AppleMaps.MapType.STANDARD,
          }}
        />
      );
    } else if (Platform.OS === 'android') {
      return (
        <GoogleMaps.View
          style={{ flex: 1 }}
          markers={googleMarkers}
          {...commonMapProps}
          properties={{
            ...commonMapProps.properties,
            mapType: GoogleMaps.MapType.NORMAL,
          }}
        />
      );
    } else {
      return <Text>Maps are only available on Android and iOS</Text>;
    }
  };

  // Only show bottom sheet on mobile platforms
  const showBottomSheet = Platform.OS === 'ios' || Platform.OS === 'android';

  return (
    <>
      {renderMap()}
      {/* Floating Action Button */}
      {showBottomSheet && (
        <View
          className="absolute right-4 bottom-4 z-20"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <Pressable
            onPress={handleAddPlaceClick}
            className="h-14 w-14 items-center justify-center rounded-full bg-primary"
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
            })}>
            <Icon name="plus" size={24} color="white" />
          </Pressable>
        </View>
      )}
      {/* Place Details Bottom Sheet */}
      {showBottomSheet && (
        <Sheet ref={bottomSheetModalRef} snapPoints={['75%']}>
          <BottomSheetScrollView>
            <PlaceBottomSheetContent selectedPlace={selectedPlace} />
          </BottomSheetScrollView>
        </Sheet>
      )}
      {/* Add Place Bottom Sheet */}
      {showBottomSheet && (
        <Sheet ref={addPlaceSheetRef} snapPoints={['80%']}>
          <AddPlaceForm
            onSubmit={handlePlaceAdded}
            onCancel={() => addPlaceSheetRef.current?.dismiss()}
          />
        </Sheet>
      )}
    </>
  );
});

export function Maps() {
  return <MapsContent />;
}
