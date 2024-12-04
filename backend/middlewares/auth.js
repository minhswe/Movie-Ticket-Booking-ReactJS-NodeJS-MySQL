const jwt = require('jsonwebtoken');
const User = require("../models/user");
const { where } = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();

const getTokenFromHeader = (req) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1]; // Extract the token after "Bearer"
    }
    return null; // No token found
};

const auth = async (req, res, next) => {
    // if (req.header('Authorization') === null || req.header('Authorization') === undefined){
    //     return res.status(401).json("Authorization is null or undefined");
    // }
    // const token = req.header('Authorization').replace('Bearer ', '').trim();
    const token = getTokenFromHeader(req);
    try{
        const data = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({where: {Username: data.username}});
        console.log("auth method ", user)
        if (!user){
            return res.status(401).json({ message: 'Not authorized to access this resource' });
        }
        req.user = user;
        req.token = token;
        next();
    }catch (error){
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired', expiredAt: error.expiredAt });
        }
        res.status(401).json({message: 'Not authorized to access this resource'});
    }
}

const getUsernameByToken = (token) => {
    try {
        // Verify and decode the token using the secret key
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // Assuming the token contains a `username` field in its payload
        return decoded.username || null;
    } catch (error) {
        console.error("Error decoding token:", error.message);
        // Handle token-specific errors like expiration
        if (error.name === "TokenExpiredError") {
            console.error("Token has expired:", error.expiredAt);
        }
        return null; // Return null if the token is invalid or expired
    }
};



module.exports = {
    auth,
    getTokenFromHeader,
    getUsernameByToken
    
}