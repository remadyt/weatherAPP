import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import moment from 'moment';
import storage from 'redux-persist/lib/storage';

import { weatherApi } from '../../api/weatherApi';
import { INameResponse } from '../../api/types/weatherTypes';
import { IWeatherState } from './types';

const initialState: IWeatherState = {
  weatherCards: [],
  isUpdated: false,
};

export const weatherSlice = createSlice({
  name: 'weatherSlice',
  initialState: initialState,
  reducers: {
    removeCard(state: IWeatherState, { payload }: PayloadAction<{ id: number }>) {
      state.weatherCards = state.weatherCards.filter((weatherCard) => weatherCard.id !== payload.id);
    },
    setIsUpdated(state: IWeatherState, { payload }: PayloadAction<boolean>) {
      state.isUpdated = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      weatherApi.endpoints.getWeatherByName.matchFulfilled,
      (state, { payload }: PayloadAction<INameResponse>) => {
        const find = state.weatherCards.find((card) => card.name === payload.name);

        if (find) {
          find.lastUpdate = moment().toString();
          return;
        }

        if (state.isUpdated) {
          const index = state.weatherCards.findIndex((card) => card.id === payload.id);
          state.weatherCards[index] = payload;
          state.isUpdated = false;
        } else {
          state.weatherCards.push(payload);
        }
      },
    );
  },
});

export const weatherReducer = persistReducer(
  {
    key: 'root',
    storage,
  },
  weatherSlice.reducer,
);

export const weatherActions = weatherSlice.actions;
