const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database");

const Show = sequelize.define(
    "Show",
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        ShowDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        ShowTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        Price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        HallId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Hall", // Assuming a Hall model exists
                key: "Id",
            },
        },
        MovieId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Movie", // Assuming a Movie model exists
                key: "Id",
            },
        },
    },
    {
        tableName: "Shows",
        timestamps: false, // No createdAt/updatedAt fields
    }
);

module.exports = Show;
