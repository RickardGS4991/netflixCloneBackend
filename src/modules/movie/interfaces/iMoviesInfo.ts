export interface IMoviesInfo{
    getInfoFromTMDB(url: string): Promise<any>;
};