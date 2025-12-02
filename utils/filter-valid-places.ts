import { LocationObject } from 'expo-location';

import { calculateDistance } from '@/utils/calculate-distance';
import { Tables } from '@/utils/database.types';

export function filterValidPlaces(
  places: Tables<'places'>[],
  location: LocationObject | null,
  category?: string | null
) {
  return places
    ? Object.values(places)
        .filter(
          (place: Tables<'places'>) =>
            place.latitude !== null &&
            place.longitude !== null &&
            place.name !== null &&
            !place.deleted &&
            (category === null || category === undefined || place.category === category)
        )
        .map((place: Tables<'places'>) => {
          let distance = null;
          if (location && place.latitude && place.longitude) {
            distance = calculateDistance(
              location.coords.latitude,
              location.coords.longitude,
              parseFloat(String(place.latitude)),
              parseFloat(String(place.longitude))
            );
          }
          return { ...place, distance };
        })
        .filter((place) => !location || place.distance === null || place.distance <= 50) // Within 50km
        .sort((a, b) => {
          // Sort by distance if available, otherwise by name
          if (a.distance !== null && b.distance !== null) {
            return a.distance - b.distance;
          }
          if (a.distance !== null) return -1;
          if (b.distance !== null) return 1;
          return (a.name || '').localeCompare(b.name || '');
        })
    : [];
}
