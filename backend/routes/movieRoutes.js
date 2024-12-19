const express = require('express');
const movieController = require('../controllers/movieController');
const {auth} = require("../middlewares/auth");

const router = express.Router();
const upload = movieController.upload; 

router.get("/now-showing", movieController.getAllMovie);

router.get("/shows", movieController.getShowByDate);

router.get("/movie/:movieId/show/:showId/seats", auth, movieController.getSeats);

router.get("/snacks", movieController.getSnacks)

router.get("/getLatestMovieId", movieController.getLatestMovieId);

router.post("/uploadPoster", upload.single("poster"), movieController.uploadPoster);

router.post("/addNewMovie", upload.single("poster"), movieController.addNewMovie)

module.exports = router;