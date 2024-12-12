import React, { useEffect, useState } from "react";
import {bookingApi} from "../../api/axios";
import TicketCard from "./ultilities/TicketCard";
import "./MyPurchase.css";
import { Pagination } from "@mui/material";
const MyPurchase = () => {
    const [ticketHistory, setTicketHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await bookingApi.get("/getBookingsByUser", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });
                setTicketHistory(response.data);
            } catch (err) {
                console.error("Error fetching ticket history:", err.message);
            }
        };

        fetchBookings();
    }, []);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = ticketHistory.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    }

    useEffect(() => {
        console.log(ticketHistory);
    });
    return (
        <>
            <div className="tickets-history-container">
                <div className="tickets-wrapper">
                    {currentItems.length > 0 ? (
                        currentItems.map((ticket, index) => (
                            <TicketCard key={index} Ticket={ticket} />
                        ))
                    ) : (
                        <p>No tickets found</p>
                    )}
                </div>
            </div>
            {ticketHistory.length > itemsPerPage && (
                        <Pagination
                        count={Math.ceil(ticketHistory.length / itemsPerPage)} // Total pages
                        page={currentPage} // Current page
                        onChange={handlePageChange} // Page change handler
                        color="primary"
                        sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
                        />
                    )}
        </>
    );
};

export default MyPurchase;
