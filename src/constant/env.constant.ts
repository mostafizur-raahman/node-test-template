import * as dotenv from "dotenv";
import * as process from "node:process";

// Load environment variables from the .env file
dotenv.config();

// Export the environment variables
export const envConfig = {
    SERVER_PORT: process.env.SERVER_PORT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
};
