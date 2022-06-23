import { useDispatch, useSelector } from 'react-redux';

import { INameResponse } from '../../api/types/weatherTypes';
import { useLazyGetWeatherByNameQuery } from '../../api/weatherApi';
import { weatherSelectors } from '../../redux/weather/weatherSelectors';
import { weatherActions } from '../../redux/weather/weatherSlice';
import { WeatherCard } from '../common/WeatherCard/WeatherCard';

import styles from './WeatherCards.module.scss';

export const WeatherCards = () => {
  const dispatch = useDispatch();
  const weatherCards = useSelector(weatherSelectors.selectWeatherCards);
  const [fetchWeather] = useLazyGetWeatherByNameQuery();

  const handleRemove = (id: number) => {
    dispatch(weatherActions.removeCard({ id }));
  };

  const handleReload = (name: string) => {
    dispatch(weatherActions.setIsUpdated(true));
    fetchWeather(name);
  };

  return (
    <div className={styles.container}>
      {weatherCards.map(
        ({ name, weather, main: { humidity, temp }, id, lastUpdate, sys: { country } }: INameResponse) => (
          <WeatherCard
            key={id}
            name={name}
            location={country}
            weather={weather[0].main}
            humidity={humidity}
            temperature={temp}
            onReloadButtonClick={() => handleReload(name)}
            onRemoveButtonClick={() => handleRemove(id)}
            lastUpdate={lastUpdate}
          />
        ),
      )}
    </div>
  );
};
