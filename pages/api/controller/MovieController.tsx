import * as movie from '../model/Movie';

export async function createMovie(title: string, synopsys: string, releaseYear: number, duration: number) {
    try {
        const response = await movie.createMovieModel(title, synopsys, releaseYear, duration);
        return response;

    } catch (error) {
        return { message: 'Something went Wrong'};
    }
}

export async function findMoviesByName(title: string) {
    try {
        const moviesByName = await movie.findMoviesByTitleModel(title);
        return moviesByName;

    } catch (error) {
        return { message: 'Something went Wrong'};
    }
}

export async function selectMovies() {
    try {
        const movies = await movie.selectMoviesModel();
        return movies;

    } catch (error) {
        return { message: 'Something went Wrong'};
    }
}

export async function deleteMovie(id: number) {
    try {
        const response = await movie.deleteMovieModel(id);
        return response;
        
    } catch (error) {
        return { message: 'Something went Wrong'};
    }
}