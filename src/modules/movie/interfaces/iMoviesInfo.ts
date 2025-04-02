export interface IMoviesInfo{
    getPopularMovies(): Promise<any>;
    getTrendingMovie(): Promise<any>;
}