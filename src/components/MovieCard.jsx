import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => (
  <Link to={`/movie/${movie.imdbID}`} className="movie-card">
    <img src={movie.Poster} alt={movie.Title} />
    <h4>{movie.Title}</h4>
    <p>{movie.Year}</p>
  </Link>
);

export default MovieCard;
