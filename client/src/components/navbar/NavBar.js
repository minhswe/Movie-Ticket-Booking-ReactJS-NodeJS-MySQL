import React from "react";
import { StyledButton, StyledLink } from "./Style";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";



const NavBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <StyledButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                Movies <ExpandMoreIcon />
            </StyledButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                    onMouseLeave: handleClose, // Close when mouse leaves menu
                }}
                anchorOrigin={{
                    vertical: "bottom",
                }}
                transformOrigin={{
                    vertical: "top",
                }}
            >
                <MenuItem onClick={handleClose}>
                    <StyledLink to={"/movies/nowshowing"}>
                        Now Showing
                    </StyledLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <StyledLink to={"/movies/commingsoon"}>
                        Comming Soon
                    </StyledLink>
                </MenuItem>
            </Menu>
            <StyledButton>
                <StyledLink to={"/cinemas"}>Cinemas</StyledLink>
            </StyledButton>
        </div>
    );
};

export default NavBar;
