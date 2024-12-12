const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database"); // Adjust the path to your database connection

const UserType = sequelize.define(
    "UserType",
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        RoleName: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
    },
    {
        tableName: "UserTypes",
        timestamps: false, // Disable timestamps if you don't have `createdAt` or `updatedAt`
    }
);

module.exports = UserType;
