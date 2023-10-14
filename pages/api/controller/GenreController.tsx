import { selectGenresModel } from "../model/Genre"

export async function selectGenres() {
    try {
        const genres = await selectGenresModel();

        return genres;

    }
    catch(err){
        return { message: "Something went wrong" };
    }
}