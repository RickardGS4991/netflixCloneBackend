import axios from "axios";
import { IMoviesInfo } from "../interfaces/iMoviesInfo";
import { TMBDURL } from "../model/urlTMBD";

export class MoviesInfoImpl implements IMoviesInfo{
   async getPopularMovies(): Promise<any> {
    try {
        const options = {
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer '+process.env.TOKEN_MOVIES
            }
          };
        let popularMovies = await axios.get(TMBDURL.urlPopular, options);
        if(popularMovies.status !== 200){
            throw new Error(`Unable to retrieve information from API : ${popularMovies.statusText}`);
        }

        return popularMovies.data
        
    } catch (error) {
        throw new Error(`Error on server TMDB: ${error}`);
    }
    }

    async getTrendingMovie(): Promise<any>{
        try {
            const options = {
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer '+process.env.TOKEN_MOVIES
                }
              };
            let trendingMovies = await axios.get(TMBDURL.urlTrending, options);
            if(trendingMovies.status !== 200){
                throw new Error(`Unable to retrieve information from API : ${trendingMovies.statusText}`);
            }

            const randomMovie = trendingMovies.data.results[Math.floor(Math.random()*trendingMovies.data.results.length)]

            return randomMovie;
        } catch (error: any) {
            throw new Error(`Error on server TMDB: ${error}`);
        }
    }
}