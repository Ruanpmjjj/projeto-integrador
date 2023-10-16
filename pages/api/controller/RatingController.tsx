import { findMovieByPublicIdModel } from "../model/Movie";
import { findUserByModelNickName } from "../model/user";
import * as ratingModel from "../model/Rating";

export async function createRating(grade: number, nickName: string, moviePublicId: string, description = "") {
    //try {
        const userByNickName = await findUserByModelNickName(nickName);
        
        if (userByNickName == undefined) {
            return { message: "User not found."};
        }

        const movieByPublicId = await findMovieByPublicIdModel(moviePublicId);

        if (movieByPublicId == undefined) {
            return { message: "Movie not found."};
        }

        const ratingByUserAndMovie = await ratingModel.findRatingByUserAndMovieModel(userByNickName.id, movieByPublicId.id);

        if (ratingByUserAndMovie != undefined) {
            return { message: "Rating already exists"};
        }

        const response = await ratingModel.createRatingModel(grade, description, userByNickName.id, movieByPublicId.id);

        console.log(response);

        return response;

    //} catch (error) {
        return { message: "Something went Wrong."};
    //}
}