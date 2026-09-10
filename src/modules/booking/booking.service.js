import { generateBookingId } from "../../utils/helper.js";
import { sendAdminBookingMail, sendUserBookingMail } from "./booking.mailer.js";
import bookingModel from "./booking.model.js";

const bookingService = {
    createBooking: async (data) => {
        const bookingId = generateBookingId();
        data.bookingId = bookingId;
        const result = await bookingModel.createBooking(data);

        // Fetch readable service/service-type/issue details for the emails.
        // Done after insert so a lookup failure never blocks the booking itself.
        const [serviceRow, serviceTypeRow, issueRow] = await Promise.all([
            bookingModel.getServiceById(data.service_id).catch(() => null),
            bookingModel.getServiceTypeById(data.service_type_id).catch(() => null),
            bookingModel.getIssueById(data.issue_id).catch(() => null),
        ]);

        const emailPayload = { ...data, serviceRow, serviceTypeRow, issueRow };

        // Emails are best-effort: booking must succeed even if SMTP fails.
        const [adminResult, userResult] = await Promise.allSettled([
            sendAdminBookingMail(emailPayload),
            sendUserBookingMail(emailPayload),
        ]);

        if (adminResult.status === "rejected") {
            console.error("Failed to send admin booking email:", adminResult.reason);
        }
        if (userResult.status === "rejected") {
            console.error("Failed to send user booking email:", userResult.reason);
        }


        return result;
    }
};

export default bookingService;