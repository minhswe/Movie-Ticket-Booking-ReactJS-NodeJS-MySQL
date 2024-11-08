import React from "react";
import Button from "@mui/material/Button";
import "./ShowSection.css";

const ShowSection = ({ Show }) => {
    console.log(Show);
    return (
        <div className="show-section-container">
            <div className="cinema-location">
                <span>{Show.theater}</span>
                <span>{Show.location}</span>
            </div>
            <div className="show-time">
                {Show.times.map((time, index) => (
                    <Button
                        key={index}
                        variant="contained"
                        sx={{ padding: "14px 10px", marginRight: "20px", width: "120px" }}
                    >
                        {time}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default ShowSection;
