import db from "../../config/db.js";

export const consumerServicesModel = {
    getAllServices: async () => {
        const query = `SELECT * FROM services`;
        const result = await db.execute(query);
        return result[0];
    },
    getServiceType: async (serviceId) => {
        const query = `SELECT * FROM service_types WHERE service_id = ?`;
        const result = await db.execute(query, [serviceId]);
        return result[0];
    },
    getCommonIssues: async (serviceId) => {
        const query = `SELECT * FROM common_issues WHERE service_id = ?`;
        const result = await db.execute(query, [serviceId]);
        return result[0];
    }
}; 