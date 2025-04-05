import { NextFunction, Request, Response, Router } from "express";
import { TVShowsImpl } from "../datasources/tvShows";
import { TVShowsController } from "../controller/tvShows";
import { verifyToken } from "../../auth/controller/validateTokens.middleware";

const tvRouter = Router();
const datasources = new TVShowsImpl();
const controller = new TVShowsController(datasources);

tvRouter.get('/v1/api/tv/tv_trending', async (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
},controller.getTrendingTvShows.bind(controller));
tvRouter.get('/v1/api/tv/:id/similar', async (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
},controller.getSimilarTvs.bind(controller));
tvRouter.get('/v1/api/tv/:id/trailer', async (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
},controller.getTVTrailers.bind(controller));
tvRouter.get('/v1/api/tv/:id/details', async (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
},controller.getTvDetails.bind(controller));
tvRouter.get('/v1/api/tv/:category', async (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, next);
},controller.getTvCategories.bind(controller));

export default tvRouter;