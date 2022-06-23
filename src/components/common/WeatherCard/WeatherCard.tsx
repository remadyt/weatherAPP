import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { getLastUpdateText } from '../../../helpers/helpers';
import { Button } from '../Button/Button';
import { LoaderContainer } from '../LoaderContainer/LoaderContainer';

import styles from './WeatherCard.module.scss';

type Props = {
  name: string;
  location: string;
  weather: string;
  temperature: number;
  humidity: number;
  withoutRemoveButton?: boolean;
  onRemoveButtonClick?: () => void;
  onReloadButtonClick: () => void;
  isLoading?: boolean;
  customClass?: string;
  lastUpdate?: string;
};

export const WeatherCard = ({
  name,
  location,
  weather,
  temperature,
  humidity,
  withoutRemoveButton = false,
  onRemoveButtonClick,
  onReloadButtonClick,
  isLoading = false,
  customClass,
  lastUpdate,
}: Props) => {
  const cards = [
    { title: 'Weather', param: weather },
    { title: 'Temperature', param: `${Math.round(temperature)} ℃` },
    { title: 'Humidity', param: `${humidity} %` },
  ];

  const [lastUpdateText, setLastUpdateText] = useState('');

  useEffect(() => {
    if (lastUpdate) {
      const interval = setInterval(() => {
        setLastUpdateText(getLastUpdateText(lastUpdate));
      }, 60000);

      setLastUpdateText(getLastUpdateText(lastUpdate));

      return () => clearInterval(interval);
    }
  }, [lastUpdate]);

  return (
    <div className={classNames(styles.container, customClass)}>
      <LoaderContainer isLoading={isLoading}>
        <span className={styles.name}>{name}</span>
        <span className={styles.location}>{location}</span>
        <div className={styles.params}>
          {cards.map(({ title, param }: { title: string; param: string }) => (
            <div key={title} className={styles.wrapper}>
              <span className={styles.title}>{title}</span>
              <span className={styles.param}>{param}</span>
            </div>
          ))}
        </div>
        {lastUpdate && <span className={styles.lastUpdate}>{lastUpdateText}</span>}
        <div className={classNames(styles.buttonsWrapper, { [styles.withoutRemoveButton]: withoutRemoveButton })}>
          {!withoutRemoveButton && <Button onClick={onRemoveButtonClick}>REMOVE</Button>}
          <Button onClick={onReloadButtonClick}>RELOAD</Button>
        </div>
      </LoaderContainer>
    </div>
  );
};