import { prisma } from "@/db";

export async function createMovieModel(title: string, synopsys: string, releaseYear: number, duration: number) {
    const movie = prisma.movie.create({
        data: {
            title: title,
            synopsis: synopsys,
            releaseYear: releaseYear,
            duration: duration
        }
    });

    return movie;
};

export async function findMoviesByTitleModel(title: string) {
    const movies = prisma.movie.findMany({
        where: {
            title: title
        }
    });
    return movies;
}

export async function findMovieByIdModel(id: number) {
    const movie = prisma.movie.findUnique({
        where: {
            id: id
        }
    });
    return movie;
}

export async function selectMoviesModel() {
    const movies = prisma.movie.findMany();
    return movies;
}

export async function deleteMovieModel(id: number) {
    const movie = prisma.movie.delete({
        where: {
            id: id
        }
    });

    return movie;
}