import db from "../../config/db.js";
const bookingModel = {
    createBooking: async (data) => {
        const query = `insert into bookings(booking_id,customer_name,email,mobileno,address,service_id,service_type_id,issue_id,preferred_date,preferred_time) values(?,?,?,?,?,?,?,?,?,?)`;
        const values = [data.bookingId, data.name, data.email, data.phone, data.address, data.service_id, data.service_type_id, data.issue_id, data.date, data.time];
        const result = await db.query(query, values);
        return result;
    }
};

export default bookingModel;