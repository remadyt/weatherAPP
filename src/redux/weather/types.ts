import { INameResponse } from '../../api/types/weatherTypes';

export interface IWeatherState {
  weatherCards: INameResponse[] & { lastUpdate?: string };
  isUpdated: boolean;
}
