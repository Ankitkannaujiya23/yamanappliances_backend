import db from "../../config/db.js";

export const createContact = async (contactData) => {

    const sql = `
        INSERT INTO contacts
        (
            name,
            email,
            mobile,
            subject,
            message
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        contactData.name,
        contactData.email,
        contactData.mobile,
        contactData.subject,
        contactData.message
    ];

    const [result] = await db.execute(sql, values);

    return result;
};