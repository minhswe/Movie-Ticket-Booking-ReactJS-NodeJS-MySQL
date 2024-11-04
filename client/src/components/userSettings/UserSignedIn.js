import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MenuPopupState({ username }) {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = (popupState, event) => {
        popupState.close(event);
        signOut();
    };

    const handleProfile = async (popupState, event) => {
        popupState.close(event);
        navigate("/user/profile");
    };

    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                        {username}
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={(event) => handleProfile(popupState, event.currentTarget)}>Profile</MenuItem>
                        <MenuItem onClick={popupState.close}>
                            My account
                        </MenuItem>
                        <MenuItem
                            onClick={(event) =>
                                handleSignOut(popupState, event.currentTarget)
                            }
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}
