import React, { useEffect, useState } from "react";
import Card from "../cards/Card";
import axios from "../../api/axios";
import "./NowShowingStyle.css"
const NowShowing = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchNowShowingMovies = async () => {
            const response = await axios.get("/movies/now-showing", {
                params: { movieStatusId: 1 },
            });
            setMovies(response.data);
        };
        fetchNowShowingMovies();
    }, []);
    useEffect(() => {
        console.log(movies);
    }, [movies]); // This will run every time `movies` changes

    return (
        <div className="movie-container">
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <Card 
                    title={movie.Title}
                    poster={movie.Poster}
                    />
                ))
            ) : (
                <p>No movies currently showing.</p> // Message when there are no movies
            )}
        </div>
    );
};

export default NowShowing;
