import { useEffect, useState } from 'react';
import { searchMovies } from '../api';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('Avengers');

  useEffect(() => {
    searchMovies(query).then(res => {
      if (res.data.Search) setMovies(res.data.Search);
    });
  }, [query]);

  return (
    <div className="home">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-bar"
      />
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
