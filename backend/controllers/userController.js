const User = require("../models/user");
const UserType = require("../models/userType");
const { Op } = require("sequelize");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

dotenv.config();

User.belongsTo(UserType, { foreignKey: "UserTypeId", as: "UserType" });
UserType.hasMany(User, { foreignKey: "UserTypeId" });

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", error);
        res.status(500).send("Database connection or query execution failed.");
    }
};

const hashPassword = async (userPassword) => {
    try {
        return await bcrypt.hash(userPassword, saltRounds);
    } catch (err) {
        throw err;
    }
};

const newUser = async (req, res) => {
    try {
        const { Username, Email, UserTypeID } = req.body;
        const userPassword = req.body.UserPassword;
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ Username }, { Email }],
            },
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User with this username or email already exists.",
            });
        }

        const userType = UserTypeID !== undefined ? UserTypeID : 2;
        UserPassword = await hashPassword(userPassword);
        console.log("password: " + UserPassword);
        const user = await User.create({
            Username,
            UserPassword,
            Email,
            UserTypeID: userType,
        });

        res.status(201).json({
            message: "New user created successfully",
            user,
        });
    } catch (error) {
        console.error("Error creating new user:", error);
        res.status(500).json({
            message: "Failed to create user",
            error: error.message,
        });
    }
};

const checkUser = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({
            where: { username: username },
            include: {
                model: UserType,
                as: "UserType",
            },
        });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid username or password" });
        }
        const isPasswordValid = await bcrypt.compare(
            password,
            user.UserPassword
        );

        if (isPasswordValid) {
            const token = jwt.sign(
                {
                    username: user.Username,
                    userTypeId: user.UserTypeId,
                    roleName: user.UserType.RoleName,
                },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
            );
            return res.status(200).json({
                message: "Sign in successful",
                token,
                username: user.Username,
                userTypeId: user.UserTypeId,
                roleName: user.UserType.RoleName,
            });
        } else {
            return res.status(401).json({
                message: "Invalid username or password",
            });
        }
    } catch (error) {
        // console.log("Error during sign-in ", error);
        console.error("Error fetching users:", error);
        return res.status(500).json({
            message: "An error occurred. Please try again later.",
        });
    }
};

const getUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res
                .status(401)
                .json({ message: "Authorization header missing" });
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findOne({
            where: { username: decodedToken.username },
            include: { model: UserType, as: "UserType" },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            username: user.Username,
            email: user.Email,
            userTypeId: user.UserTypeId,
            roleName: user.UserType.RoleName,
        });
    } catch (error) {
        console.error("Error retrieving user data:", error);
        res.status(500).json({ message: "Failed to retrieve user data" });
    }
};

const countUser = async (req, res) => {
    try{
        const countUser = await User.count();
        res.status(200).json({numberOfUser: countUser});
    }catch (error){
        console.error("Error counting users:", error);
        res.status(500).json({message: "Failed to retrieve counting user data"});
    }
}

module.exports = {
    getUsers,
    newUser,
    checkUser,
    getUser,
    countUser
};
