const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database");

const Food = sequelize.define(
    "Food",
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        FoodName: {
            type: DataTypes.STRING(100),
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
        tableName: "Food",
        timestamps: false, // No createdAt/updatedAt fields
    }
);

module.exports = Food;
