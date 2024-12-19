const express = require('express');
const {auth} = require("../middlewares/auth");
const router  = express.Router();
const adminController = require("../controllers/adminController");
const movieController = require("../controllers/movieController");
// const upload = require("../controllers/adminController");
// const multer = require("multer");
// const upload = multer({ dest: 'uploads/' })

const upload = adminController.upload; // Access 'upload' from the exported object

router.get("/getTopBookedMovie", adminController.getTop3BookedMovies);

router.get("/getTotalSeatsBooked", adminController.getTotalSeatsBooked);

router.get("/getGenres", adminController.getGenres);

router.post("/uploadPoster", upload.single("poster"), adminController.uploadPoster);

router.put("/updateMovie/:id", upload.single("poster") ,movieController.updateMovie);

module.exports = router;