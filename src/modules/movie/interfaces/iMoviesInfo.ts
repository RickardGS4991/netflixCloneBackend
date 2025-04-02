export interface IMoviesInfo{
    getPopularMovies(): Promise<any>;
    getTrendingMovie(): Promise<any>;
    getTrailerMovie(id: string): Promise<any>;
    getMovieDetails(id: string): Promise<any>;
}