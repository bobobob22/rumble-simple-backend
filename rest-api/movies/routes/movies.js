const express = require('express');

const moviesController = require('../controllers/movies');

const router = express.Router();

//get
router.get("/all", moviesController.getMovies);

//POST - adding new pet
router.post("/add-new", moviesController.addMovie);

router.delete("/delete-movie/:movieId", moviesController.deleteMovie)


module.exports = router;