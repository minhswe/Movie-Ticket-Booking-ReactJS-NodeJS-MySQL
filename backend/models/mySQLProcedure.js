const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../utilities/database");
const {getTokenFromHeader ,getUsernameByToken} = require("../middlewares/auth");

const getBookingsByUser = async (req, res) => {
    const token = getTokenFromHeader(req);
    const username = getUsernameByToken(token);
    try{
        const result = await sequelize.query("CALL GetBookingsByUsername(:username)", {
            replacements: {username},
        });
        res.status(200).json(result);
    }catch (error){
        console.error("Error executing GetBookingsByUsername(:username):", error.message);
        res.status(401).json(error); // Re-throw the error to handle it at a higher level
    }
}

module.exports = {
    getBookingsByUser,
}