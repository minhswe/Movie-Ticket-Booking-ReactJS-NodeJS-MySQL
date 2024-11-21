const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database");

const SeatType = sequelize.define(
    "SeatType",
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        TypeName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Price: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
    },
    {
        tableName: "SeatTypes",
        timestamps: false, // No createdAt/updatedAt fields
    }
);

module.exports = SeatType;
