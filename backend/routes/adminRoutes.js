const express = require('express');
const {auth} = require("../middlewares/auth");
const router  = express.Router();
const adminController = require("../controllers/adminController");

router.get("/getTopBookedMovie", adminController.getTop3BookedMovies);

router.get("/getTotalSeatsBooked", adminController.getTotalSeatsBooked);

module.exports = router;