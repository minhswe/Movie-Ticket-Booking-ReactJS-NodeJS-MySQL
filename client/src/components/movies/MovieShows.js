import React, { useState, useEffect } from "react";
import { movieApi } from "../../api/axios";
import GradientCircularProgress from "./MovieUtilities/gradientCircularProgress";
import "./MovieShows.css";
import ShowSection from "./MovieUtilities/ShowSection";
const MovieShows = ({ selectedDate, movieId, Movie }) => {
    console.log(selectedDate, movieId);
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchingShowsByDate = async () => {
            setLoading(true);
            try {
                const response = await movieApi.get("/shows", {
                    params: { selectedDate: selectedDate, movieId: movieId },
                });
                setShows(response.data);
                setTimeout(() => {    
                    setLoading(false);
                }, 800);
            } catch (error) {
                console.log("fetching movie shows by date error: ", error);
            }
        };
        if (selectedDate && movieId) {
            fetchingShowsByDate();
        }
    }, [selectedDate, movieId]);

    return (
        <>
            {shows.length <= 0 ? (
                <div>There is no shows</div>
            ) : (
                <div className="shows-container">
                    {loading ? (
                        <div className="gradient-circular-progress">
                            <GradientCircularProgress />
                        </div>
                    ) : (
                        <div>
                            {shows.map((show, index) => (
                                <ShowSection key={index} Show={show} movieId={movieId} Movie={Movie} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default MovieShows;
