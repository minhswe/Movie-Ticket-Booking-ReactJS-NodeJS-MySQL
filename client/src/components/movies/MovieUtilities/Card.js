import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import FormatReleaseDate from "../../../utilities/FormatReleaseDate";
import FormatGenres from "../../../utilities/FormatGenres";
import "./Card.css";
export default function MediaCard({ Movie }) {
    const navigate = useNavigate();
    const handleClick = (Movie) => {
        navigate(`/movie/${Movie.Id}`, { state: { Movie } });
    };
    return (
        <Card
            sx={{
                width: "200px",
                height: 500,
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                marginRight: 5,
                position: "relative",
                // backgroundColor: "rgba(2,32,84,255)"
                // boxShadow: "none",
            }}
        >
            <CardMedia
                sx={{
                    height: "260px",
                    width: "100%",
                    objectFit: "cover",
                    backgroundColor: "#ccc", // Placeholder color for images with empty areas
                }}
                image={`${process.env.REACT_APP_API_URL}/${Movie.Poster}`}
                title="Movie's poster"
            />
            <CardContent
                sx={{
                    overflow: "hidden", // Hide excess content
                    textOverflow: "ellipsis", // Ellipsis for overflowing text
                }}
            >
                <Typography
                    sx={{ fontSize: 15, color: "#333", fontWeight: "bold", }}
                    gutterBottom
                    component="div"
                >
                    {Movie.Title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "text.secondary",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <span className="infor-bold">
                        Thể loại:{" "}
                        <span className="infor-normal">
                            {FormatGenres(Movie)}
                        </span>
                    </span>
                    <span className="infor-bold">
                        Thời lượng:{" "}
                        <span className="infor-normal">
                            {Movie.RunningTime}
                        </span>
                    </span>
                    <span className="infor-bold">
                        Khởi chiếu:{" "}
                        <span className="infor-normal">
                            {FormatReleaseDate(Movie.ReleaseDate)}
                        </span>
                    </span>
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    position: "absolute", // Make CardActions fixed at the bottom
                    bottom: 0, // Align it to the bottom of the card
                    width: "100%", // Full width to match the card
                    justifyContent: "space-between", // Spread buttons horizontally
                }}
            >
                <Button variant="outlined" size="small" onClick={() => handleClick(Movie)}>
                    Detail
                </Button>
                <Button variant="contained" size="small">Booking</Button>
            </CardActions>
        </Card>
    );
}
