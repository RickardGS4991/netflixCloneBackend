import { Router } from "express";
import { TVShowsImpl } from "../datasources/tvShows";

const tvRouter = Router();
const datasources = new TVShowsImpl();