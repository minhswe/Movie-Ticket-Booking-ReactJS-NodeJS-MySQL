const express = require('express');
const MovieController = require('../controllers/movieController');
const {auth} = require("../middlewares/auth");

const router = express.Router();

router.get("/now-showing", MovieController.getAllMovie);

router.get("/shows", MovieController.getShowByDate);

router.get("/movie/:movieId/show/:showId/seats", auth, MovieController.getSeats);

router.get("/snacks", MovieController.getSnacks)

module.exports = router;