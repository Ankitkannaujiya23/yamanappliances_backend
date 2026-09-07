import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './middleware/error.middleware.js';
import contactRoutes from "./modules/contact/contact.routes.js";
import newsRoutes from './modules/newsLetter/news.routes.js'

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsRoutes)

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})