import express from 'express';
import { MoviesInfoImpl } from '../datasources/moviesInfo';
import { MovieInfoController } from '../controller/movieInfo';

const movieRouter = express.Router();
const movieDatasource = new MoviesInfoImpl();
const movieController = new MovieInfoController(movieDatasource);

movieRouter.get('/v1/api/movie_popular', movieController.getPopularMovies.bind(movieController));
movieRouter.get('/v1/api/movie_trending', movieController.getTrendingMovies.bind(movieController));
movieRouter.get('/v1/api/:id/trailer', movieController.getTrailerMovie.bind(movieController));
movieRouter.get('/v1/api/:id/details', movieController.getDetailsMovie.bind(movieController));

export default movieRouter;