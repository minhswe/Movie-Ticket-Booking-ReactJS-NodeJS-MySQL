import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { adminApi } from "../../../api/axios";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";
const ResponsiveDialog = ({ open, onClose, Movie }) => {
    const isLoading = !Movie || Object.keys(Movie).length === 0;

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

    React.useEffect(() => {
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

    React.useEffect(() => {
        console.log(Movie);
    });

    // React.useEffect(() => {console.log(formData.genres)})

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
    const [genres, setGenres] = React.useState([]);

    React.useEffect(() => {
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

    const movieGenresName = (movieGenre) => {
        if (!movieGenre) return [];

        const currentGenre = movieGenre.map((genre) => genre.GenreName);

        const matchedGenres = genres.filter((genre) =>
            currentGenre.includes(genre.GenreName)
        );

        return matchedGenres;
    };

    const theme = useTheme();
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState("xl");
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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

    const handleCancel = () => {
        setFormData(originalData);
        onClose();
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await axios.post(
                    "http://localhost:8080/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                handleInputChange("poster", response.data.filePath); // Update the poster path
            } catch (error) {
                console.error("Image upload failed:", error);
            }
        }
    };

    if (!formData) {
        return null; // Do not render if formData is not available
    }

    return (
        <React.Fragment>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                fullScreen={fullScreen}
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Movie Details
                </DialogTitle>
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2, // Adds consistent spacing between rows
                    }}
                >
                    {isLoading ? (
                        "waiting"
                    ) : (
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                    overflowY: "hidden",
                                }}
                            >
                                <DialogContentText
                                    sx={{
                                        minWidth: "150px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    ID
                                </DialogContentText>
                                <TextField
                                    fullWidth
                                    id="id"
                                    label={Movie.Id ? null : "Movie ID"}
                                    variant="outlined"
                                    value={formData.id || ""}
                                    onChange={(e) =>
                                        handleInputChange("id", e.target.value)
                                    }
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
                                <DialogContentText
                                    sx={{
                                        minWidth: "150px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Title
                                </DialogContentText>
                                <TextField
                                    fullWidth
                                    id="title"
                                    label={Movie.Title ? null : "Movie Title"}
                                    variant="outlined"
                                    value={formData.title || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "title",
                                            e.target.value
                                        )
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
                                <DialogContentText
                                    sx={{
                                        minWidth: "150px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Genres
                                </DialogContentText>
                                <Autocomplete
                                    fullWidth
                                    multiple
                                    id="size-small-outlined-multi"
                                    size="small"
                                    options={genres}
                                    defaultValue={
                                        formData.genres || [
                                            "Option 1",
                                            "Option 2",
                                            "Option 3",
                                        ]
                                    } // Initial value
                                    getOptionLabel={(option) =>
                                        option.GenreName
                                    }
                                    value={formData.genres}
                                    onChange={(e, value) =>
                                        handleInputChange("genres", value)
                                    }
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
                                <DialogContentText
                                    sx={{
                                        minWidth: "150px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Running Time
                                </DialogContentText>
                                <TextField
                                    fullWidth
                                    id="running-time"
                                    label={
                                        Movie.RunningTime
                                            ? null
                                            : "Running Time"
                                    }
                                    variant="outlined"
                                    value={formData.runningTime || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "runningTime",
                                            e.target.value
                                        )
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
                                <DialogContentText
                                    sx={{
                                        minWidth: "150px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Movie Description
                                </DialogContentText>
                                <TextField
                                    fullWidth
                                    id="movie-desc"
                                    label={
                                        Movie.MovieDescription
                                            ? null
                                            : "Description"
                                    }
                                    variant="outlined"
                                    multiline
                                    minRows={3}
                                    value={formData.description || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "description",
                                            e.target.value
                                        )
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
                                <DialogContentText
                                    sx={{
                                        minWidth: "150px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Poster
                                </DialogContentText>
                                <CardMedia
                                    component="img"
                                    sx={{ width: "100px" }}
                                    height="110"
                                    image={
                                        formData.poster
                                            ? `${process.env.REACT_APP_API_URL}/${formData.poster}`
                                            : "placeholder.jpg"
                                    }
                                    alt="Paella dish"
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
                                        // onChange={(event) =>
                                        //     console.log(event.target.files)
                                        // }
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
                                <DialogContentText
                                    sx={{
                                        minWidth: "150px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Release Date
                                </DialogContentText>
                                <TextField
                                    fullWidth
                                    id="release-date"
                                    label={
                                        Movie.ReleaseDate
                                            ? null
                                            : "Release Date"
                                    }
                                    variant="outlined"
                                    value={formData.releaseDate || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "releaseDate",
                                            e.target.value
                                        )
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
                                <DialogContentText
                                    sx={{
                                        minWidth: "150px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Trailer
                                </DialogContentText>
                                <TextField
                                    fullWidth
                                    id="trailer"
                                    label={Movie.Trailer ? null : "Trailer URL"}
                                    variant="outlined"
                                    value={formData.trailer || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "trailer",
                                            e.target.value
                                        )
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
                                <DialogContentText
                                    sx={{
                                        minWidth: "150px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Status
                                </DialogContentText>
                                <TextField
                                    select
                                    defaultValue={
                                        formData.status || Movie.MovieStatusId
                                    }
                                    fullWidth
                                    id="status"
                                    label={
                                        Movie.MovieStatusId ? null : "Status"
                                    }
                                    variant="outlined"
                                    onChange={(e) =>
                                        handleInputChange(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                >
                                    {statusType.map((status) => (
                                        <MenuItem
                                            key={status.value}
                                            value={status.value}
                                        >
                                            {status.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" autoFocus onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={onClose} autoFocus>
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ResponsiveDialog;
