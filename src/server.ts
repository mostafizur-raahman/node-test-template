import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./config/data-source"; // Ensure correct path
import { envConfig } from "./constant/env.constant";

const PORT = envConfig.SERVER_PORT;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => console.error("Database connection error:", error));
