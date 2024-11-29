const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database");

// SnackBooking Model
const SnackBooking = sequelize.define(
    "SnackBooking",
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        Username: {
            type: DataTypes.STRING(100),
            allowNull: true, // You can adjust this to false if it's mandatory
        },
        Price: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        ItemId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "Snacks",
                key: "Id",
            },
        },
        Quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        ShowBookingId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "ShowBookings", // Assuming ShowBookings table exists
                key: "Id",
            },
        },
    },
    {
        tableName: "SnackBookings",
        timestamps: false, // No createdAt/updatedAt fields
    }
);

module.exports = SnackBooking;