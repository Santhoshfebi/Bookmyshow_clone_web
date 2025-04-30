import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovieDetails } from '../api';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        getMovieDetails(id).then(res => setMovie(res.data));
    }, [id]);

    if (!movie) return <div>Loading...</div>;

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


    return (
        <div className="movie-details">
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt={movie.Title} />
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>Release:</strong> {movie.Released}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
            <button onClick={addToWatchlist}>⭐ Add to Watchlist</button>
            <Link to={`/movie/${id}/book`}>
                <button style={{ marginTop: '1rem' }}>🎟 Book Seats</button>
            </Link>

        </div>
    );
};

export default MovieDetails;
