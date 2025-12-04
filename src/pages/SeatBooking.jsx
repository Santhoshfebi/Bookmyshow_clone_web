import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../api";

const SeatBooking = ({ dark }) => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [lockedSeats, setLockedSeats] = useState([]);
    const [step, setStep] = useState("select");

    const seatPrice = 150;
    const rows = ["A", "B", "C", "D", "E"];
    const seatsPerRow = 8;

    useEffect(() => {
        getMovieDetails(id).then((res) => setMovie(res.data));
        const allLocked = JSON.parse(localStorage.getItem("lockedSeats")) || {};
        setLockedSeats(allLocked[id] || []);
    }, [id]);

    const toggleSeat = (seatId) => {
        if (lockedSeats.includes(seatId)) return;
        setSelectedSeats((prev) =>
            prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
        );
    };

    const handleProceedToPayment = () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat.");
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

        const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
        localStorage.setItem("bookings", JSON.stringify([...existingBookings, bookingInfo]));
        localStorage.setItem("lastBooking", JSON.stringify(bookingInfo));

        const allLocked = JSON.parse(localStorage.getItem("lockedSeats")) || {};
        const currentLocked = allLocked[id] || [];
        allLocked[id] = Array.from(new Set([...currentLocked, ...selectedSeats]));
        localStorage.setItem("lockedSeats", JSON.stringify(allLocked));
        setLockedSeats(allLocked[id]);

        setStep("done");
    };

    if (!movie) return <div style={{ textAlign: "center", padding: "2rem", color: dark ? "#e5e7eb" : "#111827" }}>Loading movie details...</div>;

    const total = selectedSeats.length * seatPrice;

    const containerStyle = {
        padding: "2rem",
        maxWidth: "800px",
        margin: "100px auto",
        fontFamily: "sans-serif",
        color: dark ? "#e5e7eb" : "#111827",
    };

    const headerStyle = { fontSize: "2rem", fontWeight: "700", marginBottom: "1.5rem", textAlign: "center" };

    const hallStyle = {
        display: "grid",
        gridTemplateRows: `repeat(${rows.length}, auto)`,
        gap: "12px",
        justifyContent: "center",
        marginBottom: "1rem",
    };

    const rowStyle = { display: "grid", gridTemplateColumns: `repeat(${seatsPerRow}, 50px)`, gap: "10px" };

    const seatStyle = (seatId) => {
        const isSelected = selectedSeats.includes(seatId);
        const isLocked = lockedSeats.includes(seatId);
        return {
            padding: "10px",
            borderRadius: "6px",
            backgroundColor: isLocked ? "#6b7280" : isSelected ? "#4ade80" : dark ? "#374151" : "#e5e7eb",
            color: isLocked ? "#fff" : dark ? "#f3f4f6" : "#111827",
            cursor: isLocked ? "not-allowed" : "pointer",
            fontWeight: "600",
            textAlign: "center",
            userSelect: "none",
            transition: "all 0.2s",
            boxShadow: isSelected ? "0 0 10px #4ade80" : "none",
        };
    };

    const buttonStyle = {
        padding: "0.8rem 1.5rem",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontWeight: "600",
        transition: "all 0.3s",
        marginTop: "1rem",
    };

    const proceedButtonStyle = { ...buttonStyle, backgroundColor: "#f84464", color: "#fff" };
    const confirmButtonStyle = { ...buttonStyle, backgroundColor: "#4ade80", color: "#111827" };
    const cardStyle = { backgroundColor: dark ? "#1f2937" : "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: dark ? "0 4px 16px rgba(0,0,0,0.7)" : "0 4px 16px rgba(0,0,0,0.15)", marginTop: "2rem" };

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>🎟 Book Seats for {movie.Title}</h2>

            {step === "select" && (
                <>
                    <div style={hallStyle}>
                        {rows.map((row) => (
                            <div key={row} style={rowStyle}>
                                {Array.from({ length: seatsPerRow }, (_, i) => {
                                    const seatId = `${row}${i + 1}`;
                                    return (
                                        <div key={seatId} style={seatStyle(seatId)} onClick={() => toggleSeat(seatId)}>
                                            {seatId}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    <p style={{ fontWeight: "600", textAlign: "center" }}>Total: ₹{total}</p>
                    <div style={{ textAlign: "center" }}>
                        <button style={proceedButtonStyle} onClick={handleProceedToPayment}>Proceed to Pay</button>
                    </div>
                </>
            )}

            {step === "payment" && (
                <div
                    style={{
                        backgroundColor: dark ? "#1f2937" : "#fff",
                        padding: "2rem",
                        borderRadius: "16px",
                        maxWidth: "400px",
                        margin: "2rem auto",
                        boxShadow: dark
                            ? "0 8px 24px rgba(0,0,0,0.7)"
                            : "0 8px 24px rgba(0,0,0,0.15)",
                        textAlign: "center",
                        color: dark ? "#e5e7eb" : "#111827",
                        transition: "all 0.3s",
                        fontFamily: "sans-serif",
                    }}
                >
                    <h3 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "1rem" }}>💳 Payment</h3>

                    <p style={{ fontSize: "1rem", marginBottom: "1rem", color: dark ? "#9ca3af" : "#6b7280" }}>
                        You are about to pay for <strong>{selectedSeats.length}</strong> seat(s)
                    </p>

                    <div
                        style={{
                            backgroundColor: dark ? "#374151" : "#f3f4f6",
                            padding: "1rem",
                            borderRadius: "12px",
                            marginBottom: "1.5rem",
                            fontWeight: "600",
                            fontSize: "1.2rem",
                        }}
                    >
                        Total Amount: ₹{total}
                    </div>

                    <button
                        onClick={handleSimulatePayment}
                        style={{
                            padding: "0.8rem 1.5rem",
                            fontSize: "1rem",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: "600",
                            backgroundColor: "#4ade80",
                            color: "#111827",
                            transition: "all 0.3s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        Confirm Payment
                    </button>

                    <p style={{ fontSize: "0.85rem", marginTop: "1rem", color: dark ? "#9ca3af" : "#6b7280" }}>
                        Your payment is simulated. In a real application, integrate a payment gateway here.
                    </p>
                </div>
            )}

            {step === "done" && (
                <div
                    style={{
                        backgroundColor: dark ? "#1f2937" : "#fff",
                        padding: "2rem",
                        borderRadius: "16px",
                        maxWidth: "450px",
                        margin: "2rem auto",
                        boxShadow: dark
                            ? "0 8px 24px rgba(0,0,0,0.7)"
                            : "0 8px 24px rgba(0,0,0,0.15)",
                        textAlign: "center",
                        color: dark ? "#e5e7eb" : "#111827",
                        fontFamily: "sans-serif",
                        transition: "all 0.3s",
                    }}
                >
                    <div
                        style={{
                            fontSize: "3rem",
                            marginBottom: "1rem",
                            color: "#22c55e",
                        }}
                    >
                        ✅
                    </div>
                    <h3 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "1rem" }}>
                        Booking Confirmed!
                    </h3>

                    <div style={{ marginBottom: "1rem", lineHeight: "1.6" }}>
                        <p>
                            <strong>Movie:</strong> {movie.Title}
                        </p>
                        <p>
                            <strong>Seats:</strong> {selectedSeats.join(", ")}
                        </p>
                        <p>
                            <strong>Total Paid:</strong>{" "}
                            <span style={{ color: "#f59e0b", fontWeight: "700" }}>₹{total}</span>
                        </p>
                    </div>

                    <Link to="/">
                        <button
                            style={{
                                padding: "0.8rem 1.5rem",
                                fontSize: "1rem",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "600",
                                backgroundColor: "#4f46e5",
                                color: "#fff",
                                transition: "all 0.3s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        >
                            Back to Home
                        </button>
                    </Link>
                </div>
            )}

        </div>
    );
};

export default SeatBooking;
