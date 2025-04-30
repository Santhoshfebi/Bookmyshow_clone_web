import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [dark, setDark] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    document.body.className = dark ? 'dark' : '';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <nav className="navbar">
      <h1>🎟 BookMyShow Clone</h1>
      <div className=''><Link to="/watchlist">⭐ Watchlist</Link>
      <Link to="/seatbooking">🎫 Seat Booking</Link>
      <Link to="/mybookings">📚 My Bookings</Link>

      <button onClick={() => setDark(!dark)}>
        {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      </div>
    </nav>
  );
};

export default Navbar;
