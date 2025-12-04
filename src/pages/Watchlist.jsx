import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

const Watchlist = ({ dark }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(list);
  }, []);

  const containerStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '100px auto',
    fontFamily: 'sans-serif',
    color: dark ? '#e5e7eb' : '#111827',
  };

  const headerStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    textAlign: 'center',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1.5rem',
  };

  const emptyStyle = {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: dark ? '#9ca3af' : '#6b7280',
    marginTop: '2rem',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>⭐ My Watchlist</h2>

      {watchlist.length === 0 ? (
        <p style={emptyStyle}>You haven’t added any movies yet.</p>
      ) : (
        <div style={gridStyle}>
          {watchlist.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
