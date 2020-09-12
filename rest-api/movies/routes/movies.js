const express = require('express');

const moviesController = require('../controllers/movies');

const router = express.Router();

router.get("/all", moviesController.getMovies);

router.post("/add-new", moviesController.addMovie);

router.delete("/delete-movie/:movieId", moviesController.deleteMovie)

router.put('/reccomendations/:movieId/:accept', moviesController.updateMovie);

module.exports = router;