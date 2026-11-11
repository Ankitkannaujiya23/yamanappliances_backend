import brandraftarDB from "./br_dbconfig.js";

const brController = {
    createEnquiry: async (req, res) => {
        try {
            const { name, email, phone, business_name, service, preferred_call_time, goal } = req.body;

            // Validate the input data
            if (!name || !email || !phone) {
                return res.status(400).json({ error: 'Name, email, and phone are required.' });
            }

            const result = await brandraftarDB.execute(
                `insert into enquiries (name,email,phone,business_name,service,preferred_time,business_goal) values(?,?,?,?,?,?,?)`,
                [name, email, phone, business_name || null, service || null, preferred_call_time || null, goal || null]
            );

            if (result.affectedRows > 0) {
                return res.status(201).json({ message: 'Enquiry created successfully.', enquiryId: result.insertId });
            }


        }
        catch (error) {
            console.error('Error creating enquiry:', error);
            return res.status(500).json({ error: 'An error occurred while creating the enquiry.' });
        }
    }
}

export default brController;