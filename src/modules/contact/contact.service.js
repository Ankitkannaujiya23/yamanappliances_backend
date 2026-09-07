import { createContact } from "./contact.model.js";

export const saveContact = async (contactData) => {

    const result = await createContact(contactData);

    return result;
};