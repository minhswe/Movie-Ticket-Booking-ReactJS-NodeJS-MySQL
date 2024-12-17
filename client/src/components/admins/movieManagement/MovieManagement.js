import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { movieApi } from "../../../api/axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";

import MovieDetailManagement from "./MovieDetailManagement";
import { useNavigate } from "react-router-dom";

const MovieManagement = () => {
    const [movieStatus, setMovieStatus] = useState(1);
    const [movies, setMovies] = useState([]);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [movieInDialog, setMovieInDialog] = useState({});

    const open = Boolean(anchorEl);

    const handleMenuClick = (event, movieId) => {
        setAnchorEl(event.currentTarget);
        setOpenMenuId(movieId); // Track which movie's menu is open
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setOpenMenuId(null);
    };

    const fetchNowShowingMovies = async (movieStatusId) => {
        try {
            const response = await movieApi.get("/now-showing", {
                params: { movieStatusId },
            });
            setMovies(response.data); // Update movies state
        } catch (err) {
            console.error("Failed to fetch movies:", err);
        }
    };

    const handleChange = (event) => {
        setMovieStatus(event.target.value);
    };

    useEffect(() => {
            fetchNowShowingMovies(movieStatus);
    }, [movieStatus]);


    const navigate = useNavigate();

    const handleViewDetail = (movieId) => {
        const selectedMovie = movies.find((movie) => movie.Id === movieId);
        if (selectedMovie) {
            console.log("Selected movie:", selectedMovie);
            navigate("/admin/movie-details", { state: { Movie: selectedMovie } });
        }
    }

    return (
        <>
            <div className="movie-management-container">
                <div className="item-wrapper">
                    <div className="movie-type-container">
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                {/* <InputLabel id="demo-simple-select-label">
                                    Movie's Status Type
                                </InputLabel> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={movieStatus}
                                    label={movieStatus ? null : "select movie's type"}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={1}>Now Showing</MenuItem>
                                    <MenuItem value={2}>Comming Soon</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="movie-table">
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 650 }}
                                size="small"
                                aria-label="movie table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell> </TableCell>{" "}
                                        {/* Checkbox column header */}
                                        <TableCell>Poster</TableCell>
                                        <TableCell align="left">ID</TableCell>
                                        <TableCell align="left">
                                            Title
                                        </TableCell>
                                        <TableCell align="left">
                                            Running Time
                                        </TableCell>
                                        <TableCell align="left">
                                            Release Date
                                        </TableCell>
                                        <TableCell align="left">
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {movies.map((movie) => (
                                        <TableRow
                                            key={movie.Id}
                                            sx={{
                                                "&:last-child td, &:last-child th":
                                                    { border: 0 },
                                            }}
                                        >
                                            <TableCell>
                                                <Checkbox
                                                // checked={selectedMovies.includes(
                                                //     movie.Id
                                                // )}
                                                // onChange={() =>
                                                //     handleCheckboxChange(
                                                //         movie.Id
                                                //     )
                                                // }
                                                // inputProps={{
                                                //     "aria-label": `Select ${movie.Title}`,
                                                // }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                <img
                                                    src={`${process.env.REACT_APP_API_URL}/${movie.Poster}`}
                                                    alt=""
                                                    width={60}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                {movie.Id}
                                            </TableCell>
                                            <TableCell align="left">
                                                {movie.Title}
                                            </TableCell>
                                            <TableCell align="left">
                                                {movie.RunningTime}
                                            </TableCell>
                                            <TableCell align="left">
                                                {movie.ReleaseDate}
                                            </TableCell>
                                            <TableCell align="left">
                                                <IconButton
                                                    aria-label="more"
                                                    aria-controls={`action-menu-${movie.Id}`}
                                                    aria-haspopup="true"
                                                    onClick={(event) => handleMenuClick(event, movie.Id)}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                    id={`action-menu-${movie.Id}`}
                                                    anchorEl={anchorEl}
                                                open={openMenuId === movie.Id}
                                                    onClose={handleMenuClose}
                                                    MenuListProps={{
                                                        "aria-labelledby":
                                                        `action-menu-${movie.Id}`,
                                                    }}
                                                >
                                                    <MenuItem
                                                        onClick={() => {
                                                            handleViewDetail(movie.Id);
                                                            console.log(
                                                                "View Details"
                                                            );
                                                        }}
                                                    >
                                                        View Detail
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={() => {
                                                            handleMenuClose();
                                                            console.log(
                                                                "Edit Movie"
                                                            );
                                                        }}
                                                    >
                                                        Edit
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={() => {
                                                            handleMenuClose();
                                                            console.log(
                                                                "Delete Movie"
                                                            );
                                                        }}
                                                    >
                                                        Delete
                                                    </MenuItem>
                                                </Menu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieManagement;
