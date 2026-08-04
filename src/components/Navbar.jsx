import { NavLink } from 'react-router-dom';

export default function Navbar({ theme, onToggleTheme }) {
  const navClass = ({ isActive }) => (isActive ? 'active' : '');

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-brand">
        <span className="navbar-brand-mark" aria-hidden="true" />
        Skyline
      </NavLink>
      <nav>
        <ul className="navbar-links">
          <li>
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={navClass}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label="Toggle color theme"
      >
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </button>
    </header>
  );
}
