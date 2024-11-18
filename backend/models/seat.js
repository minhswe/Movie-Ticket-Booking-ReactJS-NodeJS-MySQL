const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database");

const Seat = sequelize.define(
    "Seat",
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        SeatName: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        SeatRow: {
            type: DataTypes.CHAR(1),
            allowNull: true,
        },
        SeatCol: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        HallId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "Halls",
                key: "Id",
            },
        },
        SeatTypeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "SeatTypes",
                key: "Id",
            },
        },
    },
    {
        tableName: "Seats",
        timestamps: false, // No createdAt/updatedAt fields
    }
);

module.exports = Seat;
