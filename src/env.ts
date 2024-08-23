import dotenv from "dotenv";

dotenv.config();

const envServer = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT,
    JWT_SECRET_ACCESS_TOKEN: process.env.JWT_SECRET_ACCESS_TOKEN,
    JWT_SECRET_REFRESH_TOKEN: process.env.JWT_SECRET_REFRESH_TOKEN,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
};
export default envServer;
