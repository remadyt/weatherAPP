import { ToastContainer } from 'react-toastify';

import { Main } from './components/Main/Main';
import { CreateWeatherCard } from './components/CreateWeatherCard/CreateWeatherCard';
import { WeatherCards } from './components/WeatherCards/WeatherCards';

import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <div>
      <Main />
      <CreateWeatherCard />
      <WeatherCards />
      <ToastContainer />
    </div>
  );
};