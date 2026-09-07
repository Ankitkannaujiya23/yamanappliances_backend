import { generateBookingId } from "../../utils/helper.js";
import bookingModel from "./booking.model.js";

const bookingService = {
    createBooking: async (data) => {
        const bookingId = generateBookingId();
        data.bookingId = bookingId;
        const result = await bookingModel.createBooking(data);
        return result;
    }
};

export default bookingService;