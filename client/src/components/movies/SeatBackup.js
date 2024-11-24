import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import "./SeatBooking.css";
import { styled } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ComBoDialog from "./MovieUtilities/ComboDialog";

const SeatBooking = () => {

    const StyledButton = styled(Button)(({ theme, typeName }) => ({
        width: "20px", // Set width
        height: "40px", // Set height (same as width for a square)
        borderRadius: "4px", // Slight rounding for the square effect
        fontSize: "12px", // Smaller font for seat labels
        textTransform: "none",
        color: theme.palette.text.primary,
        borderColor: theme.palette.primary.main,
        color: "white",
        backgroundColor: typeName === "VIP" ? theme.palette.error.light : theme.palette.info.light,
        "&:hover": {
            backgroundColor: typeName === "VIP" ? theme.palette.error.dark : theme.palette.info.dark,
        },
        "&.selected": {
            backgroundColor: "rgba(212, 42, 135, 1)", // Selected background color
            borderColor: "rgba(255, 255, 255, 1)", // Selected border color
            color: "rgba(255, 255, 255, 1)", // Selected text color
        },
    }));
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [groupedSeats, setGroupedSeats] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [isComBoDialogOpen, setIsComboDialogOpen] = useState(false);
    const location = useLocation();
    const { hallId, hallName, Movie, Show,  showTime, showPrice} = location.state || {};
    const { movieId, showId} = useParams();
    console.log(Show)
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
                const seatsData = response.data;
                const grouped = seatsData.reduce((acc, seat) => {
                    const row = seat.SeatName[0];
                    if (!acc[row]){
                        acc[row] = [];
                    }
                    acc[row].push(seat);
                    return acc;
                }, {});

                setGroupedSeats(grouped);
            } catch (error) {}
        };
        fetchSeatsForHall();
    }, [movieId, hallId, showId]);

    const handleSelectedSeat = (seatId, seatPrice) => {
        setSelectedSeat((previousSelectedSeat) => {
            const isAlreadySelected = previousSelectedSeat.includes(seatId);
            if (isAlreadySelected){
                setTotalPrice((prevTotal) => prevTotal - seatPrice);
                return previousSelectedSeat.filter((id) => id != seatId)
            }else {
                setTotalPrice((prevTotal) => prevTotal + seatPrice);
                return [...previousSelectedSeat, seatId];
            }
        })
    }

    const handleComboDialog = () => {
        setIsComboDialogOpen(true);
    }

    const handleCloseComboDialog = () => {
        setIsComboDialogOpen(false);
    }

    return (
        <div className="hall-container">
            <div className="screen-box">
                <div className="cinema-screen"></div>
                <span>SCREEN</span>
            </div>
            <div className="booking-container">
            {Object.keys(groupedSeats).length === 0 ? (
                    <div>There is no seat to show</div>
                ) : (
                    <div className="seat-container">
                        {Object.keys(groupedSeats).map((row) => (
                            <div className="seat-row" key={row}>
                                {groupedSeats[row].map((seat) => (
                                    <StyledButton
                                        key={seat.Id}
                                        className={selectedSeat.includes(seat.Id) ? "selected" : ""}
                                        typeName = {seat.TypeName}
                                        variant="outlined"
                                        onClick={() => handleSelectedSeat(seat.Id, seat.Price)}
                                    >
                                        {seat.SeatName}
                                    </StyledButton>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
                <div className="cart-container">
                    <div className="movie-information">
                        <div className="movie-image">
                            <img  src={`${process.env.REACT_APP_API_URL}/${Movie.Poster}`} alt="" />
                        </div>
                        <div className="movie-detail">
                            <span>Movie Name: {Movie.Title}</span>
                        </div>
                    </div>
                    <div className="show-information">
                        <span>Cinema: {Show.theater}</span>
                        <span>Show Time: {showTime}</span>
                        <span>Hall: {hallName}</span>
                    </div>
                    <div className="bill-information">
                        <span>Ticket: {totalPrice + (selectedSeat.length * showPrice)}</span>
                        <span>Combo: </span>
                        <span>Total: </span>
                    </div>
                    <div className="cart-button">
                        <Button variant="contained" onClick={handleComboDialog}>Continue <ArrowForwardIcon /></Button>
                    </div>
                </div>
            </div>
            <ComBoDialog open={isComBoDialogOpen} onClose={handleCloseComboDialog} />
        </div>
    );
};

export default SeatBooking;
