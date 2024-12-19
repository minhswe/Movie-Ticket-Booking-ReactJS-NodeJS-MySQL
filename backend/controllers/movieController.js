const Movie = require("../models/movie.js");
const Genre = require("../models/genre.js");
const MoviesGenres = require("../models/moviesgenres.js");
const Show = require("../models/show.js");
const Hall = require("../models/hall.js");
const Theater = require("../models/theater.js");
const Address = require("../models/address.js");
const Seat = require("../models/seat.js");
const SeatType = require("../models/seattypes.js");
const Snack = require("../models/snack.js");

const multer = require("multer");
const path = require('path');
const fs = require("fs");

Movie.belongsToMany(Genre, { through: MoviesGenres, foreignKey: "MovieId" });
Genre.belongsToMany(Movie, { through: MoviesGenres, foreignKey: "GenreId" });
Show.belongsTo(Movie, { foreignKey: "MovieId", as: "Movie" });
Show.belongsTo(Hall, { foreignKey: "HallId", as: "Hall" });
Hall.belongsTo(Theater, { foreignKey: "TheaterId", as: "Theater" });
Theater.belongsTo(Address, { foreignKey: "AddressId", as: "Address" });
Seat.belongsTo(Hall, {foreignKey: "HallId", as: "Hall"});
Seat.belongsTo(SeatType, {foreignKey: "SeatTypeId", as: "SeatType"});
SeatType.hasMany(Seat, { foreignKey: "SeatTypeId", as: "Seats" });

const getAllMovie = async (req, res) => {
    const statusId = req.query.movieStatusId;
    try {
        const movies = await Movie.findAll({
            where: { MovieStatusId: statusId },
            include: {
                model: Genre,
                through: { attribute: [] }, // Exclude join table attributes if you don’t need them
            },
        });
        res.status(200).json(movies);
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({
            message: "An error occurred while retrieving the movies",
        });
    }
};

const getShowByDate = async (req, res) => {
    const selectedDate = req.query.selectedDate;
    const movieId = req.query.movieId;
    try {
        const shows = await Show.findAll({
            where: { ShowDate: selectedDate, movieId: movieId },
            include: [
                {
                    model: Hall,
                    as: "Hall",
                    include: {
                        model: Theater,
                        as: "Theater",
                        include: {
                            model: Address,
                            as: "Address",
                        },
                    },
                },
            ],
        });

        const groupedShows = shows.reduce((result, show) => {
            const theater = show.Hall.Theater.TheaterName;
            const location = show.Hall.Theater.Address.AddressName;
            const hallId = show.Hall.Id;
            const hallName = show.Hall.HallNumber;
            const time = show.ShowTime;
            const showId = show.Id;
            const showPrice = show.Price;
            const existingEntry = result.find(
                (entry) =>
                    entry.theater === theater && entry.location === location
            );

            if (existingEntry) {
                existingEntry.times.push({time, hallId: hallId, hallName: hallName, showId: showId, showPrice: showPrice});
            } else {
                result.push({
                    theater,
                    location,
                    times: [{time, hallId: hallId, hallName: hallName, showId: showId, showPrice: showPrice}],
                });
            }
            return result;
        }, []);

        res.status(200).json(groupedShows);
    } catch (error) {
        console.error("Error fetching shows:", error);
        res.status(500).json({
            message: "An error occurred while retrieving the shows",
        });
    }
};

const getSeats = async (req, res) => {
    const { movieId, showId } = req.params;
    const hallId = parseInt(req.query.hallId);
    try{
        const seats = await Seat.findAll({
            where: {HallId: hallId},
            attributes: ["Id", "SeatName"],
            include: {
                model: SeatType,
                as: "SeatType",
                attributes: ["TypeName", "Price"]
            }
        });
        const formattedSeat = seats.map((seat) => ({
            Id: seat.Id,
            SeatName: seat.SeatName,
            TypeName: seat.SeatType.TypeName,
            Price: seat.SeatType.Price
        }));

        res.status(200).json(formattedSeat);
    }catch (error) {

    }
}

