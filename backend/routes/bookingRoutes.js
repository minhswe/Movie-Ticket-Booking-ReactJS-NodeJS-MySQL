const express = require('express');
const bookingController = require("../controllers/bookingController");
const mySQLProcedure = require("../models/mySQLProcedure");
const {auth} = require("../middlewares/auth");
const router  = express.Router();

router.get("/getShowBookingId", bookingController.getNextIdCount);

router.post("/addShowbooking", bookingController.addShowBooking);

router.post("/addSeatBooking", bookingController.addSeatBooking);

router.post("/addSnackBooking", bookingController.addSnackBooking);

router.post("/holdSeatForShow", bookingController.holdSeatForShow);

router.get("/findSeatNotAvailable", bookingController.findSeatNotAvailable);

router.get("/getBookingsByUser", auth, mySQLProcedure.getBookingsByUser);

router.get("/countBooking", auth, bookingController.countBooking);

router.get("/getTotalAmount", bookingController.getTotalAmount);


module.exports = router;