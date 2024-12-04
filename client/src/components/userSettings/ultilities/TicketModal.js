import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/material/Divider";
import moneyFormat from "../../../utilities/moneyFormat";
import FormatReleaseDate from "../../../utilities/FormatReleaseDate";
import Chip from "@mui/joy/Chip";

export default function ResponsiveModal({ ticket }) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <div
                style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "blue",
                }}
                onClick={() => setOpen(true)}
            >
                View Details
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    sx={{
                        width: "400px",
                        borderRadius: "12px",
                        boxShadow: "lg",
                        padding: "20px",
                    }}
                >
                    <Typography
                        id="modal-title"
                        level="h4"
                        textAlign="center"
                        fontWeight="bold"
                        mb={2}
                    >
                        Movie Ticket
                    </Typography>
                    <Box>
                        <Typography level="body1" mb={1}>
                            <Chip
                                color="primary"
                                disabled={false}
                                size="lg"
                                variant="soft"
                            >
                                Booking reference:{" "}
                            </Chip>
                            <strong>{ticket.BookingId}</strong>
                        </Typography>
                        <div>
                            <Chip
                                color="primary"
                                disabled={false}
                                size="lg"
                                variant="soft"
                            >
                                {" "}
                                Date & Time{" "}
                            </Chip>
                        </div>
                        <Typography level="body1" mb={1} fontWeight="bold" sx={{marginLeft: "10px"}}>
                            {FormatReleaseDate(ticket.ShowDate)}
                            <br />
                            {ticket.ShowTime}
                        </Typography>
                        <Divider sx={{backgroundColor: "#333" }}/>
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                                gap: 2,
                                mb: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: "30%",
                                }}
                            >
                                <Typography level="body2">
                                    <Chip
                                        color="primary"
                                        disabled={false}
                                        size="lg"
                                        variant="soft"
                                    >
                                        Hall Number
                                    </Chip>
                                </Typography>
                                <Typography level="body1" fontWeight="bold">
                                    {ticket.HallNumber}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: "30%",
                                }}
                            >
                                <Typography level="body2">
                                    <Chip
                                        color="primary"
                                        disabled={false}
                                        size="lg"
                                        variant="soft"
                                    >
                                        Ticket(s)
                                    </Chip>
                                </Typography>
                                <Typography level="body1" fontWeight="bold">
                                    {ticket.NumberOfSeat}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: "30%",
                                }}
                            >
                                <Typography level="body2">
                                    <Chip
                                        color="primary"
                                        disabled={false}
                                        size="lg"
                                        variant="soft"
                                    >
                                        Seat(s)
                                    </Chip>
                                </Typography>
                                <Typography
                                    level="body1"
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexWrap: "wrap",
                                    }}
                                    fontWeight="bold"
                                >
                                    {ticket.SeatNames.split(",").map(
                                        (seat, index) => (
                                            <span
                                                key={index}
                                                style={{
                                                    display: "inline-block", // Ensures each seat stays together
                                                    marginRight: "5px", // Optional spacing between seat names
                                                }}
                                            >
                                                {seat}
                                            </span>
                                        )
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider sx={{backgroundColor: "#333" }}/>
                        <Typography level="body3">
                            <Chip
                                color="primary"
                                disabled={false}
                                size="lg"
                                variant="soft"
                            >
                                Snack(s)
                            </Chip>
                        </Typography>
                        <Typography level="body3" mb={1} fontWeight="bold" sx={{marginLeft: "10px"}}>
                            {ticket.ItemNames.split(",").map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </Typography>
                        <Divider sx={{backgroundColor: "#333" }}/>
                        <Typography level="body4">
                            <Chip
                                color="primary"
                                disabled={false}
                                size="lg"
                                variant="soft"
                            >
                                Location
                            </Chip>
                        </Typography>
                        <Typography level="body1" mb={1} fontWeight="bold" sx={{marginLeft: "10px"}}>
                            {ticket.TheaterName}
                        </Typography>
                        <Typography level="body1" mb={1} sx={{marginLeft: "10px"}}>
                            {ticket.AddressName}
                        </Typography>

                        <Typography level="body1" mb={1} sx={{marginLeft: "10px"}}>
                            <strong>Movie:</strong> {ticket.MovieTitle}
                        </Typography>

                        <Typography level="body1" mb={1}>
                            <Chip
                                color="primary"
                                disabled={false}
                                size="lg"
                                variant="soft"
                            >
                                Total Price:
                            </Chip>{" "}
                            <strong>{moneyFormat(ticket.TotalPrice)}</strong>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            mt: 3,
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1,
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="neutral"
                            onClick={() => setOpen(false)}
                        >
                            Close
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
