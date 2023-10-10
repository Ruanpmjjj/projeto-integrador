import { prisma } from "@/db";

export async function createRatingModel(grade: number, description: string, userId: number, movieId: number) {
    const rating = await prisma.rating.create({
        data: {
            grade: grade,
            description: description,
            user: {
                connect: {
                    id: userId
                }
            },
            movie: {
                connect: {
                    id: movieId
                }
            }
        }
    });
    
    return rating;
}

export async function findRatingByUserAndMovieModel(userId: number, movieId: number) {
    const rating = await prisma.rating.findFirst({
        where: {
            userId: userId,
            movieId: movieId
        }
    })

    return rating;
}