import express, { NextFunction, Request, Response } from 'express';
import { MoviesInfoImpl } from '../datasources/moviesInfo';
import { MovieInfoController } from '../controller/movieInfo';
import { verifyToken } from '../../auth/controller/validateTokens.middleware';

const movieRouter = express.Router();
const movieDatasource = new MoviesInfoImpl();
const movieController = new MovieInfoController(movieDatasource);

movieRouter.get('/v1/api/movies/movie_popular', async (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
},movieController.getPopularMovies.bind(movieController));
movieRouter.get('/v1/api/movies/movie_trending',movieController.getTrendingMovies.bind(movieController));
movieRouter.get('/v1/api/movies/:id/trailer', 
//     async (req: Request, res: Response, next: NextFunction) => {
//     verifyToken(req, res, next);
// },
movieController.getTrailerMovie.bind(movieController));
movieRouter.get('/v1/api/movies/:id/details', async (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
},movieController.getDetailsMovie.bind(movieController));
movieRouter.get('/v1/api/movies/:id/similar', async (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
},movieController.getSimilarMovies.bind(movieController));
movieRouter.get('/v1/api/movies/:category', 
//     async (req: Request, res: Response, next: NextFunction) => {
//     verifyToken(req, res, next);
// },
movieController.getCategories.bind(movieController));

export default movieRouter;