import * as movie from "../model/Movie";

export async function createMovie(title:string, synopsis:string, releaseYear: number, duration: number) {
    try {
        const response = await movie.createMovieModel(title, synopsis, releaseYear, duration);
        return response;
    }
    catch(err){
        return { message: "Something went wrong" };
    }
}

export async function findMovieByPublicId(publicId: string) {
    try {
        const movieByPublicId = await movie.findMovieByPublicIdModel(publicId);

        if (movieByPublicId == undefined) {
            return { message: "Movie not found" };
        }

        return movieByPublicId;

    }
    catch(err){
        return { message: "Something went wrong" };
    }
}

export async function findMoviesByTitle(title: string) {
    try {
        const moviesByTitle = await movie.findMoviesByTitleModel(title);

        if (moviesByTitle == undefined) {
            return { message: "Movie not found" };
        }

        return moviesByTitle;

    }
    catch(err){
        return { message: "Something went wrong" };
    }
}

export async function selectMovies() {
    try {
        const movies = await movie.selectMoviesModel();
        return movies;

    }
    catch(err){
        return { message: "Something went wrong" };
    }
}

export async function deleteMovie(id: number) {
    try {
        const movieById = await movie.findMovieByIdModel(id);

        if (movieById == undefined) {
            return { message: "Movie not found" };
        }

        const response = await movie.deleteMovieModel(id);

        return response;

    }
    catch(err){
        return { message: "Something went wrong" };
    }
}