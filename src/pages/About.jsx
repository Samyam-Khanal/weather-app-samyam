const STACK = [
  { name: 'React', role: 'UI library' },
  { name: 'React Router', role: 'Client-side routing' },
  { name: 'Axios', role: 'HTTP client for API calls' },
  { name: 'Vite', role: 'Build tool & dev server' },
  { name: 'OpenWeatherMap API', role: 'Live weather data source' },
  { name: 'Browser Local Storage', role: 'Preference persistence' },
];

export default function About() {
  return (
    <div className="page">
      <h1 className="page-title">About this app</h1>
      <p className="page-subtitle">
        Skyline is a small, single-page weather dashboard built to demonstrate
        client-side routing, asynchronous data fetching, and persisted user
        preferences.
      </p>

      <ul className="stack-list">
        {STACK.map((item) => (
          <li key={item.name}>
            <span className="stack-name">{item.name}</span>
            <span className="stack-role">{item.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
