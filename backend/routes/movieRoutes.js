const express = require('express');

const MovieController = require('../controllers/movieController');

const router = express.Router();

router.get("/now-showing", MovieController.getAllMovie);
router.get("/shows", MovieController.getShowByDate);
module.exports = router;