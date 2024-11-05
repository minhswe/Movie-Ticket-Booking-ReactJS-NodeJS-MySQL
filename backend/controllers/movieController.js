const { Model, where } = require("sequelize");

const Movie = require("../models/movie.js");
const Genre = require("../models/genre.js");
const MoviesGenres = require("../models/moviesgenres.js");
Movie.belongsToMany(Genre, { through: MoviesGenres, foreignKey: "MovieId" });
Genre.belongsToMany(Movie, { through: MoviesGenres, foreignKey: "GenreId" });


const getAllMovie = async (req, res) => {
    const statusId = req.query.movieStatusId;
    try{
        const movies = await Movie.findAll({
            where: {MovieStatusId: statusId},
            include: {
                model: Genre,
                through: {attribute: []}  // Exclude join table attributes if you don’t need them
            }
        });
        res.status(200).json(movies);
    }catch (error){
        console.error("Error fetching movies:", error);
        res.status(500).json({ message: "An error occurred while retrieving the movies" });
    }
}

module.exports = {
    getAllMovie,
}