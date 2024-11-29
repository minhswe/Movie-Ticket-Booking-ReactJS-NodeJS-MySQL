const express = require('express');
const bookingController = require("../controllers/bookingController");
const router  = express.Router();

router.get("/getShowBookingId", bookingController.getNextIdCount);

router.post("/addShowbooking", bookingController.addShowBooking);

router.post("/addSeatBooking", bookingController.addSeatBooking);

router.post("/addSnackBooking", bookingController.addSnackBooking);

router.post("/holdSeatForShow", bookingController.holdSeatForShow);

router.get("/findSeatNotAvailable", bookingController.findSeatNotAvailable);

module.exports = router;