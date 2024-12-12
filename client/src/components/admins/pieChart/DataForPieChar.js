import { useEffect, useState } from "react";
import { adminApi } from "../../../api/axios";

export const useGetTopBookedMovie = () => {
    const [topBookedMovie, setTopBookMovie] = useState([]);

    useEffect(() => {
        const fetchTopBookedMovie = async () => {
            try {
                const response = await adminApi.get("/getTopBookedMovie");
                const fetchedData = response.data.map(item => ({
                    label: item.MovieTitle,
                    value: item.TotalSeatsBooked,
                }));
                setTopBookMovie(fetchedData);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching top booked movie:", error);
            }
        };

        fetchTopBookedMovie();
    }, []);

    return topBookedMovie;
};
export const valueFormatter = (item) => `${item.value}%`;