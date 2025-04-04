import { Router } from "express";
import { TVShowsImpl } from "../datasources/tvShows";
import { TVShowsController } from "../controller/tvShows";

const tvRouter = Router();
const datasources = new TVShowsImpl();
const controller = new TVShowsController(datasources);

tvRouter.get('/v1/api/tv/tv_trending', controller.getTrendingTvShows.bind(controller));
tvRouter.get('/v1/api/tv/:id/similar', controller.getSimilarTvs.bind(controller));
tvRouter.get('/v1/api/tv/:id/trailer', controller.getTVTrailers.bind(controller));
tvRouter.get('/v1/api/tv/:id/details', controller.getTvDetails.bind(controller));
tvRouter.get('/v1/api/tv/:category', controller.getTvCategories.bind(controller));

export default tvRouter;