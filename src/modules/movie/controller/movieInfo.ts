import express, { Request, Response } from "express";
import { IMoviesInfo } from "../interfaces/iMoviesInfo";

export class MovieInfoController {
    constructor(private datasource: IMoviesInfo){}

    async getPopularMovies(req: Request, res: Response): Promise<void>{
        try {
            let info = await this.datasource.getPopularMovies();
            res.status(201).json({data: info, message: `Request completed correctly`});
        } catch (error:any) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }

    async getTrendingMovies(req: Request, res: Response): Promise<void>{
        try {
            let info = await this.datasource.getTrendingMovie();
            res.status(201).json({data: info, message: `Request completed correctly`});
        } catch (error: any) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }

    async getTrailerMovie(req: Request, res: Response): Promise<void>{
        try {
            let id = String(req.params.id);

            let trailer = await this.datasource.getTrailerMovie(id);
            if(!trailer){
                res.status(404).json({data: null, message: `Error on server`});
                return;
            }

            res.status(201).json({data: trailer, message:`Request completed correctly`});
        } catch (error) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }

    async getDetailsMovie(req: Request, res: Response): Promise<void>{
        try {
            let id = String(req.params.id);
            console.log(id);

            let trailer = await this.datasource.getMovieDetails(id);
            if(!trailer){
                res.status(404).json({data: null, message: `Error on server`});
                return;
            }

            res.status(201).json({data: trailer, message:`Request completed correctly`});
        } catch (error) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }
}