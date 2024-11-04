import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const StyledButton = styled(Button)({
    color: "#fff",                // Text color
    padding: "6px 6px",           // Padding
    margin: "0 8px",              // Margin between buttons
    fontWeight: "bold",           // Bold text
    "&:hover": {
        color: 'grey',            // Darker shade on hover
    },
});

export const StyledLink = styled(Link)({
    textDecoration: "none",
    color: "inherit",             // Inherit color from StyledButton or default text color
});
