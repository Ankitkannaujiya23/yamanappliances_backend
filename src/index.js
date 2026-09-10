import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './middleware/error.middleware.js';
import contactRoutes from "./modules/contact/contact.routes.js";
import newsRoutes from './modules/newsLetter/news.routes.js'
import bookingRoutes from './modules/booking/booking.routes.js'
import consumerServicesRoutes from './modules/consumerServices/consumerServices.routes.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/consumerservices", consumerServicesRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})