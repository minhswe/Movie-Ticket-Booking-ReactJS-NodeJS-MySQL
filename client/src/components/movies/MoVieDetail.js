import React from "react";
import { useLocation } from "react-router-dom";
import "./MoVieDetail.css"
import Button from '@mui/material/Button';
import YoutubeEmbed from "./YoutubeEmbed";
const MoVieDetail = () => {
    const location = useLocation();
    const {Movie} = location.state || {};
    console.log(Movie)
    console.log(`${process.env.REACT_APP_API_URL}/${Movie.Poster}`);

    if (!Movie) {
        return <div>No movie details available.</div>; // Handle case where movie is not passed
    }
    return (
        <div className="detail-container">
            <div className="detail-wrapper">
                <div className="movie-detail-title">
                    <h1>Movie Details</h1>
                </div>
                <div className="content-wrapper">
                    <div className="poster-content">
                        <img src={`${process.env.REACT_APP_API_URL}/${Movie.Poster}`} alt="Poster" />
                        <Button variant="contained">Booking</Button>
                    </div>
                    <div className="detail-content">
                        <div className="detail-content-title">
                        <h2>{Movie.Title}</h2>
                        </div>
                        <span className="infor-bold">Genres: </span>
                        <span className="infor-bold">Release Date: <span className="infor-normal">{Movie.ReleaseDate}</span></span>
                        <span className="infor-bold">Running Time: <span className="infor-normal">{Movie.RunningTime}</span></span>
                        <span className="infor-bold">Description: <span className="infor-normal">{Movie.MovieDescription}</span></span>
                        <YoutubeEmbed url={Movie.Trailer} />
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default MoVieDetail;
