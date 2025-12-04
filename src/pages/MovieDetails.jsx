import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getMovieDetails, searchMovies } from '../api';
import MovieCard from '../components/MovieCard';

const MovieDetails = ({ dark }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    getMovieDetails(id).then(res => setMovie(res.data));
  }, [id]);

  // Fetch related movies based on genre
  useEffect(() => {
    if (movie?.Genre) {
      const mainGenre = movie.Genre.split(',')[0];
      searchMovies(mainGenre).then(res => {
        if (res.data.Search) {
          const filtered = res.data.Search.filter(m => m.imdbID !== movie.imdbID);
          setRelatedMovies(filtered);
        }
      });
    }
  }, [movie]);

  if (!movie) return <div style={{ textAlign: 'center', padding: '2rem', color: dark ? '#e5e7eb' : '#111827' }}>Loading...</div>;

  const containerStyle = {
    maxWidth: '1200px',
    margin: '2rem auto',
    marginTop: '100px',
    padding: '0 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    color: dark ? '#e5e7eb' : '#111827',
    fontFamily: 'sans-serif',
  };

  const flexStyle = { display: 'flex', flexDirection: 'row', gap: '2rem', flexWrap: 'wrap' };
  const posterStyle = { width: '100%', maxWidth: '350px', borderRadius: '12px', objectFit: 'cover', boxShadow: dark ? '0 8px 24px rgba(0,0,0,0.7)' : '0 8px 24px rgba(0,0,0,0.15)' };
  const textStyle = { flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '0.75rem' };
  const labelStyle = { fontWeight: '600', marginRight: '0.5rem' };
  const headerStyle = { fontSize: '32px', fontWeight: '700', marginBottom: '1rem' };
  const buttonStyle = { padding: '12px 24px', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontWeight: '600', transition: 'all 0.3s' };
  const watchlistButtonStyle = { ...buttonStyle, backgroundColor: '#f59e0b', color: '#fff' };
  const bookButtonStyle = { ...buttonStyle, backgroundColor: '#4f46e5', color: '#fff', marginTop: '0.5rem' };

  const addToWatchlist = () => {
    const existing = JSON.parse(localStorage.getItem('watchlist')) || [];
    const alreadyAdded = existing.find((m) => m.imdbID === movie.imdbID);
    if (!alreadyAdded) {
      localStorage.setItem('watchlist', JSON.stringify([...existing, movie]));
      alert('Added to watchlist!');
    } else {
      alert('Already in watchlist!');
    }
  };

  // Carousel navigation functions
  const scrollLeft = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const carouselWrapperStyle = {
    position: 'relative',
    marginTop: '2rem',
  };

  const carouselStyle = {
    display: 'flex',
    overflowX: 'auto',
    gap: '16px',
    scrollSnapType: 'x mandatory',
    scrollBehavior: 'smooth',
    paddingBottom: '8px',
  };

  const arrowButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: dark ? 'rgba(31,41,55,0.7)' : 'rgba(255,255,255,0.7)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
  };

  return (
    <div style={containerStyle}>
      {/* Movie Info */}
      <h2 style={headerStyle}>{movie.Title}</h2>
      <div style={flexStyle}>
        <img src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'} alt={movie.Title} style={posterStyle} />

        <div style={textStyle}>
          <p><span style={labelStyle}>Plot:</span> {movie.Plot}</p>
          <p><span style={labelStyle}>Release:</span> {movie.Released}</p>
          <p><span style={labelStyle}>Genre:</span> {movie.Genre}</p>
          <p><span style={labelStyle}>Director:</span> {movie.Director}</p>
          <p><span style={labelStyle}>Actors:</span> {movie.Actors}</p>
          <p><span style={labelStyle}>IMDB Rating:</span> ⭐ {movie.imdbRating}</p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <button style={watchlistButtonStyle} onClick={addToWatchlist}>⭐ Add to Watchlist</button>
            <Link to={`/movie/${id}/book`}><button style={bookButtonStyle}>🎟 Book Seats</button></Link>
          </div>
        </div>
      </div>

      {/* Related Movies Carousel */}
      {relatedMovies.length > 0 && (
        <div style={carouselWrapperStyle}>
          <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '1rem', color: dark ? '#e5e7eb' : '#111827' }}>
            Related Movies
          </h3>

          {/* Left Arrow */}
          <button style={{ ...arrowButtonStyle, left: '-20px' }} onClick={scrollLeft}>{'<'}</button>

          {/* Carousel */}
          <div ref={carouselRef} style={carouselStyle}>
            {relatedMovies.map((rm) => (
              <div key={rm.imdbID} style={{ minWidth: '180px', flex: '0 0 auto', scrollSnapAlign: 'start' }}>
                <MovieCard movie={rm} dark={dark} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button style={{ ...arrowButtonStyle, right: '-20px' }} onClick={scrollRight}>{'>'}</button>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
