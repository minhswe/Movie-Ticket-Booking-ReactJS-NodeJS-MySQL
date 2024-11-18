const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database"); // Adjust the path to your database connection

const Hall = sequelize.define(
    "Hall",
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        HallNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        NumberOfSeat: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        TheaterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Theaters",
                key: "Id",
            },
        },
    },
    {
        tableName: "Halls",
        timestamps: false, // No createdAt/updatedAt fields
    }
);
module.exports = Hall;
