const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database");

const Snack = sequelize.define(
    "Snack",
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        ItemName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Image: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        Price: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
    },
    {
        tableName: "Snacks",
        timestamps: false, // No createdAt/updatedAt fields
    }
);

module.exports = Snack;