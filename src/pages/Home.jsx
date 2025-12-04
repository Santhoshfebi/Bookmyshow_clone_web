import { useEffect, useState } from 'react';
import { searchMovies } from '../api';
import MovieCard from '../components/MovieCard';

const Home = ({ dark }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('Avengers');
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    searchMovies(query).then(res => {
      if (res.data.Search) {
        setMovies(res.data.Search);
        setFeatured(res.data.Search[0]);
      }
    });
  }, [query]);

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
  };

  const heroStyle = {
    position: 'relative',
    height: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    borderRadius: '0 0 24px 24px',
    marginBottom: '40px',
  };

  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  };

  const heroContentStyle = {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
  };

  const searchBarStyle = {
    width: '100%',
    maxWidth: '600px',
    padding: '16px 24px',
    borderRadius: '50px',
    border: dark ? '1px solid #374151' : '1px solid #ccc',
    backgroundColor: dark ? '#1f2937' : '#fff',
    color: dark ? '#e5e7eb' : '#111827',
    boxShadow: dark ? '0 4px 12px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.1)',
    outline: 'none',
    fontSize: '16px',
  };

  const sectionTitleStyle = {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '24px',
    color: dark ? '#e5e7eb' : '#1f2937',
  };

  const movieGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '24px',
  };

  const pageStyle = {
    backgroundColor: dark ? '#111827' : '#f3f4f6',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    transition: 'background-color 0.3s',
    paddingTop: '80px', // leave space for navbar
  };

  return (
    <div style={pageStyle}>
      
      {/* Hero Section */}
      {featured && (
        <section
          style={{
            ...heroStyle,
            backgroundImage: `url(${featured.Poster !== 'N/A' ? featured.Poster : '/placeholder.png'})`,
          }}
        >
          <div style={overlayStyle}></div>
          <div style={heroContentStyle}>
            <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>{featured.Title}</h1>
            <p style={{ fontSize: '20px', marginBottom: '24px' }}>{featured.Year}</p>
            <button style={{
              padding: '12px 32px',
              backgroundColor: '#4f46e5',
              color: 'white',
              fontWeight: '600',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}>
              Book Now
            </button>
          </div>
        </section>
      )}

      {/* Search Bar */}
      <section style={containerStyle}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={searchBarStyle}
          />
        </div>
      </section>

      {/* Movie Grid */}
      <section style={containerStyle}>
        <h2 style={sectionTitleStyle}>Trending Movies</h2>
        <div style={movieGridStyle}>
          {movies.map(movie => (
            <div key={movie.imdbID} style={{
              backgroundColor: dark ? '#1f2937' : '#fff',
              borderRadius: '12px',
              boxShadow: dark ? '0 4px 12px rgba(0,0,0,0.6)' : '0 4px 12px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
