import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert, Platform } from 'react-native';
import * as Location from 'expo-location';

interface LocationContextType {
  location: Location.LocationObject | null;
  isLoading: boolean;
  error: string | null;
  requestPermission: () => Promise<void>;
  hasPermission: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  const getCurrentLocation = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation(currentLocation);
    } catch {
      setError("Impossible d'obtenir votre position actuelle");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const checkPermissionStatus = useCallback(async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      setHasPermission(status === 'granted');

      if (status === 'granted') {
        getCurrentLocation();
      }
    } catch {
      setError('Erreur lors de la vérification des permissions');
    }
  }, [getCurrentLocation]);

  // Check initial permission status
  useEffect(() => {
    checkPermissionStatus();
  }, [checkPermissionStatus]);

  const showPermissionOnboarding = () => {
    return new Promise<boolean>((resolve) => {
      Alert.alert(
        '📍 Localisation',
        'KidGO souhaite accéder à votre position pour :\n\n' +
          '• Vous montrer les activités près de chez vous\n' +
          '• Calculer les distances et temps de trajet\n' +
          '• Vous proposer des suggestions personnalisées\n\n' +
          'Vos données de localisation restent privées et ne sont jamais partagées.',
        [
          {
            text: 'Plus tard',
            style: 'cancel',
            onPress: () => resolve(false),
          },
          {
            text: 'Autoriser',
            style: 'default',
            isPreferred: true,
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false }
      );
    });
  };

  const requestPermission = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Show onboarding first
      const userAccepted = await showPermissionOnboarding();
      if (!userAccepted) {
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        setHasPermission(true);
        await getCurrentLocation();
      } else {
        setError("Permission d'accès à la localisation refusée");
        setHasPermission(false);

        // Show additional guidance for denied permission
        Alert.alert(
          'Permission refusée',
          'Pour utiliser cette fonctionnalité, vous pouvez activer la localisation dans les paramètres de votre appareil.',
          [
            { text: 'OK', style: 'default' },
            {
              text: 'Paramètres',
              style: 'default',
              onPress: () => {
                if (Platform.OS === 'ios') {
                  // On iOS, we can't directly open settings, but we can guide the user
                  Alert.alert(
                    'Paramètres iOS',
                    "Allez dans Réglages > KidGO > Localisation pour activer l'accès à votre position."
                  );
                }
              },
            },
          ]
        );
      }
    } catch {
      setError('Erreur lors de la demande de permission');
    } finally {
      setIsLoading(false);
    }
  };

  const value: LocationContextType = {
    location,
    isLoading,
    error,
    requestPermission,
    hasPermission,
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
