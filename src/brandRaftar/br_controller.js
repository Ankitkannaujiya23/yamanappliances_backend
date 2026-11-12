import brandraftarDB from "./br_dbconfig.js";
import { sendAdminEnquiryMail, sendUserEnquiryMail } from "./br_mailer.js";

const brController = {
    createEnquiry: async (req, res) => {
        try {
            const { name, email, phone, business_name, service, preferred_call_time, goal } = req.body;

            // Validate the input data
            if (!name || !email || !phone) {
                return res.status(400).json({ error: 'Name, email, and phone are required.' });
            }

            const [result] = await brandraftarDB.execute(
                `insert into enquiries (name,email,phone,business_name,service,preferred_call_time,business_goal) values(?,?,?,?,?,?,?)`,
                [name, email, phone, business_name || null, service || null, preferred_call_time || null, goal || null]
            );

            if (result.affectedRows === 0) {
                return res.status(500).json({ error: 'Failed to create enquiry.' });
            }

            // Send confirmation email

            // Emails are best-effort: booking must succeed even if SMTP fails.
            const emilPayload = { name, email, phone, business_name, service, preferred_call_time, goal, bookingId: result.insertId, };
            const [adminResult, userResult] = await Promise.allSettled([
                sendAdminEnquiryMail(emilPayload),
                sendUserEnquiryMail(emilPayload),
            ]);

            if (adminResult?.status === "rejected") {
                console.error("Failed to send admin enquiry email:", adminResult.reason);
            }
            if (userResult?.status === "rejected") {
                console.error("Failed to send user enquiry email:", userResult.reason);
            }


            return res.status(201).json({ success: true, message: 'Enquiry created successfully.' });

        }
        catch (error) {
            console.error('Error creating enquiry:', error);
            return res.status(500).json({ error: 'An error occurred while creating the enquiry.' });
        }
    }
}

export default brController;