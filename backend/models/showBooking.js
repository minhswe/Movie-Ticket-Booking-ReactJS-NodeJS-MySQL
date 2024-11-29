const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database"); // Adjust the path to your database connection

const ShowBooking = sequelize.define(
    "ShowBooking",
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        NumberOfSeat: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        TotalPrice: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        Username: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        ShowId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Shows",
                key: "Id",
            },
        },
    },
    {
        tableName: "ShowBookings",
        timestamps: false,
    }
);

module.exports = ShowBooking;
