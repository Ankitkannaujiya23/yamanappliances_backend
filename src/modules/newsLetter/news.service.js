import { createNewsLetter } from "./news.model.js";

export const saveNewsLetter = async (validatedData) => {

    

    const result = await createNewsLetter(validatedData);

    return result;
}