import { Request, Response } from "express";
import { ITVShow } from "../interfaces/iTvShows";
import { TVDB } from "../model/urlTvShows";

export class TVShowsController {
    constructor(private datasource: ITVShow){}

    async getTrendingTvShows(req: Request, res: Response): Promise<void>{
        try {
            let info = await this.datasource.getTvShowInfo(TVDB.urlTvTrending);
            let trendingMovie = info.results[Math.floor(Math.random()*info.results.length)]
            res.status(201).json({data: trendingMovie, message: `Request completed correctly`});
        } catch (error: any) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }

    async getTVTrailers(req: Request, res: Response): Promise<void>{
        try {
            let id = String(req.params.id);
            if(!id){
                res.status(404).json({data: null, message: `Id not available`});
            }
        
            let url = TVDB.urlCommon + `/${id}/videos?language=en-US`;
            let trailer = await this.datasource.getTvShowInfo(url);
            if(!trailer){
               res.status(404).json({data: null, message: `Error on server`});
               return;
            }
        
            res.status(201).json({data: trailer.results, message:`Request completed correctly`});
        } catch (error) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }

    async getTvDetails(req: Request, res: Response): Promise<void>{
        try {
            let id = String(req.params.id);
            if(!id){
                res.status(404).json({data: null, message: `Id not available`});
            }
        
            let url = TVDB.urlCommon + `/${id}?language=en-US`;
            let details = await this.datasource.getTvShowInfo(url);
            if(!details){
               res.status(404).json({data: null, message: `Error on server`});
               return;
            }
        
            res.status(201).json({data: details.results, message:`Request completed correctly`});
        } catch (error) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }

    async getSimilarTvs(req: Request, res: Response){
        try {
            let id = String(req.params.id);
            if(!id){
                res.status(404).json({data: null, message: `Id not available`});
            }
        
            let url = TVDB.urlCommon + `/${id}/similar?language=en-US&page=1`;
            let similar = await this.datasource.getTvShowInfo(url);
            if(!similar){
               res.status(404).json({data: null, message: `Error on server`});
               return;
            }
        
            res.status(201).json({data: similar.results, message:`Request completed correctly`});
        } catch (error) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }

    async getTvCategories(req: Request, res: Response): Promise<void>{
        try {
            let categories = String(req.params.category);
            if(!categories){
                res.status(404).json({data: null, message: `Id not available`});
            }
        
            let url = TVDB.urlCommon + `/${categories}?language=en-US&page=1`;
            let category = await this.datasource.getTvShowInfo(url);
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