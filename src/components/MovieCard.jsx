import { Link } from 'react-router-dom';

const MovieCard = ({ movie, dark }) => {
  const cardStyle = {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: dark ? '#1f2937' : '#ffffff',
    boxShadow: dark
      ? '0 4px 16px rgba(0,0,0,0.7)'
      : '0 4px 16px rgba(0,0,0,0.15)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  };

  const imgStyle = {
    width: '100%',
    height: '260px',
    objectFit: 'cover',
    display: 'block',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4f46e5',
    color: 'white',
    fontWeight: '600',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
  };

  const contentStyle = {
    padding: '12px 16px',
    backgroundColor: dark ? '#111827' : '#fff',
  };

  const titleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: dark ? '#e5e7eb' : '#111827',
    marginBottom: '4px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const yearStyle = {
    fontSize: '14px',
    color: dark ? '#9ca3af' : '#6b7280',
    marginBottom: '6px',
  };

  const ratingStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#f59e0b', // amber for stars
    marginBottom: '6px',
  };

  const genreStyle = {
    display: 'inline-block',
    backgroundColor: '#10b981', // teal for genre badges
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '12px',
    marginRight: '4px',
    marginBottom: '4px',
  };

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      style={cardStyle}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = dark
          ? '0 8px 24px rgba(0,0,0,0.8)'
          : '0 8px 24px rgba(0,0,0,0.25)';
        const overlay = e.currentTarget.querySelector('.overlay');
        overlay.style.opacity = 1;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = dark
          ? '0 4px 16px rgba(0,0,0,0.7)'
          : '0 4px 16px rgba(0,0,0,0.15)';
        const overlay = e.currentTarget.querySelector('.overlay');
        overlay.style.opacity = 0;
      }}
    >
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
        alt={movie.Title}
        style={imgStyle}
      />

      {/* Hover Overlay */}
      <div className="overlay" style={overlayStyle}>
        <button style={buttonStyle}>🎟 Book Now</button>
      </div>

      {/* Card Content */}
      <div style={contentStyle}>
        <h4 style={titleStyle}>{movie.Title}</h4>
        <p style={yearStyle}>{movie.Year}</p>
        {movie.imdbRating && <p style={ratingStyle}>⭐ {movie.imdbRating}</p>}
        {movie.Genre &&
          movie.Genre.split(',').map((g, i) => (
            <span key={i} style={genreStyle}>
              {g.trim()}
            </span>
          ))}
      </div>
    </Link>
  );
};

export default MovieCard;
