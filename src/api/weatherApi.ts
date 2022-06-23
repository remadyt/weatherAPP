import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import moment from 'moment';
import { ByGeoQuery, IGeoResponse, INameResponse } from './types/weatherTypes';
import { appid, baseUrl } from '../constants/appConstants';

export const weatherApi = createApi({
  reducerPath: 'weather',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getWeatherByGeo: builder.query<IGeoResponse, ByGeoQuery>({
      query: ({ lat, lon }) => ({
        url: '/weather',
        params: {
          lat,
          lon,
          units: 'metric',
          appid,
          lang: 'en',
        },
      }),
      transformResponse: (response: IGeoResponse) => {
        return { ...response, lastUpdate: moment().toString() };
      },
    }),
    getWeatherByName: builder.query<INameResponse, string>({
      query: (name) => ({
        url: '/weather',
        params: {
          q: name,
          units: 'metric',
          appid,
          lang: 'en',
        },
      }),
      transformResponse: (response: INameResponse) => {
        return { ...response, lastUpdate: moment().toString() };
      },
    }),
  }),
});

export const { useGetWeatherByGeoQuery, useLazyGetWeatherByNameQuery } = weatherApi;
