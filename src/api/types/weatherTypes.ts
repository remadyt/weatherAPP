type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Main = 'feels_like' | 'grnd_level' | 'humidity' | 'pressure' | 'sea_level' | 'temp' | 'temp_max' | 'temp_min';

export type ByGeoQuery = {
  lat: number | undefined;
  lon: number | undefined;
};

type Clouds = {
  all: number;
};

type Sys = {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
};

type Wind = {
  deg: number;
  gust: number;
  speed: number;
};

export interface IGeoResponse {
  base: string;
  clouds: Clouds;
  cod: number;
  coord: ByGeoQuery;
  dt: number;
  id: number;
  main: Record<Main, number>;
  name: string;
  sys: Sys;
  timezone: number;
  visibility: number;
  weather: Weather[];
  wind: Wind;
  lastUpdate: string;
}

export interface INameResponse {
  base: string;
  clouds: Clouds;
  cod: number;
  coord: ByGeoQuery;
  dt: number;
  id: number;
  main: Record<Main, number>;
  name: string;
  sys: Sys;
  timezone: number;
  visibility: number;
  weather: Weather[];
  wind: Wind;
  lastUpdate: string;
}
