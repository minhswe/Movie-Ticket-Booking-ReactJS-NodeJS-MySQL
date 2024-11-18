import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import "./SeatBooking.css";
const SeatBooking = () => {
    const [seats, setSeats] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState([]);

    const location = useLocation();
    const { hallId } = location.state || {};
    const { movieId, showId } = useParams();
    console.log(movieId, showId);
    useEffect(() => {
        const fetchSeatsForHall = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `movies/movie/${movieId}/show/${showId}/seats`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            hallId: hallId,
                        },
                    }
                );
                console.log(response.data);
                setSeats(response.data);
            } catch (error) {}
        };
        fetchSeatsForHall();
    }, [movieId, hallId, showId]);

    const handleSelectedSeat = (seatId) => {
        setSelectedSeat((previousSelectedSeat) => 
            previousSelectedSeat.includes(seatId) ?
            previousSelectedSeat.filter((id) => id !== seatId) : 
            [...previousSelectedSeat, seatId]
        )
    }

    return (
        <div className="hall-container">
            <div className="screen-box">
                <div className="cinema-screen"></div>
                <span>SCREEN</span>
            </div>
            <div className="booking-container">
                {seats === null ? (
                    <div>There is no seat to show</div>
                ) : (
                    <div className="seat-container">
                        {seats.map((seat) => (
                            <div className="seat-row">
                                <Button key={seat.Id} variant="outlined" onClick={() => handleSelectedSeat(seat.Id)}>
                                    {seat.SeatName}
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeatBooking;
