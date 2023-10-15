import { findMovieByPublicIdModel } from "../model/Movie";
import { findUserByModelEmail } from "../model/user";
import * as ratingModel from "../model/Rating";

export async function createRating(grade: number, email: string, moviePublicId: string, description = "") {
    try {
        const userByEmail = await findUserByModelEmail(email);
        console.log(userByEmail);
        
        if (userByEmail == undefined) {
            return { message: "User not found."};
        }

        const movieByPublicId = await findMovieByPublicIdModel(moviePublicId);

        if (movieByPublicId == undefined) {
            return { message: "Movie not found."};
        }

        const ratingByUserAndMovie = await ratingModel.findRatingByUserAndMovieModel(userByEmail.id, movieByPublicId.id);

        if (ratingByUserAndMovie != undefined) {
            return { message: "Rating already exists"};
        }

        const response = await ratingModel.createRatingModel(grade, description, userByEmail.id, movieByPublicId.id);

        return response;

    } catch (error) {
        return { message: "Something went Wrong."};
    }
}