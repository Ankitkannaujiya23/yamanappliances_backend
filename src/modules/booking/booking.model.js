import db from "../../config/db.js";
const bookingModel = {
    createBooking: async (data) => {
        const query = `insert into bookings(booking_id,customer_name,email,mobileno,address,service_id,service_type_id,issue_id,preferred_date,preferred_time) values(?,?,?,?,?,?,?,?,?,?)`;
        const values = [data.bookingId, data.customer_name, data.email, data.mobile, data.address, data.service_id, data.service_type_id, data.issue_id, data.preferred_date, data.preferred_time];
        const result = await db.query(query, values);
        return result;
    },
    getServiceById: async (serviceId) => {
        const [rows] = await db.execute(`SELECT * FROM services WHERE id = ?`, [serviceId]);
        return rows[0] || null;
    },
    getServiceTypeById: async (serviceTypeId) => {
        const [rows] = await db.execute(`SELECT * FROM service_types WHERE id = ?`, [serviceTypeId]);
        return rows[0] || null;
    },
    getIssueById: async (issueId) => {
        const [rows] = await db.execute(`SELECT * FROM common_issues WHERE id = ?`, [issueId]);
        return rows[0] || null;
    },
};

export default bookingModel;