const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database"); // Adjust the path to your database connection

const Theater = sequelize.define(
    "Theater",
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        TheaterName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        NumberOfHall: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        AddressId: {
            type: DataTypes.STRING(50),
            allowNull: false,
            references: {
                model: "Addresses",
                key: "Id",
            },
        },
    },
    {
        tableName: "Theaters",
        timestamps: false, // No createdAt/updatedAt fields
    }
);

module.exports = Theater;
