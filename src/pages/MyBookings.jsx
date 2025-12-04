import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MyBookings = ({ dark }) => {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(stored);
  }, []);

  const openModal = (index) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  const confirmCancel = () => {
    const updatedBookings = bookings.filter((_, i) => i !== selectedIndex);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    setShowModal(false);
    setSelectedIndex(null);
  };

  const cancelModal = () => {
    setShowModal(false);
    setSelectedIndex(null);
  };

  const containerStyle = {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '100px auto',

    fontFamily: 'sans-serif',
    color: dark ? '#e5e7eb' : '#111827',
    minHeight: '100vh',
    backgroundColor: dark ? '#111827' : '#f3f4f6',
    transition: 'background-color 0.3s',
  };

  const headerStyle = { fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem' };

  const cardStyle = {
    backgroundColor: dark ? '#1f2937' : '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: dark
      ? '0 4px 12px rgba(0,0,0,0.7)'
      : '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  };

  const cardHoverStyle = {
    transform: 'scale(1.02)',
    boxShadow: dark
      ? '0 8px 24px rgba(0,0,0,0.8)'
      : '0 8px 24px rgba(0,0,0,0.15)',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s',
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ef4444',
    color: '#fff',
  };

  const modalBackgroundStyle = {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: dark ? '#1f2937' : '#fff',
    padding: '2rem',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center',
    boxShadow: dark
      ? '0 8px 24px rgba(0,0,0,0.7)'
      : '0 8px 24px rgba(0,0,0,0.2)',
    color: dark ? '#e5e7eb' : '#111827',
  };

  const modalButtonStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    margin: '0 0.5rem',
    transition: 'all 0.3s',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>🎟 My Bookings</h2>

      {bookings.length === 0 ? (
        <p style={{ fontSize: '1.1rem', color: dark ? '#9ca3af' : '#6b7280' }}>
          You have no bookings yet.
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {bookings.map((booking, index) => (
            <li
              key={index}
              style={cardStyle}
              onMouseEnter={e => Object.assign(e.currentTarget.style, cardHoverStyle)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, cardStyle)}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{booking.movieTitle}</h3>
              <p><strong>Seats:</strong> {booking.seats.join(', ')}</p>
              <p><small>Booked on: {new Date(booking.timestamp).toLocaleString()}</small></p>
              <button
                style={cancelButtonStyle}
                onClick={() => openModal(index)}
              >
                ❌ Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={modalBackgroundStyle}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={modalStyle}
            >
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Are you sure?</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                You’re about to cancel your booking. This action cannot be undone.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={confirmCancel}
                  style={{ ...modalButtonStyle, backgroundColor: '#ef4444', color: '#fff' }}
                >
                  Yes, Cancel
                </button>
                <button
                  onClick={cancelModal}
                  style={{ ...modalButtonStyle, backgroundColor: '#ccc', color: '#111827' }}
                >
                  No, Go Back
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyBookings;
