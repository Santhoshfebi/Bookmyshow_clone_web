import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [dark, setDark] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );
  const location = useLocation();

  useEffect(() => {
    document.body.className = dark ? 'dark' : '';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const navItems = [
    { path: '/', label: ' Home' },
    { path: '/watchlist', label: ' Watchlist' },
    { path: '/mybookings', label: ' My Bookings' },
  ];

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 50,
    backdropFilter: 'blur(10px)',
    backgroundColor: dark ? 'rgba(17, 24, 39, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    borderBottom: dark ? '1px solid rgba(107, 114, 128, 0.5)' : '1px solid rgba(255,255,255,0.3)',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#06b6d4',
  };

  const navLinkStyle = (active) => ({
    padding: '8px 16px',
    borderRadius: '9999px',
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none',
    color: active ? '#06b6d4' : dark ? '#e5e7eb' : '#1f2937',
    backgroundColor: active ? (dark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.2)') : 'transparent',
    transition: 'all 0.3s',
    marginRight: '8px',
  });

  const buttonStyle = {
    padding: '8px 16px',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    backgroundColor: dark ? 'rgba(31, 41, 55, 0.3)' : 'rgba(255,255,255,0.3)',
    color: dark ? '#e5e7eb' : '#1f2937',
    transition: 'all 0.3s',
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        {/* Logo / Title */}
        <h1 style={logoStyle}>🎟 BookMyShow Clone</h1>

        {/* Links + Dark Mode Toggle */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={navLinkStyle(location.pathname === item.path)}
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={() => setDark(!dark)}
            style={buttonStyle}
          >
            {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
