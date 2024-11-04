const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database"); // Adjust the path to your database connection

const Movie = sequelize.define(
    "Movie",
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        Title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        RunningTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        MovieDescription: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        Poster: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        ReleaseDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Trailer: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        MovieStatusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "MovieStatuses",
                key: "Id",
            },
        },
    },
    {
        tableName: "Movies",
        timestamps: false, // Set to true if you have createdAt/updatedAt fields
    }
);


module.exports = Movie;
