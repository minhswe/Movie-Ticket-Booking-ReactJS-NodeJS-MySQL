import React, { useEffect } from "react";
import {
    Box,
    TextField,
    Autocomplete,
    Button,
    CardMedia,
    MenuItem,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material";
import { adminApi } from "../../../api/axios";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useLocation } from "react-router-dom";
import { useScatterChartProps } from "@mui/x-charts/internals";

const MovieDetailManagement = () => {
    const location = useLocation();
    const Movie = location.state?.Movie;
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
    const [formData, setFormData] = React.useState({
        id: "",
        title: "",
        genres: ["Option 1", "Option 2", "Option 3"],
        runningTime: "",
        description: "",
        poster: "",
        releaseDate: "",
        trailer: "",
        status: 1, // default status, or adjust based on your requirements
    });
    const [originalData, setOriginalData] = React.useState({
        id: "",
        title: "",
        genres: ["Option 1", "Option 2", "Option 3"],
        runningTime: "",
        description: "",
        poster: "",
        releaseDate: "",
        trailer: "",
        status: 1, // default status, or adjust based on your requirements
    });

    const [preview, setPreview] = React.useState(null);

    useEffect(() => {
        if (Movie) {
            const movieData = {
                id: Movie.Id,
                title: Movie.Title,
                genres: Movie.Genres,
                runningTime: Movie.RunningTime,
                description: Movie.MovieDescription,
                poster: Movie.Poster,
                releaseDate: Movie.ReleaseDate,
                trailer: Movie.Trailer,
                status: Movie.MovieStatusId,
            };
            setFormData(movieData);
            setOriginalData(movieData);
        }
    }, [Movie]);

    const [genres, setGenres] = React.useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await adminApi.get("/getGenres");
                setGenres(response.data);
            } catch (err) {
                console.error("Failed to fetch genres:", err);
            }
        };
        fetchGenres();
    }, []);

    const statusType = [
        {
            value: 1,
            label: "Now Showing",
        },
        {
            value: 2,
            label: "Comming Soon",
        },
    ];

    const movieGenresName = (movieGenre) => {
        if (!movieGenre) return [];

        const currentGenre = movieGenre.map((genre) => genre.GenreName);

        const matchedGenres = genres.filter((genre) =>
            currentGenre.includes(genre.GenreName)
        );

        return matchedGenres;
    };

    const handleCancel = () => {
        setFormData(originalData);
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            // Read the file as a data URL
            reader.onload = () => {
                handleInputChange("poster", reader.result); // Set the preview image URL
            };

            reader.readAsDataURL(file); // Read the file
            console.log(formData.poster)
        }
    };


    const uploadImage = async (base64Image) => {
        try {
            // Convert base64 string to Blob
            const response = await fetch(base64Image);
            const blob = await response.blob();
            const file = new File([blob], "poster.jpg", { type: "image/jpeg" }); // You may adjust the file name and type
    
            const formData = new FormData();
            formData.append("poster", file); // Append the file to the FormData
    
            // Make the API request to upload the image
            const uploadResponse = await adminApi.post("/uploadPoster", formData);
            return uploadResponse.data.filePath; // Assuming the API returns the file path
        } catch (error) {
            console.error("Error uploading image:", error);
            throw new Error("Image upload failed");
        }
    };

    const handleSaveChanges = async () => {
        try {
            // console.log(formData); // Debugging to check the structure of formData
    
            // Ensure genres exists and is an array
            const genres = Array.isArray(formData.genres) ? formData.genres : [];
    
            const formDataPayload = new FormData();
    
            // Append other movie details to the FormData
            formDataPayload.append('id', formData.id);
            formDataPayload.append('title', formData.title);
            formDataPayload.append('genres', JSON.stringify(genres.map((genre) => genre.GenreName))); // Handle genres properly
            formDataPayload.append('runningTime', formData.runningTime || '');
            formDataPayload.append('description', formData.description || '');
            formDataPayload.append('releaseDate', formData.releaseDate || '');
            formDataPayload.append('trailer', formData.trailer || '');
            formDataPayload.append('status', formData.status || '');
            // Append the poster
            if (formData.poster && formData.poster.startsWith('data:')) {
                // Convert base64 string to Blob and append it
                const blob = await uploadImage(formData.poster);
                console.log("blob", blob.split('/').pop())
                formDataPayload.append('poster', `${blob.split('/').pop()}`); // Filename is optional
            } else if (formData.poster) {
                formDataPayload.append('poster', formData.poster); // Existing poster URL
            }
            console.log(formData.poster);
            // console.log('FormData Payload:');
            // for (const [key, value] of formDataPayload.entries()) {
            //     console.log(`${key}:`, value);
            // }
            // Send PUT request to update the movie
            const response = await adminApi.put(`/updateMovie/${formData.id}`, formDataPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 200) {
                console.log('Movie updated successfully:', response.data);
            } else {
                console.error('Failed to update movie:', response.status);
            }
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    };
    
    
    

    // const handleSaveChanges = async () => {
    //     try {
    //         const payload = {
    //             id: formData.id,
    //             title: formData.title,
    //             genres: formData.genres.map((genre) => genre.GenreName), // Extract genre names
    //             runningTime: formData.runningTime,
    //             description: formData.description,
    //             poster: formData.poster.startsWith("data:")
    //                 ? await uploadImage(formData.poster) // Upload if it's a local image
    //                 : formData.poster, // Keep existing poster URL
    //             releaseDate: formData.releaseDate,
    //             trailer: formData.trailer,
    //             status: formData.status,
    //         };
    //         // console.log(payload)
    //         const response = await axios.post('/updateMovie', payload);

    //         // Handle the response
    //         if (response.status === 200) {
    //             console.log('Movie updated successfully:', response.data);
    //         } else {
    //             console.error('Failed to update movie:', response.status);
    //         }
    //     } catch (error) {}
    // };

    if (!formData) {
        return null; // Do not render if formData is not available
    }

    return (
        <div
            className="details-container"
            style={{ width: "60%", margin: "0 auto", marginTop: "50px" }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    overflowY: "hidden",
                }}
            >
                <Box
                    sx={{
                        minWidth: "150px",
                        fontWeight: "bold",
                    }}
                >
                    ID
                </Box>
                <TextField
                    fullWidth
                    id="id"
                    label={Movie.id ? null : "Movie ID"}
                    variant="outlined"
                    value={formData.id || ""}
                    onChange={(e) => handleInputChange("id", e.target.value)}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    overflowY: "hidden",
                }}
            >
                <Typography
                    sx={{
                        minWidth: "150px",
                        fontWeight: "bold",
                    }}
                >
                    Title
                </Typography>
                <TextField
                    fullWidth
                    id="title"
                    label={Movie.Title ? null : "Movie Title"}
                    variant="outlined"
                    value={formData.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <Typography
                    sx={{
                        minWidth: "150px",
                        fontWeight: "bold",
                    }}
                >
                    Genres
                </Typography>
                <Autocomplete
                    fullWidth
                    multiple
                    id="size-small-outlined-multi"
                    size="small"
                    options={genres}
                    defaultValue={
                        formData.genres || ["Option 1", "Option 2", "Option 3"]
                    }
                    getOptionLabel={(option) => option.GenreName}
                    value={movieGenresName(formData.genres)}
                    onChange={(e, value) => handleInputChange("genres", value)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Size small"
                            placeholder="Genre"
                        />
                    )}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <Typography
                    sx={{
                        minWidth: "150px",
                        fontWeight: "bold",
                    }}
                >
                    Running Time
                </Typography>
                <TextField
                    fullWidth
                    id="running-time"
                    label={Movie.RunningTime ? null : "Running Time"}
                    variant="outlined"
                    value={formData.runningTime || ""}
                    onChange={(e) =>
                        handleInputChange("runningTime", e.target.value)
                    }
                />
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <Typography
                    sx={{
                        minWidth: "150px",
                        fontWeight: "bold",
                    }}
                >
                    Movie Description
                </Typography>
                <TextField
                    fullWidth
                    id="movie-desc"
                    label={Movie.MovieDescription ? null : "Description"}
                    variant="outlined"
                    multiline
                    minRows={3}
                    value={formData.description || ""}
                    onChange={(e) =>
                        handleInputChange("description", e.target.value)
                    }
                />
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <Typography
                    sx={{
                        minWidth: "150px",
                        fontWeight: "bold",
                    }}
                >
                    Poster
                </Typography>
                <CardMedia
                    component="img"
                    sx={{ width: "100px" }}
                    height="110"
                    image={
                        formData.poster?.startsWith("data:") // Check if the poster is a base64 string (local image)
                            ? formData.poster // Show the locally uploaded image
                            : `${process.env.REACT_APP_API_URL}/${formData.poster}` // Otherwise, show the backend URL
                    }
                    alt="Movie poster"
                />
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                >
                    Upload files
                    <input
                        type="file"
                        hidden
                        onChange={handleImageUpload}
                        multiple
                    />
                </Button>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <Typography
                    sx={{
                        minWidth: "150px",
                        fontWeight: "bold",
                    }}
                >
                    Release Date
                </Typography>
                <TextField
                    fullWidth
                    id="release-date"
                    label={Movie.ReleaseDate ? null : "Release Date"}
                    variant="outlined"
                    value={formData.releaseDate || ""}
                    onChange={(e) =>
                        handleInputChange("releaseDate", e.target.value)
                    }
                />
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <Typography
                    sx={{
                        minWidth: "150px",
                        fontWeight: "bold",
                    }}
                >
                    Trailer
                </Typography>
                <TextField
                    fullWidth
                    id="trailer"
                    label={Movie.Trailer ? null : "Trailer URL"}
                    variant="outlined"
                    value={formData.trailer || ""}
                    onChange={(e) =>
                        handleInputChange("trailer", e.target.value)
                    }
                />
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <Typography
                    sx={{
                        minWidth: "150px",
                        fontWeight: "bold",
                    }}
                >
                    Status
                </Typography>
                <TextField
                    select
                    defaultValue={formData.status || Movie.MovieStatusId}
                    fullWidth
                    id="status"
                    label={Movie.MovieStatusId ? null : "Status"}
                    variant="outlined"
                    onChange={(e) =>
                        handleInputChange("status", e.target.value)
                    }
                >
                    {statusType.map((status) => (
                        <MenuItem key={status.value} value={status.value}>
                            {status.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div
                className="button-container"
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "15px",
                }}
            >
                <Button variant="outlined" sx={{ marginRight: "15px" }}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSaveChanges}>Save changes</Button>
            </div>
        </div>
    );
};

export default MovieDetailManagement;
