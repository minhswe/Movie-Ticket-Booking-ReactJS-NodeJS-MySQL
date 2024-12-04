import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import TicketCard from "./ultilities/TicketCard";

const MyPurchase = () => {
    const [ticketHistory, setTicketHistory] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("/booking/getBookingsByUser", {
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

    useEffect(() => {
        console.log(ticketHistory);
    });
    return (
        <>
            <div className="tickets-history-container">
                {ticketHistory && ticketHistory.length > 0 ? (
                    ticketHistory.map((ticket, index) => (
                        <TicketCard key={index} Ticket={ticket} />
                    ))
                ) : (
                    <p>No tickets found</p>
                )}
            </div>
        </>
    );
};

export default MyPurchase;
