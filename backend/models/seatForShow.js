const { DataTypes } = require("sequelize");
const { sequelize } = require("../utilities/database"); // Adjust the path to your database connection

const SeatForShow = sequelize.define(
    "SeatForShow",
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        Username: {
            type: DataTypes.STRING(100), // Matches varchar(100) in SQL
            allowNull: true, // Allowing NULLs as the SQL does not specify NOT NULL
        },
        ShowId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Shows",
                key: "Id",
            },
        },
        SeatId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Seats",
                key: "Id",
            },
        },
        IsAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "SeatForShow",
        timestamps: false,
    }
);

module.exports = SeatForShow;
