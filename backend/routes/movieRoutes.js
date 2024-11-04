const express = require('express');

const MovieController = require('../controllers/movieController');

const router = express.Router();

router.get("/now-showing", MovieController.getAllMovie);

module.exports = router;