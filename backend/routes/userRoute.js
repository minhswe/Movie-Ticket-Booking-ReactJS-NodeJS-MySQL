const express = require('express');

const UserController = require('../controllers/userController');

const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get('/getAll', UserController.getUsers);
router.post('/newUser', UserController.newUser);
router.post('/checkUser', UserController.checkUser);
router.get("/profile", auth, UserController.getUser);

module.exports = router;