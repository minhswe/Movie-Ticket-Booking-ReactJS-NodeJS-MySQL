const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database"); // Adjust the path to your database connection

const User = sequelize.define(
    "User",
    {
        Username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey: true,
        },
        UserPassword: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        UserTypeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "usertypes", // Name of the referenced table
                key: "ID", // Column of the referenced table
            },
        },
    },
    {
        tableName: "users",
        timestamps: false, // Disable timestamps if you don't have `createdAt` or `updatedAt`
    }
);

module.exports = User;
