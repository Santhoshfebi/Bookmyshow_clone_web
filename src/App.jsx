import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Navbar from './components/Navbar';
import SeatBooking from './pages/SeatBooking';
import Watchlist from './pages/Watchlist';
import MyBookings from './pages/MyBookings';
// import './index.css';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/movie/:id/book" element={<SeatBooking />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/mybookings" element={<MyBookings />} />
    </Routes>
  </Router>
);

export default App;
