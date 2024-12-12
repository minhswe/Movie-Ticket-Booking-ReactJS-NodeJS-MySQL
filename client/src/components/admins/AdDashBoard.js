import React, { useState, useEffect } from "react";
import "./AdDashBoard.css";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import PersonIcon from "@mui/icons-material/Person";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { userApi, bookingApi, adminApi } from "../../api/axios";
import moneyFormat from "../../utilities/moneyFormat";
import TopBookedMoviePieChart from "./pieChart/PieChart";

const AdDashBoard = () => {
    const [countUser, setCountUser] = useState(0);
    const [countBooking, setCountBooking] = useState(0);
    const [cinemaEarning, setCinemaEarning] = useState(0);
    const [totalSeatsBooked, setTotalSeatsBooked] = useState(0);

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await userApi.get("/countUser", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCountUser(response.data);
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        };

        const fetchBookingCount = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await bookingApi.get("/countBooking", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCountBooking(response.data);
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        };

        const fetchTotalAmount = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await bookingApi.get("/getTotalAmount", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCinemaEarning(response.data);
            } catch (error) {
                console.error("Error fetching amount earning:", error);
            }
        };

        const fetchTotalSeatsBooked = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await adminApi.get("/getTotalSeatsBooked", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTotalSeatsBooked(response.data);
            } catch (error) {
                console.error("Error fetching total seats booked", error);
            }
        };

        fetchUserCount();
        fetchBookingCount();
        fetchTotalAmount();
        fetchTotalSeatsBooked();
    }, []);
    return (
        <div className="dashboard-container">
            <div className="dashboard-wrapper">
                <Card
                    variant="soft"
                    sx={{
                        width: "350px",
                        height: "150px",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <CardContent>
                        <Typography level="title-md" fontSize={50}>
                            {countUser.numberOfUser}
                        </Typography>
                        <Typography>Total User</Typography>
                    </CardContent>
                    <CardContent>
                        <PersonIcon sx={{ width: "100px", height: "100px" }} />
                    </CardContent>
                </Card>
                <Card
                    variant="soft"
                    sx={{
                        width: "300px",
                        height: "150px",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <CardContent>
                        <Typography level="title-md" fontSize={50}>
                            {countBooking.numberOfBooking}
                        </Typography>
                        <Typography>Show Bookings</Typography>
                    </CardContent>
                    <CardContent>
                        <ConfirmationNumberIcon
                            sx={{ width: "100px", height: "100px" }}
                        />
                    </CardContent>
                </Card>
                <Card
                    variant="soft"
                    sx={{
                        width: "300px",
                        height: "150px",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <CardContent>
                        <Typography level="title-md" fontSize={50}>
                            {totalSeatsBooked}
                        </Typography>
                        <Typography>Seat Booking</Typography>
                    </CardContent>
                    <CardContent>
                        <AirlineSeatReclineNormalIcon
                            sx={{ width: "100px", height: "100px" }}
                        />
                    </CardContent>
                </Card>
                <Card
                    variant="soft"
                    sx={{
                        width: "300px",
                        height: "150px",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <CardContent>
                        <Typography level="title-md" fontSize={20}>
                            {moneyFormat(cinemaEarning.totalAmount)}
                        </Typography>
                        <Typography>Cinema earning</Typography>
                    </CardContent>
                    <CardContent>
                        <AttachMoneyIcon
                            sx={{ width: "100px", height: "100px" }}
                        />
                    </CardContent>
                </Card>
            </div>
            <div>TOP 3 BOOKED MOVIE</div>
            <TopBookedMoviePieChart />
        </div>
    );
};

export default AdDashBoard;
