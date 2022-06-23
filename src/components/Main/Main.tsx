import { useGetWeatherByGeoQuery } from '../../api/weatherApi';
import { usePosition } from '../../hooks/useGeoLocation';
import { WeatherCard } from '../common/WeatherCard/WeatherCard';

import styles from './Main.module.scss';

export const Main = () => {
  const { latitude, longitude } = usePosition();

  const { data, isFetching, refetch } = useGetWeatherByGeoQuery(
    {
      lat: latitude,
      lon: longitude,
    },
    { skip: !latitude || !longitude },
  );

  if (!data) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>World Weather</h1>
      <p className={styles.description}>Watch weather in your current location</p>
      <WeatherCard
        name={data.name}
        location={data.sys.country}
        weather={data.weather[0].main}
        humidity={data.main.humidity}
        temperature={data?.main.temp}
        onReloadButtonClick={refetch}
        lastUpdate={data?.lastUpdate}
        withoutRemoveButton
        isLoading={isFetching}
        customClass={styles.card}
      />
    </div>
  );
};
