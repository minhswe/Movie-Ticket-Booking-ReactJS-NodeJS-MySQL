import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
export default function MediaCard({ Movie }) {
    const navigate = useNavigate();
    const handleClick = (Movie) => {
        navigate(`/movie/${Movie.Id}`, {state: {Movie}});
    }
    return (
        <Card sx={{ width: "22%", height: 500, marginTop: '20px' }}>
            <CardMedia
                sx={{ height: "65%", objectFit: "contain" }}
                image={`${process.env.REACT_APP_API_URL}/${Movie.Poster}`}
                title="Movie's poster"
            />
            <CardContent>
                <Typography
                    sx={{ fontSize: 14, color: '#222', fontWeight: 'bold' }}
                    gutterBottom
                    component="div"
                >
                    {Movie.Title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", display: "flex", flexDirection: "column" }}>
                    <span className="infor-bold">Thể loại: </span>
                    <span className="infor-bold">Thời lượng: <span className="infor-normal">{Movie.RunningTime}</span></span>
                    <span className="infor-bold">Khởi chiếu: <span className="infor-normal">{Movie.ReleaseDate}</span></span>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => handleClick(Movie)}>Detail</Button>
                <Button size="small">Booking</Button>
            </CardActions>
        </Card>
    );
}
