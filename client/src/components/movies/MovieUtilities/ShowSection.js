import React from "react";
import Button from "@mui/material/Button";
import "./ShowSection.css";
import "../../../api/axios";
import { useNavigate } from "react-router-dom";

const ShowSection = ({ Show, movieId }) => {
    console.log(Show)
    const navigate = useNavigate();
    const handleClick = (hallId, showId) => {
        navigate(`/booking-ticket/movie/${movieId}/show/${showId}`, { state: { hallId, showId } });
    } 
    return (
        <div className="show-section-container">
            <div className="cinema-location">
                <span className="theater-infor">{Show.theater}</span>
                <span>{Show.location}</span>
            </div>
            <div className="show-time">
                {Show.times.map((timeObject, index) => (
                    <Button
                        key={index}
                        variant="contained"
                        sx={{ padding: "14px 10px", marginRight: "20px", width: "120px" }}
                        onClick={() => handleClick(timeObject.hallId, timeObject.showId)}
                    >
                        {timeObject.time}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default ShowSection;
