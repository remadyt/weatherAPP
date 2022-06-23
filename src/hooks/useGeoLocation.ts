import { useState, useEffect } from 'react';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Error = {
  code: number;
  message: string;
};

interface IGeolocationCoordinates {
  latitude: number;
  longitude: number;
  altitude: null | number;
  accuracy: number;
  altitudeAccuracy: null | number;
  heading: null | number;
  speed: null | number;
}

interface IPosition {
  coords: IGeolocationCoordinates;
}

export const usePosition = () => {
  const [position, setPosition] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string>('');

  const onChange = ({ coords }: IPosition) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onError = (error: Error) => {
    setError(error.message);
  };

  useEffect(() => {
    const geolocation = navigator.geolocation;

    if (!geolocation) {
      setError('Geolocation is not supported');
      return;
    }

    const watcher = geolocation.watchPosition(onChange, onError);
    return () => geolocation.clearWatch(watcher);
  }, []);

  return { ...position, error };
};
