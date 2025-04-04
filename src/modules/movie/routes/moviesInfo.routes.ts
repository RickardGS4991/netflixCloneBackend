import express from 'express';
import { MoviesInfoImpl } from '../datasources/moviesInfo';
import { MovieInfoController } from '../controller/movieInfo';

const movieRouter = express.Router();
const movieDatasource = new MoviesInfoImpl();
const movieController = new MovieInfoController(movieDatasource);

movieRouter.get('/v1/api/movies/movie_popular', movieController.getPopularMovies.bind(movieController));
movieRouter.get('/v1/api/movies/movie_trending', movieController.getTrendingMovies.bind(movieController));
movieRouter.get('/v1/api/movies/:id/trailer', movieController.getTrailerMovie.bind(movieController));
movieRouter.get('/v1/api/movies/:id/details', movieController.getDetailsMovie.bind(movieController));
movieRouter.get('/v1/api/movies/:id/similar', movieController.getSimilarMovies.bind(movieController));
movieRouter.get('/v1/api/movies/:category', movieController.getCategories.bind(movieController));

export default movieRouter;