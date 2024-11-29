const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database"); // Adjust the path to your database connection

const SeatBooking = sequelize.define(
    "SeatBooking",
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        Username: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        Price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        SeatId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Seats",
                key: "Id",
            },
        },
        ShowBookingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "ShowBookings",
                key: "Id",
            },
        },
    },
    {
        tableName: "SeatBookings",
        timestamps: false,
    }
);

module.exports = SeatBooking;
