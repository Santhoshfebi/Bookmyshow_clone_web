import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../api";
import { Link } from 'react-router-dom';

const SeatBooking = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [lockedSeats, setLockedSeats] = useState([]);
    const [step, setStep] = useState("select");

    const seatPrice = 150;
    const seats = Array.from({ length: 40 }, (_, i) => i + 1);

    // Load movie and locked seats
    useEffect(() => {
        getMovieDetails(id).then((res) => setMovie(res.data));

        const allLocked = JSON.parse(localStorage.getItem("lockedSeats")) || {};
        setLockedSeats(allLocked[id] || []);
    }, [id]);

    // Toggle seat selection
    const toggleSeat = (seat) => {
        if (lockedSeats.includes(seat)) return; // can't select locked
        setSelectedSeats((prev) =>
            prev.includes(seat)
                ? prev.filter((s) => s !== seat)
                : [...prev, seat]
        );
    };

    const handleProceedToPayment = () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat to proceed with your booking.");
            return;
        }
        setStep("payment");
    };

    const handleSimulatePayment = () => {
        const bookingInfo = {
            movieId: id,
            movieTitle: movie.Title,
            seats: selectedSeats,
            timestamp: new Date().toISOString(),
        };

        // Save booking
        const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
        localStorage.setItem("bookings", JSON.stringify([...existingBookings, bookingInfo]));
        localStorage.setItem("lastBooking", JSON.stringify(bookingInfo));

        // Lock seats
        const allLocked = JSON.parse(localStorage.getItem("lockedSeats")) || {};
        const currentLocked = allLocked[id] || [];
        const updatedLocked = Array.from(new Set([...currentLocked, ...selectedSeats]));
        allLocked[id] = updatedLocked;
        localStorage.setItem("lockedSeats", JSON.stringify(allLocked));
        setLockedSeats(updatedLocked);

        setStep("done");
    };

    if (!movie) return <div>Loading movie details...</div>;

    const total = selectedSeats.length * seatPrice;

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>🎟 Book Seats for {movie.Title}</h2>

            {step === "select" && (
                <>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(8, 1fr)",
                            gap: "10px",
                            maxWidth: "500px",
                            margin: "1rem auto",
                        }}
                    >
                        {seats.map((seat) => {
                            const isSelected = selectedSeats.includes(seat);
                            const isLocked = lockedSeats.includes(seat);
                            return (
                                <div
                                    key={seat}
                                    onClick={() => toggleSeat(seat)}
                                    style={{
                                        padding: "10px",
                                        borderRadius: "5px",
                                        backgroundColor: isLocked
                                            ? "#888"
                                            : isSelected
                                                ? "#2e7d32"
                                                : "#ccc",
                                        color: isLocked ? "white" : "black",
                                        cursor: isLocked ? "not-allowed" : "pointer",
                                        opacity: isLocked ? 0.6 : 1,
                                    }}
                                >
                                    {seat}
                                </div>
                            );
                        })}
                    </div>
                    <p>Total: ₹{total}</p>
                    <button
                        onClick={handleProceedToPayment}
                        style={{
                            marginTop: "1rem",
                            padding: "0.7rem 1.5rem",
                            fontSize: "1rem",
                            background: "#f84464",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                        }}
                    >
                        Proceed to Pay
                    </button>
                </>
            )}

            {step === "payment" && (
                <div style={{ marginTop: "1rem" }}>
                    <h3>💳 Simulated Payment</h3>
                    <p>Amount: ₹{total}</p>
                    <button
                        onClick={handleSimulatePayment}
                        style={{
                            padding: "0.7rem 1.5rem",
                            fontSize: "1rem",
                            background: "#2e7d32",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                        }}
                    >
                        Confirm Payment
                    </button>
                </div>
            )}

            {step === "done" && (
                <div style={{ marginTop: "2rem" }}>
                    <h3>✅ Booking Confirmed!</h3>
                    <p>
                        <strong>Movie:</strong> {movie.Title}
                    </p>
                    <p>
                        <strong>Seats:</strong> {selectedSeats.join(", ")}
                    </p>
                    <p>Total Paid: ₹{total}</p>

                    <Link to={`/`}>
                        <button style={{ marginTop: '1rem' }}> Back to Home </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SeatBooking;
