import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "./MovieBooking.css";
import dayjs from "dayjs";
import MovieShows from "./MovieShows";
export default function BasicDateCalendar({ Movie }) {
    const now = dayjs().format("YYYY-MM-DD");
    const [selectDate, setSelectDate] = React.useState(now);

    const handleDateChange = (date) => {
            setSelectDate(dayjs(date).format("YYYY-MM-DD"));
    }

    return (
        <div className="movie-booking-container">
            <div className="booking-infor">
                <MovieShows selectedDate={selectDate} movieId={Movie.Id} Movie={Movie}/>
            </div>
            <div className="booking-calendar">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar onChange={handleDateChange} />
                </LocalizationProvider>
            </div>
        </div>
    );
}
