import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({open, onClose, title, message, onAgree, onDisagree}) {

    const handleAgree = () => {
        onAgree(); // Call the Agree callback
        onClose(); // Close the dialog
    };

    const handleDisagree = () => {
        onDisagree(); // Call the Disagree callback
        onClose(); // Close the dialog
    };
    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleDisagree}>Disagree</Button>
                    <Button variant="contained" onClick={handleAgree}>Agree</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
