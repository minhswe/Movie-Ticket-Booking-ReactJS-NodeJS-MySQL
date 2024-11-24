import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ComboCard from "./ComboCard";
import axios from "../../../api/axios";

export default function ResponsiveDialog({ open, onClose }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const [snacks, setSnacks] = React.useState({ food: [], drink: [] });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        if (open) {
            const fetchSnacks = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await axios.get("movies/snacks");
                    console.log(response.data);
                    setSnacks(response.data);
                } catch (error) {
                    console.error("Failed to fetch snacks:", error);
                    setError("Failed to load snack data.");
                } finally {
                    setLoading(false);
                }
            };
            fetchSnacks();
        }
    }, [open]);
    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                // onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Snack bar
                </DialogTitle>
                <DialogContent>
                    {!loading && !error && (
                        <div>
                            {snacks.food.map((item) => (
                                <ComboCard key={item.Id} Name={item.FoodName} image={item.Image} price={item.Price} />
                            ))}
                            {snacks.drink.map((item) => (
                                <ComboCard key={item.Id} Name={item.DrinkName} image={item.Image} price={item.Price}/>
                            ))}
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    {/* <Button autoFocus onClick={onClose} variant="contained">
                        Disagree
                    </Button> */}
                    <Button onClick={onClose} variant="contained" autoFocus>
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
