import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import Button from '@mui/joy/Button';
import TicketModel from "./TicketModal"
import FormatReleaseDate from "../../../utilities/FormatReleaseDate";
import Chip from '@mui/joy/Chip';
import "./TicketCard.css"

export default function RowCard({Ticket}) {
    return (
        <Card orientation="horizontal" variant="outlined" sx={{ width: "100%", marginBottom: "10px"}}>
            <CardOverflow>
                <AspectRatio ratio="1" sx={{ width: 110 }}>
                    <img
                        src={`${process.env.REACT_APP_API_URL}/${Ticket.poster}`}
                        srcSet={`${process.env.REACT_APP_API_URL}/${Ticket.poster}`}
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent>
                <Typography
                    textColor="success.plainColor"
                    sx={{ fontWeight: "md" }}
                >
                    {Ticket.MovieTitle}
                </Typography>
                <Typography level="body-sm">
                    <Chip color="primary">{FormatReleaseDate(Ticket.ShowDate)}</Chip>
                </Typography>
                <Typography level="body-sm">
                <Chip color="primary">{Ticket.ShowTime}</Chip>
                </Typography>
                <Typography level="body-sm" fontWeight="bold">
                    {Ticket.TheaterName}
                </Typography>
            </CardContent>
            <div className="card-button">
            <Button sx={{height: "40%"}} variant="soft"><TicketModel ticket={Ticket} /></Button>
            </div>

            <CardOverflow
                variant="soft"
                color="primary"
                sx={{
                    px: 0.2,
                    writingMode: "vertical-rl",
                    justifyContent: "center",
                    fontSize: "xs",
                    fontWeight: "xl",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    borderLeft: "1px solid",
                    borderColor: "divider",
                }}
            >
                Ticket
            </CardOverflow>
        </Card>
    );
}
