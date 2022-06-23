import { RootState } from '../store';

const selectWeatherCards = (state: RootState) => state.weatherSlice.weatherCards;
const selectIsUpdated = (state: RootState) => state.weatherSlice.isUpdated;

export const weatherSelectors = {
  selectWeatherCards,
  selectIsUpdated,
};
