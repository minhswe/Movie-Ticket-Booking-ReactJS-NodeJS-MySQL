const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database");

const Address = sequelize.define(
    "Address",
    {
        Id: {
            type: DataTypes.STRING(100),
            primaryKey: true,
            allowNull: false,
        },
        AddressName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: "Addresses",
        timestamps: false, // No createdAt/updatedAt fields
    }
);

module.exports = Address;
