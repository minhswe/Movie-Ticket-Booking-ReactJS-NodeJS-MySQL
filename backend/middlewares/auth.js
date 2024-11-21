const jwt = require('jsonwebtoken');
const User = require("../models/user");
const { where } = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();

const auth = async (req, res, next) => {
    if (req.header('Authorization') === null || req.header('Authorization') === undefined){
        return res.status(401).json("Authorization is null or undefined");
    }
    const token = req.header('Authorization').replace('Bearer ', '').trim();
    // let data;
    // try {
    //     // Wrap jwt.verify in a try-catch to handle errors
    //     data = jwt.verify(token, process.env.SECRET_KEY);
    // } catch (error) {
    //     // Handle specific JWT errors
    //     if (error.name === 'TokenExpiredError') {
    //         return res.status(401).json({ message: 'Token has expired', expiredAt: error.expiredAt });
    //     }
    //     return res.status(401).json({ message: 'Invalid token or not authorized' });
    // }
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

module.exports = {
    auth,
}