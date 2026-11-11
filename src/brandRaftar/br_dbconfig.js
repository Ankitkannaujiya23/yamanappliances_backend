import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();


const brandraftarDB = mysql.createPool({
    host: process.env.BR_DB_HOST,
    port: process.env.BR_DB_PORT,
    user: process.env.BR_DB_USER,
    password: process.env.BR_DB_PASSWORD,
    database: process.env.BR_DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default brandraftarDB;

