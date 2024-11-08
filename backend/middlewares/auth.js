const jwt = require('jsonwebtoken');
const User = require("../models/user");
const { where } = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '').trim();
    const data = jwt.verify(token, process.env.SECRET_KEY);
    try{
        const user = await User.findOne({where: {Username: data.username}});
        console.log("auth method ", user)
        if (!user){
            return res.status(401).json({ message: 'Not authorized to access this resource' });
        }
        req.user = user;
        req.token = token;
        next();
    }catch (error){
        res.status(401).json({message: 'Not authorized to access this resource'});
    }
}

module.exports = {
    auth,
}