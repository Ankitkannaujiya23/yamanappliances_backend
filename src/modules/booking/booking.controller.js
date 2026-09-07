import ApiResponse from "../../utils/apiResponse.js";
import bookingService from "./booking.service.js";
import { bookingValdidationSchema } from "./booking.validation.js";

export const createBooking = asyncHandler(async (req, res) => {
    const validateData = await bookingValdidationSchema.parse(req.body);

    await bookingService.createBooking(validateData);

    return ApiResponse.success(
        res,
        "Booking submitted successfully."
    );
});