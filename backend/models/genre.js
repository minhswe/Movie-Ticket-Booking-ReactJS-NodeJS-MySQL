const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database"); // Adjust the path to your database connection

const Genre = sequelize.define(
    "Genre",
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        GenreName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: "Genres",
        timestamps: false,
    }
);

module.exports = Genre;