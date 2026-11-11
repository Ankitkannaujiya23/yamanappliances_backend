import brandraftarDB from "./br_dbconfig";


export const brController = {
    createEnquiry: async (req, res) => {
        try {
            const { name, email, phone, business, service, preferred_time, goal } = req.body;

            // Validate the input data
            if (!name || !email || !phone) {
                return res.status(400).json({ error: 'Name, email, and phone are required.' });
            }

            const result = await brandraftarDB.execute(
                `insert into enquiries (name,email,phone,business,service,preferred_time,goal) values(?,?,?,?,?,?,?)`,
                [name, email, phone, business || null, service || null, preferred_time || null, goal || null]
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