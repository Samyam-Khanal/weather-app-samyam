import { useState, useEffect } from 'react';

/**
 * Persists a piece of state to localStorage so it survives refreshes/reboots.
 * @param {string} key - localStorage key
 * @param {*} initialValue - fallback value if nothing is stored yet
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.warn(`Could not read localStorage key "${key}":`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`Could not write localStorage key "${key}":`, err);
    }
  }, [key, value]);

  return [value, setValue];
}
