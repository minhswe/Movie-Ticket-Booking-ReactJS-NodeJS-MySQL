// MoviesGenres.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database");

const MoviesGenres = sequelize.define(
    "MoviesGenres",
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        MovieId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Movies",
                key: "Id",
            },
            allowNull: false,
        },
        GenreId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Genres",
                key: "Id",
            },
            allowNull: false,
        },
    },
    {
        tableName: "MoviesGenres",
        timestamps: false,
    }
);

module.exports = MoviesGenres;
