import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

type LocationStatus = 'idle' | 'loading' | 'done' | 'error';

interface LocationContextType {
  location: Location.LocationObject | null;
  errorMsg: string | null;
  status: LocationStatus;
  hasPermission: boolean;
  isDeviceSupported: boolean;
  getCurrentLocation: () => Promise<void>;
  requestPermission: () => Promise<boolean>;
  clearError: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [status, setStatus] = useState<LocationStatus>('idle');
  const [hasPermission, setHasPermission] = useState(false);
  const [isDeviceSupported, setIsDeviceSupported] = useState(true);

  // Check if device supports location services
  useEffect(() => {
    function checkDeviceSupport() {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setIsDeviceSupported(false);
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        setStatus('error');
        return;
      }
      setIsDeviceSupported(true);
    }

    checkDeviceSupport();
  }, []);

  const getCurrentLocation = useCallback(
    async function getCurrentLocation() {
      if (!isDeviceSupported) {
        return;
      }

      try {
        setStatus('loading');
        setErrorMsg(null);

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setLocation(currentLocation);
        setStatus('done');
      } catch {
        setErrorMsg('Failed to get current location');
        setStatus('error');
      }
    },
    [isDeviceSupported]
  );

  const requestPermission = useCallback(
    async function requestPermission(): Promise<boolean> {
      if (!isDeviceSupported) {
        return false;
      }

      try {
        setStatus('loading');
        setErrorMsg(null);

        const { status: permissionStatus } = await Location.requestForegroundPermissionsAsync();

        if (permissionStatus !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setHasPermission(false);
          setStatus('error');
          return false;
        }

        setHasPermission(true);
        await getCurrentLocation();
        return true;
      } catch {
        setErrorMsg('Error requesting location permission');
        setStatus('error');
        return false;
      }
    },
    [isDeviceSupported, getCurrentLocation]
  );

  const clearError = useCallback(function clearError() {
    setErrorMsg(null);
    setStatus('idle');
  }, []);

  // Check initial permission status
  useEffect(() => {
    async function checkInitialPermission() {
      if (!isDeviceSupported) {
        return;
      }

      try {
        const { status: permissionStatus } = await Location.getForegroundPermissionsAsync();

        if (permissionStatus === 'granted') {
          setHasPermission(true);
          await getCurrentLocation();
        } else {
          setHasPermission(false);
          setStatus('idle');
        }
      } catch {
        // Silently handle permission check error
        setStatus('error');
      }
    }

    checkInitialPermission();
  }, [isDeviceSupported, getCurrentLocation]);

  const value: LocationContextType = {
    location,
    errorMsg,
    status,
    hasPermission,
    isDeviceSupported,
    getCurrentLocation,
    requestPermission,
    clearError,
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
