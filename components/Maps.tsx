import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import * as Location from 'expo-location';
import { AppleMaps, GoogleMaps } from 'expo-maps';

import activitiesData from '~/api/lille-activities.json';

interface Activity {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  category: string;
  tags: string[];
  address: string;
  opening_hours: string;
  price_range: string;
  age_category: string[];
  website: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MapsProps {}

export function Maps(props: MapsProps) {
  const activities: Activity[] = activitiesData;
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

  // Create markers for Apple Maps
  const appleMarkers: AppleMaps.Marker[] = activities.map((activity) => ({
    id: activity.id,
    coordinates: {
      latitude: activity.latitude,
      longitude: activity.longitude,
    },
    title: activity.name,
  }));

  // Create markers for Google Maps
  const googleMarkers: GoogleMaps.Marker[] = activities.map((activity) => ({
    id: activity.id,
    coordinates: {
      latitude: activity.latitude,
      longitude: activity.longitude,
    },
    title: activity.name,
    snippet: activity.category,
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
            : {
                coordinates: {
                  latitude: 50.6292, // Default to Lille center
                  longitude: 3.0573,
                },
                zoom: 13,
              }
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
            : {
                coordinates: {
                  latitude: 50.6292, // Default to Lille center
                  longitude: 3.0573,
                },
                zoom: 13,
              }
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
}
