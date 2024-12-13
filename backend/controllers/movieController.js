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

const addNewMovie = async (req, res) => {
    try{

    }catch (error){

    }
}

const updateMovie = async (req, res) => {
    try{
        const { params, body, file } = req;

        const movieId = params.id;

        const movie = await Movie.findByPk(movieId);
        
        if (!movie) {
            return res.status(404).json({
                success: false,
                error: "Movie not found",
            });
        }

        let posterPath = movie.Poster;
        if (file) {
            const posterFileName = `${Date.now()}_${file.originalname}`;
            const newPosterPath = `/public/posters/${posterFileName}`;
            const targetPath = path.join(__dirname, "..", "public", "posters", posterFileName);

            // Save the new poster file
            fs.writeFileSync(targetPath, file.buffer);

            if (posterPath) {
                const oldPosterPath = path.join(__dirname, "..", posterPath);
                if (fs.existsSync(oldPosterPath)) {
                    fs.unlinkSync(oldPosterPath); // Delete the old file
                }
            }

            posterPath = newPosterPath; // Update the path

            await movie.update({
                ...body,
                Poster: posterPath, // Update the poster path in the database
            });

            return res.status(200).json({
                success: true,
                data: movie,
            });
        }
    }catch (error){
        console.error("Error updating movie:", error);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

module.exports = {
    getAllMovie,
    getShowByDate,
    getSeats,
    getSnacks
};
