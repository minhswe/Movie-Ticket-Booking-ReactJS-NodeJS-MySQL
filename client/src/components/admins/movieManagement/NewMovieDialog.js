import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import { movieApi } from "../../../api/axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

export default function ResponsiveDialog() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [fullWidth, setFullWidth] = React.useState(true);
    const [imagePreview, setImagePreview] = React.useState("");

    const [formData, setFormData] = React.useState({
        id: "",
        title: "",
        runningTime: "",
        description: "",
        poster: "",
        releaseDate: "",
        trailerUrl: "",
        movieStatus: "",
    });

    const [latestMovieId, setLatestMovieId] = React.useState(0);
    React.useEffect(() => {
        const fetchLatestMovieId = async () => {
            try {
                const response = await movieApi.get("/getLatestMovieId"); // Adjust the endpoint as needed
                if (response.status === 200 && response.data?.latestMovieId) {
                    setLatestMovieId(response.data.latestMovieId);
                    setFormData((prevData) => ({
                        ...prevData,
                        id: response.data.latestMovieId,
                    }));
                }
            } catch (error) {
                console.error("Error fetching latest movie ID:", error);
            }
        };

        fetchLatestMovieId();
    }, []);
    const [movieStatus, setMovieStatus] = React.useState(1);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const handleImageChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             setImagePreview(e.target.result); // Set the preview URL
    //         };
    //         reader.readAsDataURL(file); // Read the file as data URL for the preview
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             poster: file, // Store the actual file object in state
    //         }));
    //     }
    // };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                setImagePreview(base64Image); // Set the preview URL
                setFormData((prevData) => ({
                    ...prevData,
                    poster: base64Image, // Store the base64 string in state
                }));
            };
            reader.readAsDataURL(file); // Read the file as base64 string
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const uploadImage = async (base64Image) => {
        try {
            console.log(base64Image);
            // Convert base64 string to Blob
            const response = await fetch(base64Image);
            const blob = await response.blob();
            const file = new File([blob], "poster.jpg", { type: "image/jpeg" }); // You may adjust the file name and type

            const formData = new FormData();
            formData.append("poster", file); // Append the file to the FormData

            // Make the API request to upload the image
            const uploadResponse = await movieApi.post(
                "/uploadPoster",
                formData
            );
            return uploadResponse.data.filePath; // Assuming the API returns the file path
        } catch (error) {
            console.error("Error uploading image:", error);
            throw new Error("Image upload failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        // Check if there's a poster and upload it
        // if (formData.poster) {
        //     const uploadedPosterPath = await uploadImage(formData.poster);
        //     formDataToSend.append("poster", uploadedPosterPath); // Add the uploaded poster's file path
        // }
        formDataToSend.append("id", formData.id);
        formDataToSend.append("title", formData.title);
        formDataToSend.append("runningTime", formData.runningTime);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("releaseDate", formData.releaseDate);
        formDataToSend.append("trailerUrl", formData.trailerUrl);
        formDataToSend.append("movieStatus", formData.movieStatus);

        // Append the poster
        if (formData.poster && formData.poster.startsWith("data:")) {
            // Convert base64 string to Blob and append it
            const blob = await uploadImage(formData.poster);
            console.log("blob", blob);
            formDataToSend.append("poster", blob.split('/').pop());
        }

        console.log("FormData contents:");
        formDataToSend.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        try {
            const response = await movieApi.post(
                "/addNewMovie",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Make sure the correct content type is set
                    },
                }
            );
            console.log(response);
            if (response.data.success) {
                // Handle success (e.g., show success message)
                alert("Movie added successfully!");
            } else {
                // Handle error
                alert("Failed to add movie.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting the form.");
        }
    };

    return (
        <React.Fragment>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{ width: "200px" }}
            >
                <AddIcon /> New Movie
            </Button>
            <Dialog
                fullWidth={fullWidth}
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                sx={{
                    "& .MuiDialog-paper": {
                        width: fullScreen ? "100%" : "800px", // Adjust the width as desired
                        maxWidth: "90%", // Optional: To prevent exceeding screen width
                    },
                }}
            >
                <DialogTitle id="responsive-dialog-title">
                    Add New Movie
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit} // Add submit handler
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        {/* Row 1 */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ width: "150px" }}>Id:</Box>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="id"
                                value={latestMovieId}
                                disabled
                                onChange={handleInputChange}
                            />
                        </Box>

                        {/* Row 2 */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ width: "150px" }}>Title:</Box>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </Box>

                        {/* Row 3 */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ width: "150px" }}>Running Time:</Box>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimeField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    defaultValue={dayjs("2022-04-17T15:30")}
                                    format="HH:mm:ss"
                                    onChange={(newValue) =>
                                        handleInputChange({
                                            target: {
                                                name: "runningTime",
                                                value:
                                                    newValue?.format(
                                                        "HH:mm:ss"
                                                    ) || "",
                                            },
                                        })
                                    }
                                />
                            </LocalizationProvider>
                        </Box>

                        {/* Row 4 */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ width: "150px" }}>
                                Movie Description:
                            </Box>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                size="small"
                                variant="outlined"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </Box>

                        {/* Row 5 */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ width: "150px" }}>Poster URL:</Box>
                            <CardMedia
                                sx={{
                                    height: 140,
                                    width: 100,
                                    border: "1px solid #ccc",
                                    backgroundColor: "#f0f0f0",
                                }}
                                image={
                                    imagePreview ||
                                    "/static/images/placeholder.png"
                                } // Default placeholder
                                title="Movie Poster"
                            />
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload files
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={(event) => {
                                        console.log(event.target.files);
                                        handleImageChange(event);
                                    }}
                                    multiple
                                />
                            </Button>
                        </Box>

                        {/* Row 6 */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ width: "150px" }}>Release Date:</Box>
                            <TextField
                                fullWidth
                                type="date"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                name="releaseDate"
                                value={formData.releaseDate}
                                onChange={handleInputChange}
                            />
                        </Box>

                        {/* Row 7 */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ width: "150px" }}>Trailer URL:</Box>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="trailerUrl"
                                value={formData.trailerUrl}
                                onChange={handleInputChange}
                            />
                        </Box>

                        {/* Row 8 */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ width: "150px" }}>Movie Status:</Box>
                            <Select
                                sx={{ width: "90%" }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formData.movieStatus}
                                label={
                                    movieStatus ? null : "select movie's type"
                                }
                                onChange={(e) =>
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        movieStatus: e.target.value,
                                    }))
                                }
                            >
                                <MenuItem value={1}>Now Showing</MenuItem>
                                <MenuItem value={2}>Comming Soon</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
