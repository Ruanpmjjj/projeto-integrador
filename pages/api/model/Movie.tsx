import { prisma } from "@/db";

export async function createMovieModel(title: string , synopsis: string, releaseYear: string, duration: string, image: string, genres: Array<number>) {
    var connectArray: Array<any> = [];

    genres.map(item => (
        connectArray.push({
            id: item
        })
    ));

    const movie = await prisma.movie.create({
        data: {
            title: title,
            synopsis: synopsis,
            releaseYear: releaseYear,
            duration: duration,
            imageURL: image,
            genres: {
                connect: connectArray
            }
        }
    });

    return movie;
}

export async function findMovieByPublicIdModel(publicId: string) {
    const movie = await prisma.movie.findUnique({
        where: {
            publicId: publicId
        },
        include: {
            ratings: {
                include: {
                    user: true,
                }
            }
        }
    });

    return movie;
}

export async function findMoviesByTitleModel(title: string) {
    const movies = await prisma.movie.findMany({
        where: {
            title: title
        }
    });

    return movies;
}

export async function findMovieByIdModel(_id: number) {
    const movie = await prisma.movie.findUnique({
        where: {
            id: _id
        }
    });

    return movie;
}

export async function selectMoviesModel() {
    const movies = await prisma.movie.findMany();

    return movies;
}

export async function deleteMovieModel(_id: number) {
    const movie = await prisma.movie.delete({
        where: {
            id: _id
        }
    });

    return movie;
}