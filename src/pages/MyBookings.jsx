import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const MyBookings = () => {
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

    return (
        <div style={{ padding: '2rem' }}>
            <h2>🎟 My Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {bookings.map((booking, index) => (
                        <li key={index} style={{
                            background: '#f4f4f4',
                            marginBottom: '1rem',
                            padding: '1rem',
                            borderRadius: '8px'
                        }}>
                            <h3>{booking.movieTitle}</h3>
                            <p><strong>Seats:</strong> {booking.seats.join(', ')}</p>
                            <p><small>Booked on: {new Date(booking.timestamp).toLocaleString()}</small></p>
                            <button
                                style={{
                                    marginTop: '0.5rem',
                                    backgroundColor: '#c62828',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
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
                        style={{
                            position: 'fixed',
                            top: 0, left: 0,
                            width: '100vw', height: '100vh',
                            background: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 1000
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                background: 'white',
                                padding: '2rem',
                                borderRadius: '8px',
                                width: '90%',
                                maxWidth: '400px',
                                textAlign: 'center',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                            }}
                        >
                            <h3>Are you sure?</h3>
                            <p>You’re about to cancel your booking. This action cannot be undone.</p>
                            <div style={{ marginTop: '1.5rem' }}>
                                <button
                                    onClick={confirmCancel}
                                    style={{
                                        marginRight: '1rem',
                                        padding: '0.5rem 1rem',
                                        background: '#d32f2f',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Yes, Cancel
                                </button>
                                <button
                                    onClick={cancelModal}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: '#ccc',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}
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
