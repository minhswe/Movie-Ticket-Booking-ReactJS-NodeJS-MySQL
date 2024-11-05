import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoVieDetail.css";
import Button from "@mui/material/Button";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import YoutubeEmbed from "./YoutubeEmbed";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormatReleaseDate from "../../utilities/FormatReleaseDate";
import FormatGenres from "../../utilities/FormatGenres";
const MoVieDetail = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const location = useLocation();
    const { Movie } = location.state || {};
    console.log(Movie);
    console.log(`${process.env.REACT_APP_API_URL}/${Movie.Poster}`);

    if (!Movie) {
        return <div>No movie details available.</div>; // Handle case where movie is not passed
    }

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };
    return (
        <div className="detail-container">
            <div className="detail-wrapper">
                <div className="movie-detail-title">
                    <h1>Movie Details</h1>
                </div>
                <div className="content-wrapper">
                    <div className="poster-content">
                        <PlayCircleOutlineIcon
                            sx={{
                                width: "100px",
                                height: "100px",
                                color: "rgba(255, 255, 255, 0.8)",
                                position: "absolute",
                                top: "25%",
                                left: "15%",
                                cursor: "pointer",
                            }}
                            onClick={handleDialogOpen}
                        />
                        <img
                            src={`${process.env.REACT_APP_API_URL}/${Movie.Poster}`}
                            alt="Poster"
                        />
                        <Button variant="contained">Booking</Button>
                    </div>
                    <div className="detail-content">
                        <div className="detail-content-title">
                            <h2>{Movie.Title}</h2>
                        </div>
                        <span className="infor-bold">Genres: 
                        <span className="infor-normal">
                                {FormatGenres(Movie)}
                            </span>
                        </span>
                        <span className="infor-bold">
                            Release Date:{" "}
                            <span className="infor-normal">
                                {FormatReleaseDate(Movie.ReleaseDate)}
                            </span>
                        </span>
                        <span className="infor-bold">
                            Running Time:{" "}
                            <span className="infor-normal">
                                {Movie.RunningTime}
                            </span>
                        </span>
                        <span className="infor-bold">
                            Description:{" "}
                            <span className="infor-normal">
                                {Movie.MovieDescription}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <Dialog
                maxWidth="md"
                fullWidth
                open={openDialog}
                onClose={handleDialogClose}
            >
                <DialogContent>
                    <YoutubeEmbed url={Movie.Trailer} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MoVieDetail;
