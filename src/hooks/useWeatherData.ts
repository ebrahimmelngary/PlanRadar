import { useState, useEffect } from 'react';
import axios from 'axios';
import { CONFIG } from '../configs';
import { WeatherData } from '../types';


export const useWeatherData = (defaultCity:string) => {
  const [city, setCity] = useState(defaultCity);
  const [weather, setWeather] = useState<WeatherData>();
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  
  const fetchWeather = async (q:string) => {
    if (!q) return;
    setLoading(true);
    setError(null);

    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`${CONFIG.Api_URL}/data/2.5/weather`, {
          params: { q, units: 'metric', appid: CONFIG.API_KEY },
        }),
        axios.get(`${CONFIG.Api_URL}/data/2.5/forecast`, {
          params: { q, units: 'metric', appid: CONFIG.API_KEY },
        }),
      ]);

      const reducedForecast = forecastRes.data.list.filter((_, i) => i % 8 === 0).slice(0, 5);

      setWeather(currentRes.data);
      setForecast(reducedForecast);
      setCity(currentRes.data.name);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return { city, setCity, weather, forecast, loading, error, fetchWeather };
};
