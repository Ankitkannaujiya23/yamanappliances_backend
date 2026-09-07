import ApiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { saveNewsLetter } from "./news.service.js";
import { newsLetterValidationSchema } from "./news.validation.js";

export const createNewsLetter = asyncHandler(async (req, res) => {
    const validatedData = await newsLetterValidationSchema.parse(req.body);

    await saveNewsLetter(validatedData);
    return ApiResponse.success(res,
        "Email added successfully!"
    )
})