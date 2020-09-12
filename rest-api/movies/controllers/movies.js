const Movie = require('../models/movie');

exports.getMovies = (req, res, next) => {
    const offset = req.body.offset;
    const limit = req.body.limit;
    console.log("!!!!!!!!!!", offset, limit)

    Movie.find()
        .limit(limit)
        .skip(offset)
        .sort({updatedAt: -1})
        .then(movies => {
            res.status(200)
                .json( {movies: movies} )
        })
        .catch(err => {
            console.log(err)
        })
};


exports.addMovie = (req, res, next) => {
    const title = req.body.title;
    const summary = req.body.summary;
    const rating = req.body.rating;
    const imageURL = req.body.imageURL;

    const movie = new Movie({
        title: title,
        summary: summary,
        rating,
        imageURL,
    });

    movie.save()
        .then(result => {
            res.status(201).json({
                message: 'Movie has been added excellent',
                movie: result
            })
        })
        .catch(err => console.log(err))
};


exports.deleteMovie = (req, res, next) => {
    const movieId = req.params.movieId;

    Movie.findById(movieId)
        .then(movie => {
            if (!movie) {
                return;
            }
            return Movie.findByIdAndRemove(movieId);
        })
        .then(result => {
            console.log(result);
            res.status(200).json({ message: "Deleted movie"})
        })
        .catch(error => console.log(error));
}

exports.updateMovie = (req, res, next) => {
    const movieId = req.params.movieId;
    const accept = req.params.accept;

    Movie.findById(movieId)
        .then(movie => {
            if (!movie) {
                return;
            }
            movie.accept = accept;
            return movie.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({ message: "Deleted movie"})
        })
        .catch(error => console.log(error));
}