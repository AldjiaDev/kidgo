import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { observer } from '@legendapp/state/react';
import * as Location from 'expo-location';
import { AppleMaps, GoogleMaps } from 'expo-maps';

import { Tables } from '~/utils/database.types';
import { places$ } from '~/utils/supabase-legend';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MapsProps {}

const LILLE_COORDINATES = {
  coordinates: {
    latitude: 50.6292, // Default to Lille center
    longitude: 3.0573,
  },
  zoom: 13,
};

const MapsContent = observer(() => {
  const places = places$.get();

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

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

  // Create markers for Apple Maps
  const appleMarkers: AppleMaps.Marker[] = validPlaces.map((place: Tables<'places'>) => ({
    id: place.id,
    coordinates: {
      latitude: place.latitude!,
      longitude: place.longitude!,
    },
    title: place.name!,
  }));

  // Create markers for Google Maps
  const googleMarkers: GoogleMaps.Marker[] = validPlaces.map((place: Tables<'places'>) => ({
    id: place.id,
    coordinates: {
      latitude: place.latitude!,
      longitude: place.longitude!,
    },
    title: place.name!,
    snippet: place.category || undefined,
  }));

  if (Platform.OS === 'ios') {
    return (
      <AppleMaps.View
        style={StyleSheet.absoluteFill}
        markers={appleMarkers}
        cameraPosition={
          location
            ? {
                coordinates: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                },
                zoom: 13,
              }
            : LILLE_COORDINATES
        }
        properties={{
          selectionEnabled: false,
          mapType: AppleMaps.MapType.STANDARD,
        }}
      />
    );
  } else if (Platform.OS === 'android') {
    return (
      <GoogleMaps.View
        style={{ flex: 1 }}
        markers={googleMarkers}
        cameraPosition={
          location
            ? {
                coordinates: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                },
                zoom: 13,
              }
            : LILLE_COORDINATES
        }
        properties={{
          selectionEnabled: false,
          mapType: GoogleMaps.MapType.NORMAL,
        }}
      />
    );
  } else {
    return errorMsg ? (
      <Text>{errorMsg}</Text>
    ) : (
      <Text>Maps are only available on Android and iOS</Text>
    );
  }
});

export function Maps(props: MapsProps) {
  return <MapsContent />;
}
