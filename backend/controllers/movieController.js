const { Model, where } = require("sequelize");

const Movie = require("../models/movie.js");

const getAllMovie = async (req, res) => {
    const statusId = req.query.movieStatusId;
    try{
        const movies = await Movie.findAll({
            where: {MovieStatusId: statusId}
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