const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database");

const Drinks = sequelize.define(
    "Drinks",
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        DrinkName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        Image: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        Price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    },
    {
        tableName: "Drinks",
        timestamps: false, // No createdAt/updatedAt fields
    }
);

module.exports = Drinks;
