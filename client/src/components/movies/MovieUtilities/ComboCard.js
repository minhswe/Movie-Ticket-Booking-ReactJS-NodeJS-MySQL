import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import TextField from "@mui/material/TextField";
export default function MediaControlCard({ Name, image, price, onQuantityChange }) {
    const theme = useTheme();
    const [quantity, setQuantity] = React.useState(0);

    const handleAddItem = () => {
        setQuantity((prevQuantity) => {
            const newQuantity = prevQuantity + 1;
            onQuantityChange(newQuantity);
            return newQuantity;
        });
    };

    const handleRemoveItem = () => {
        if (quantity > 0) {
            setQuantity((prevQuantity) => {
            const newQuantity = prevQuantity > 0 ? prevQuantity - 1 : 0;
            onQuantityChange(newQuantity);
            return newQuantity;    
            });
        }
    };

    return (
        <Card sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                        {Name}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: "text.secondary" }}
                    >
                        {price} VND
                    </Typography>
                </CardContent>
                <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                    <IconButton
                        onClick={handleRemoveItem}
                        disabled={quantity === 0}
                    >
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <TextField
                        value={quantity}
                        Props={{
                            readOnly: true,
                            style: { textAlign: "center" },
                        }}
                        sx={{ width: 50, mx: 1 }}
                        ariant="standard"
                    />
                    <IconButton onClick={handleAddItem}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{
                    width: 100,
                    height: 'auto', // Maintain aspect ratio
                    margin: 'auto', // Center horizontally
                    display: 'block', // Ensures it's treated as a block element
                }}
                image={`${process.env.REACT_APP_API_URL}/${image}`}
                alt="image"
            />
        </Card>
    );
}