const getSnacks = async (req, res) => {
    try{
        const snacks = await Snack.findAll();
        res.status(200).json(snacks);
    }catch (error){
        console.error("Error fetching snacks:", error);
        res.status(500).json({ error: "Failed to fetch snacks" });
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the folder where images will be saved (public/posters/)
        const uploadDir = "public/posters/";
        
        // Ensure the folder exists, create it if it doesn't
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Specify the file name (e.g., timestamp + original file name)
        const fileExtension = path.extname(file.originalname);
        const fileName = Date.now() + fileExtension;
        cb(null, fileName);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB file size limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const mimeType = allowedTypes.test(file.mimetype);
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimeType && extname) {
            return cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }
    }
});

const uploadPoster = async (req, res) => {
    console.log(req.file)
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Construct the file path to be used by the frontend
        const filePath = `/public/posters/${req.file.filename}`;

        // Send back the file path in the response
        res.status(200).json({ filePath });

    } catch (error) {
        console.error("Error uploading poster:", error);
        res.status(500).json({ error: "Image upload failed" });
    }
};

const addNewMovie = async (req, res) => {
    console.log(req.file)
    try {
        console.log(req.body);
        const { title, runningTime, description, poster, releaseDate, trailerUrl, movieStatus, genres } = req.body;

        // Check if all required fields are provided
        // if (!title || !runningTime || !description || !releaseDate || !movieStatus) {
        //     return res.status(400).json({ error: "All required fields must be provided" });
        // }

        // Create the new movie entry in the database
        const newMovie = await Movie.create({
            Title: title,
            RunningTime: runningTime,
            MovieDescription: description,
            Poster: `/posters/${poster}`,
            ReleaseDate: releaseDate,
            Trailer: trailerUrl,
            MovieStatusId: movieStatus,
        });

        // If genres are provided, associate them with the movie
        if (genres && genres.length > 0) {
            // Find genre instances by their ids and associate them with the movie
            const genreInstances = await Genre.findAll({
                where: {
                    Id: genres,
                },
            });

            // Add the movie-genre associations to the MoviesGenres table
            await newMovie.addGenres(genreInstances);
        }

        // Respond with the created movie data
        return res.status(201).json({
            success: true,
            data: newMovie,
        });
    } catch (error) {
        console.error("Error adding new movie:", error);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};


const updateMovie = async (req, res) => {
    try{
        const { params, body, file } = req;

        const movieId = parseInt(params.id);
        const movie = await Movie.findByPk(movieId);
        if (!movie) {
            return res.status(404).json({
                success: false,
                error: "Movie not found",
            });
        }

        const updatedData = {
            Title: body.title,
            RunningTime: body.runningTime,
            MovieDescription: body.description,
            Poster: file ? posterPath : `/posters/${body.poster}`,
            ReleaseDate: body.releaseDate,
            Trailer: body.trailer,
            MovieStatusId: body.status,
        };

        // Update movie in the database
        await movie.update(updatedData);

        return res.status(200).json({
            success: true,
            data: movie,
        });
    }catch (error){
        console.error("Error updating movie:", error);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

const getLatestMovieId = async (req, res) => {
    try {
        // Fetch the latest movie based on the highest ID
        const latestMovie = await Movie.findOne({
            order: [["Id", "DESC"]],
            attributes: ["Id"], // Fetch only the `Id` field
        });

        if (latestMovie) {
            res.status(200).json({ latestMovieId: (latestMovie.Id + 1) });
        } else {
            res.status(404).json({ message: "No movies found." });
        }
    } catch (error) {
        console.error("Error fetching latest movie ID:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}



module.exports = {
    getAllMovie,
    getShowByDate,
    getSeats,
    getSnacks,
    updateMovie,
    getLatestMovieId,
    upload,
    addNewMovie,
    uploadPoster,
};
