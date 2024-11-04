import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const BootstrapDialog = styled(Dialog)(({ theme, dialogType }) => ({
    "& .MuiDialog-paper": {
        maxWidth: "md", // Set to medium (you can use "sm", "md", "lg", etc. or a custom width)
        width: "400px", // Set a custom width if desired
    },
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
        backgroundColor: dialogType === "success" 
            ? theme.palette.success.light 
            : theme.palette.error.light,
        color: dialogType === "success" 
            ? theme.palette.success.contrastText 
            : theme.palette.error.contrastText,
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
        backgroundColor: dialogType === "success" 
            ? theme.palette.success.light 
            : theme.palette.error.light,
    },
}));

const TitleWithIcon = styled("div")(({ theme, dialogType }) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    color: dialogType === "success" 
        ? theme.palette.success.main 
        : theme.palette.error.main,
}));

export default function CustomizedDialog({
    title = "Success",
    message = "The operation was completed successfully.",
    confirmButtonText = "Got it",
    onConfirm,
    open,
    onClose,
    dialogType = "success", // Add dialogType prop to specify success or error
}) {
    return (
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            dialogType={dialogType}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                <TitleWithIcon dialogType={dialogType}>
                    {dialogType === "success" ? (
                        <CheckCircleOutlineIcon />
                    ) : (
                        <ErrorOutlineIcon />
                    )}
                    {title}
                </TitleWithIcon>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={(theme) => ({
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: dialogType === "success" 
                            ? theme.palette.success.main 
                            : theme.palette.error.main,
                    })}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color={dialogType === "success" ? "success" : "error"}
                    onClick={onConfirm || onClose}
                >
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}
