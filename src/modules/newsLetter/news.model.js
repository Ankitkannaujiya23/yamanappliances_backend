import db from "../../config/db.js";

export const createNewsLetter = async (validatedData) => {
    const query = `insert into newsletter (email)values(?)`;
    const value = [validatedData.email];
    const [result] = await db.execute(query, value);

    return result;
}