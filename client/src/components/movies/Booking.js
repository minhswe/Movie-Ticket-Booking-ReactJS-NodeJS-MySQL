import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SeatBooking from "./SeatBooking";
import { useLocation, useParams } from "react-router-dom";
import "./Booking.css";
import axios from "../../api/axios";
import Snacks from "./Snacks";
import Slide from "@mui/material/Slide";
import Zoom from "@mui/material/Zoom";
import OrderConfirmation from "./OrderConfirmation";
const steps = ["Seat booking", "Snacks", "Order confirmation"];
const Booking = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [direction, setDirection] = useState("left");
    const [checked, setChecked] = useState(true);
    const handleSlide = () => {
        setChecked(!checked);
    };
    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    

    // const handleNext = () => {
    //     setChecked(true);
    //     let newSkipped = skipped;
    //     if (isStepSkipped(activeStep)) {
    //         newSkipped = new Set(newSkipped.values());
    //         newSkipped.delete(activeStep);
    //     }
    //     setDirection("left");
    //     setActiveStep((prevActiveStep) =>
    //         prevActiveStep + 1);
    //     setSkipped(newSkipped);
    // };

    const handleNext = () => {
        setChecked(false); // Start unmount animation
        setTimeout(() => {
            setDirection("left"); // Set direction for the next animation
            setActiveStep((prevStep) => prevStep + 1);
            setChecked(true); // Remount the new step
        }, 500); // Match the timeout duration of the `Slide` component
    };

    const handleBack = () => {
        setChecked(false); // Start unmount animation
        setTimeout(() => {
            setDirection("right"); // Set direction for the next animation
            setActiveStep((prevStep) => prevStep - 1);
            setChecked(true); // Remount the new step
        }, 500); // Match the timeout duration of the `Slide` component
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const [selectedSeat, setSelectedSeat] = useState([]);
    const [groupedSeats, setGroupedSeats] = useState({});
    const [ticketPrice, setTicketPrice] = useState(0);
    const [comboPrice, setComboPrice] = useState(0);
    const [selectedSnacks, setSelectedSnacks] = React.useState({});

    const location = useLocation();
    const { hallId, hallName, Movie, Show, showTime, showPrice } =
        location.state || {};
    const { movieId, showId } = useParams();
    // console.log(Show);
    // console.log(movieId, showId);
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
                // console.log(response.data);
                const seatsData = response.data;
                const grouped = seatsData.reduce((acc, seat) => {
                    const row = seat.SeatName[0];
                    if (!acc[row]) {
                        acc[row] = [];
                    }
                    acc[row].push(seat);
                    return acc;
                }, {});

                setGroupedSeats(grouped);
            } catch (error) {}
        };
        fetchSeatsForHall();
        console.log(selectedSeat, selectedSnacks);
    }, [movieId, hallId, showId, selectedSeat, selectedSnacks]);

    // useEffect(() => {
    //     // setChecked(true);
    //     setTimeout(() => {
    //         setChecked(true);
    //     }, 500);

    //     console.log("checked",checked);
    //     // return() => setChecked(false);
    //     // console.log("checked",checked);
    // }, [checked])

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <React.Fragment>
                        <Slide
                            direction={direction}
                            in={checked}
                            timeout={500}
                            mountOnEnter
                            unmountOnExit
                        >
                            <div>
                                <SeatBooking
                                    selectedSeat={selectedSeat}
                                    setSelectedSeat={setSelectedSeat}
                                    groupedSeats={groupedSeats}
                                    setGroupedSeats={setGroupedSeats}
                                    ticketPrice={ticketPrice}
                                    setTicketPrice={setTicketPrice}
                                />
                            </div>
                        </Slide>
                    </React.Fragment>
                );
            case 1:
                return (
                    <React.Fragment>
                        <Slide
                            direction={direction}
                            in={checked}
                            timeout={500}
                            mountOnEnter
                            unmountOnExit
                        >
                            <div>
                                <Snacks
                                    comboPrice={comboPrice}
                                    setComboPrice={setComboPrice}
                                    selectedSnacks={selectedSnacks}
                                    setSelectedSnacks={setSelectedSnacks}
                                />
                            </div>
                        </Slide>
                    </React.Fragment>
                );
            case 2:
                return (
                    <React.Fragment>
                        <Slide
                            direction={direction}
                            in={checked}
                            timeout={500}
                            mountOnEnter
                            unmountOnExit
                        >
                            <div>
                                <OrderConfirmation
                                    selectedSeat={selectedSeat}
                                    selectedSnacks={selectedSnacks} 
                                    showPrice={showPrice}
                                    total={ticketPrice +
                                        selectedSeat.length * showPrice +
                                        comboPrice}
                                />
                            </div>
                        </Slide>
                    </React.Fragment>
                );
            default:
                return <div>Unknown step</div>;
        }
    };

    const moneyFormat = (money) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(money);
    };

    return (
        <div className="booking-container">
            <div className="stepper-wrapper">
                <Box sx={{ width: "100%" }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption">
                                        Optional
                                    </Typography>
                                );
                            }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>
                                        {label}
                                    </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    pt: 2,
                                }}
                            >
                                <Box sx={{ flex: "1 1 auto" }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {/* <Slide
                                direction={direction}
                                in={checked}
                                timeout={500}
                                mountOnEnter
                                unmountOnExit
                            > */}
                            <div className="step-content">
                                {renderStepContent(activeStep)}
                            </div>
                            {/* </Slide> */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    pt: 2,
                                }}
                            >
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: "1 1 auto" }} />
                                {isStepOptional(activeStep) && (
                                    <Button
                                        color="inherit"
                                        onClick={handleSkip}
                                        sx={{ mr: 1 }}
                                    >
                                        Skip
                                    </Button>
                                )}
                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1
                                        ? "Finish"
                                        : "Next"}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Box>
            </div>
            <div className="cart-container">
                <div className="movie-information">
                    <div className="movie-image">
                        <img
                            src={`${process.env.REACT_APP_API_URL}/${Movie.Poster}`}
                            alt=""
                        />
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
                    <span>
                        Ticket:{" "}
                        {moneyFormat(
                            ticketPrice + selectedSeat.length * showPrice
                        )}
                    </span>
                    <span>Combo: {moneyFormat(comboPrice)}</span>
                    <span>
                        Total:{" "}
                        {moneyFormat(
                            ticketPrice +
                                selectedSeat.length * showPrice +
                                comboPrice
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Booking;
