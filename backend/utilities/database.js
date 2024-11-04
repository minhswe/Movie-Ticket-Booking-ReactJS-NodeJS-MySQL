const mysql2 = require("mysql2");
const dotenv = require("dotenv");
const Sequelize = require('sequelize');
dotenv.config();

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,   
    process.env.MYSQL_PASSWORD,    
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
    }
);


const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database');

        const results = await sequelize.query("SELECT * FROM Users");

        console.log(results[0][0]);

    } catch (err) {
        console.log('Database connection or query execution failed', err);
    }
}


module.exports = { 
    sequelize,
    dbConnection };
