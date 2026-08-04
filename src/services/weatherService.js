import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

/**
 * Fetches current weather for a given city from OpenWeatherMap.
 * Always requests metric units; component-level conversion handles Fahrenheit display.
 * @param {string} city
 * @returns {Promise<{temperature: number, humidity: number, conditions: string, icon: string, cityName: string}>}
 */
export async function fetchWeatherByCity(city) {
  if (!API_KEY) {
    throw new Error(
      'Missing OpenWeatherMap API key. Add VITE_OPENWEATHER_API_KEY to your .env file.'
    );
  }

  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  });

  const data = response.data;

  return {
    temperature: data.main.temp,
    humidity: data.main.humidity,
    conditions: data.weather[0].description,
    icon: data.weather[0].icon,
    cityName: data.name,
  };
}
