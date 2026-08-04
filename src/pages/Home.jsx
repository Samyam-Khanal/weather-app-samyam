import { useEffect, useState } from 'react';
import { fetchWeatherByCity } from '../services/weatherService';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CITIES = ['Kathmandu', 'London', 'New York', 'Tokyo', 'Sydney', 'Cairo'];
const DEFAULT_CITY = CITIES[0];

function celsiusToFahrenheit(celsius) {
  return celsius * (9 / 5) + 32;
}

export default function Home() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [unit, setUnit] = useLocalStorage('weather-unit', 'C');

  // Fetch on mount, and again whenever the selected city changes.
  useEffect(() => {
    let isCancelled = false;

    async function loadWeather() {
      setStatus('loading');
      try {
        const data = await fetchWeatherByCity(city);
        if (!isCancelled) {
          setWeather(data);
          setStatus('ready');
        }
      } catch (err) {
        if (!isCancelled) {
          setErrorMessage(err.message || 'Could not fetch weather data.');
          setStatus('error');
        }
      }
    }

    loadWeather();

    return () => {
      isCancelled = true;
    };
  }, [city]);

  const displayTemp =
    weather && typeof weather.temperature === 'number'
      ? unit === 'C'
        ? Math.round(weather.temperature)
        : Math.round(celsiusToFahrenheit(weather.temperature))
      : null;

  return (
    <div className="page">
      <h1 className="page-title">Current conditions</h1>
      <p className="page-subtitle">
        Live readings pulled from OpenWeatherMap for any of the cities below.
      </p>

      <section className="hero">
        <div className="hero-top-row">
          <div>
            <p className="hero-eyebrow">Location</p>
            <h2 className="hero-city-name">
              {weather ? weather.cityName : city}
            </h2>
          </div>
          <select
            className="hero-city-select"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-label="Select a city"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {status === 'loading' && (
          <p className="hero-status">Fetching latest weather…</p>
        )}

        {status === 'error' && (
          <p className="hero-status error">{errorMessage}</p>
        )}

        {status === 'ready' && weather && (
          <div className="hero-reading">
            <span className="hero-temp">
              {displayTemp}°{unit}
            </span>
            <span className="hero-condition">{weather.conditions}</span>
          </div>
        )}
      </section>

      {status === 'ready' && weather && (
        <div className="stat-grid">
          <div className="stat-card">
            <p className="stat-label">Humidity</p>
            <p className="stat-value">{weather.humidity}%</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Conditions</p>
            <p className="stat-value">{weather.conditions}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Unit</p>
            <p className="stat-value">Degrees {unit === 'C' ? 'Celsius' : 'Fahrenheit'}</p>
          </div>
        </div>
      )}

      <section className="prefs-panel">
        <span className="prefs-label">Temperature unit</span>
        <div className="unit-toggle" role="group" aria-label="Temperature unit toggle">
          <button
            type="button"
            className={unit === 'C' ? 'active' : ''}
            onClick={() => setUnit('C')}
          >
            Celsius
          </button>
          <button
            type="button"
            className={unit === 'F' ? 'active' : ''}
            onClick={() => setUnit('F')}
          >
            Fahrenheit
          </button>
        </div>
      </section>
    </div>
  );
}
