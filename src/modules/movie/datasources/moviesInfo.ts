import axios from "axios";
import { IMoviesInfo } from "../interfaces/iMoviesInfo";

export class MoviesInfoImpl implements IMoviesInfo{
    async getInfoFromTMDB(url: string){
      try {
        const options = {
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer '+process.env.TOKEN_MOVIES
            }
          };
        let response = await axios.get(url, options);
        if(response.status !== 200){
            throw new Error(`Unable to retrieve information from API : ${response.statusText}`);
        }

        return response.data;
        
      } catch (error) {
        throw new Error(`Error on server TMDB: ${error}`);
      }
    }
}