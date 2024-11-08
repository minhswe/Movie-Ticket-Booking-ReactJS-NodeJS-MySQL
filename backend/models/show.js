const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database"); // Adjust the path to your database connection
const Show = sequelize.define(
    "Show",
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        ShowDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        ShowTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        ShowPrice: {
            type: DataTypes.DECIMAL(8, 0),
            allowNull: false,
        },
        HallId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Halls",
                key: "Id",
            },
        },
        MovieId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Movies",
                key: "Id",
            },
        },
    },
    {
        sequelize,
        modelName: "Show",
        tableName: "Shows",
        timestamps: false,       // No createdAt/updatedAt fields
        freezeTableName: true,   // Use the exact table name as defined
    }
);
    

module.exports = Show;
