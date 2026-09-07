import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";

import { contactSchema } from "./contact.validation.js";
import { saveContact } from "./contact.service.js";

export const createContact = asyncHandler(async (req, res) => {

    const validatedData = contactSchema.parse(req.body);

    await saveContact(validatedData);

    return ApiResponse.success(
        res,
        "Contact submitted successfully."
    );

});