import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(list);
  }, []);

  return (
    <div className="home">
      <h2>My Watchlist</h2>
      {watchlist.length === 0 ? <p>No movies added yet.</p> : (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
