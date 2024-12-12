import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./SeatBooking.css";
import { styled } from "@mui/material";
import {bookingApi} from "../../api/axios";

const SeatBooking = ({
    selectedSeat,
    setSelectedSeat,
    groupedSeats,
    setGroupedSeats,
    ticketPrice,
    setTicketPrice,
    showId
}) => {

    const [seatNotAvailable, setSeatNotAvailable] = useState([]);

    const StyledButton = styled(({ typeName, ...props }) => (
        <Button {...props} />
    ))(({ theme, typeName }) => ({
        width: "20px",
        height: "40px",
        borderRadius: "4px",
        fontSize: "12px",
        textTransform: "none",
        color: theme.palette.text.primary,
        borderColor: theme.palette.primary.main,
        color: "white",
        backgroundColor:
            typeName === "VIP"
                ? theme.palette.error.light
                : theme.palette.info.light,
        "&:hover": {
            backgroundColor:
                typeName === "VIP"
                    ? theme.palette.error.dark
                    : theme.palette.info.dark,
        },
        "&.selected": {
            backgroundColor: "rgba(212, 42, 135, 1)",
            borderColor: "rgba(255, 255, 255, 1)",
            color: "rgba(255, 255, 255, 1)",
        },
        "&.disabled": {
            backgroundColor: "gray !important",
            color: "lightgray !important",
            cursor: "not-allowed",
            pointerEvents: "none", // Disable interaction
        },
    }));

    const handleSelectedSeat = (seatId, seatName, seatPrice) => {
        setSelectedSeat((previousSelectedSeat) => {
            const isAlreadySelected = previousSelectedSeat.some(
                (seat) => seat.seatId === seatId
            );
            if (isAlreadySelected) {
                setTicketPrice((prevTotal) => prevTotal - seatPrice);
                return previousSelectedSeat.filter(
                    (seat) => seat.seatId !== seatId
                );
            } else {
                setTicketPrice((prevTotal) => prevTotal + seatPrice);
                return [
                    ...previousSelectedSeat,
                    { seatId, seatName, seatPrice },
                ];
            }
        });
    };

    const findSeatNotAvailable = async () => {
        try {
            // Make a GET request to the server with the showId as a query parameter
            const response = await bookingApi.get("/findSeatNotAvailable", {
                params: { showId: showId },
            });
    
            // Process the response
            if (response.status === 200) {
                // console.log("Seats not available:", response.data.seats);
                setSeatNotAvailable(response.data.seats); 
                console.log(response.data.seats)
            } else {
                console.error("Unexpected response status:", response.status);
                return [];
            }
        } catch (error) {
            // Handle errors
            console.error("Error fetching unavailable seats:", error);
            return [];
        }
    }

    useEffect(() => {
        findSeatNotAvailable();
    }, []);



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
                                        className={`${selectedSeat.some(
                                            (selected) => selected.seatId === seat.Id

                                        ) ? "selected" : ""} ${seatNotAvailable.some(
                                            (unavailableSeat) => unavailableSeat.SeatId === seat.Id
                                        ) ? "disabled" : ""}`}
                                        typeName={seat.TypeName}
                                        variant="outlined"
                                        onClick={() =>
                                            handleSelectedSeat(
                                                seat.Id,
                                                seat.SeatName,
                                                seat.Price
                                            )
                                        }
                                    >
                                        {seat.SeatName}
                                    </StyledButton>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeatBooking;
