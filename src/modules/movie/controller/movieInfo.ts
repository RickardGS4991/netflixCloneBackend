import { Response } from "express";
import { IMoviesInfo } from "../interfaces/iMoviesInfo";

export class MovieInfoController {
    constructor(private datasource: IMoviesInfo){}

    async getPopularMovies(res: Response){
        try {
            let info = await this.datasource.getPopularMovies();
            res.status(201).json({data: info, message: `Request completed correctly`});
        } catch (error:any) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }

    async getTrendingMovies(res: Response){
        try {
            let info = await this.datasource.getTrendingMovie();
            res.status(201).json({data: info, message: `Request completed correctly`});
        } catch (error: any) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }
}