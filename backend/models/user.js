const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database"); // Adjust the path to your database connection

const User = sequelize.define(
    "User",
    {
        Username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true,
        },
        Password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING(255),
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
