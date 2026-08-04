# Skyline — Multi-Page Weather App

A responsive, client-side weather dashboard built with React, React Router,
and the OpenWeatherMap API. Preferences (temperature unit and light/dark
theme) persist across refreshes using the browser's Local Storage.

## Features

- **Three routed views**: Home (`/`) dashboard, About (`/about`), and
  Contact (`/contact`), all sharing a single `<Navbar>` with no full-page
  reloads.
- **Live weather**: fetches current conditions for a default city on mount,
  and again whenever a new city is picked from the dropdown (6 cities
  available).
- **Persistent preferences**: Celsius/Fahrenheit and Dark/Light theme are
  both stored in `localStorage` and restored on reload.
- **Accessible contact form**: Name, Email, and Message fields each have an
  explicitly paired `<label htmlFor>`.

## API choice

This app uses the **OpenWeatherMap Current Weather Data API**
(`/data/2.5/weather`). It was chosen because it's free for low-volume use,
returns temperature, humidity, and condition text in a single call, and is
one of the two APIs suggested by the assignment brief.

## Local setup

1. **Clone and install dependencies**

   ```bash
   git clone <your-repo-url>
   cd weather-app
   npm install
   ```

2. **Get an API key**

   Sign up for a free account at
   [openweathermap.org/api](https://openweathermap.org/api) and generate an
   API key under your account's API keys tab. New keys can take up to a
   couple of hours to activate.

3. **Configure environment variables**

   Copy the example file and paste in your key:

   ```bash
   cp .env.example .env
   ```

   `.env`:

   ```
   VITE_OPENWEATHER_API_KEY=your_actual_key_here
   ```

   `.env` is gitignored and should never be committed.

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open the printed local URL (typically `http://localhost:5173`).

5. **Build for production**

   ```bash
   npm run build
   npm run preview
   ```

## Environment variables

| Variable                     | Required | Description                                   |
| ----------------------------- | -------- | ---------------------------------------------- |
| `VITE_OPENWEATHER_API_KEY`   | Yes      | Free API key from OpenWeatherMap, used for all weather requests. |

## Project structure

```
src/
  components/
    Navbar.jsx        # Shared nav bar across all routes
  pages/
    Home.jsx           # Dashboard: fetch on mount + city selector
    About.jsx           # Static build-stack overview
    Contact.jsx          # Accessible contact form
  hooks/
    useLocalStorage.js  # Generic localStorage-synced state hook
  services/
    weatherService.js   # OpenWeatherMap API wrapper (axios)
  App.jsx               # Routes + theme state
  main.jsx              # Entry point, wraps App in BrowserRouter
```

## Notes on avoiding infinite render loops

- The city-weather `useEffect` in `Home.jsx` depends only on `city`, and
  uses an `isCancelled` flag to avoid setting state after unmount or after a
  newer request has started.
- Preferences use a single reusable `useLocalStorage` hook rather than
  duplicated `useEffect`/`localStorage` calls in every component, so state
  and storage stay in sync in one place.
