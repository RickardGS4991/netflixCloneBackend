import { Request, Response } from "express";
import { IMoviesInfo } from "../interfaces/iMoviesInfo";
import { TMBDURL } from "../model/urlTMBD";

export class MovieInfoController {
    constructor(private datasource: IMoviesInfo){}

    async getPopularMovies(req: Request, res: Response): Promise<void>{
        try {
            let info = await this.datasource.getInfoFromTMDB(TMBDURL.urlPopular);
            res.status(201).json({data: info.results, message: `Request completed correctly`});
        } catch (error:any) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }

    async getTrendingMovies(req: Request, res: Response): Promise<void>{
        try {
            let info = await this.datasource.getInfoFromTMDB(TMBDURL.urlTrending);
            let trendingMovie = info.results[Math.floor(Math.random()*info.results.length)]
            res.status(201).json({data: trendingMovie, message: `Request completed correctly`});
        } catch (error: any) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }

    async getTrailerMovie(req: Request, res: Response): Promise<void>{
        try {
            let id = String(req.params.id);
            if(!id){
                res.status(404).json({data: null, message: `Id not available`});
            }

            let url = TMBDURL.urlCommon + `/${id}/videos?language=en-US`;
            let trailer = await this.datasource.getInfoFromTMDB(url);
            if(!trailer){
                res.status(404).json({data: null, message: `Error on server`});
                return;
            }

            res.status(201).json({data: trailer.results, message:`Request completed correctly`});
        } catch (error) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }

    async getDetailsMovie(req: Request, res: Response): Promise<void>{
        try {
            let id = String(req.params.id);
            if(!id){
                res.status(404).json({data: null, message: `Id not available`});
            }

            let url = TMBDURL.urlCommon + `/${id}?language=en-US`;

            let details = await this.datasource.getInfoFromTMDB(url);
            if(!details){
                res.status(404).json({data: null, message: `Error on server`});
                return;
            }

            res.status(201).json({data: details, message:`Request completed correctly`});
        } catch (error) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }

    async getSimilarMovies(req: Request, res: Response){
        try {
            let id = String(req.params.id);
            if(!id){
                res.status(404).json({data: null, message: `Id not available`});
            }

            let url = TMBDURL.urlCommon + `/${id}/similar?language=en-US&page=1`;

            let similar = await this.datasource.getInfoFromTMDB(url);
            if(!similar){
                res.status(404).json({data: null, message: `Error on server`});
                return;
            }

            res.status(201).json({data: similar, message:`Request completed correctly`});
        } catch (error) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }

    async getCategories(req: Request, res: Response){
        try {
            let categories = String(req.params.category);
            if(!categories){
                res.status(404).json({data: null, message: `Id not available`});
            }

            let url = TMBDURL.urlCommon + `/${categories}?language=en-US&page=1`;

            let category = await this.datasource.getInfoFromTMDB(url);
            if(!category){
                res.status(404).json({data: null, message: `Error on server`});
                return;
            }

            res.status(201).json({data: category.results, message:`Request completed correctly`});
        } catch (error) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }
}