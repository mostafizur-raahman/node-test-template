import { Client } from "pg";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { envConfig } from "../constant/env.constant";
import { User } from "../modules/user/entities/User";

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = envConfig;

const createDatabaseIfNotExists = async () => {
    const client = new Client({
        host: DB_HOST,
        port: Number(DB_PORT) || 5432,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        database: "postgres",
    });

    try {
        await client.connect();
        const result = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'`
        );
        if (result.rowCount === 0) {
            await client.query(`CREATE DATABASE "${DB_NAME}"`);
            console.log(`Database "${DB_NAME}" created successfully.`);
        }
    } catch (error) {
        console.error("Error creating database:", error);
    } finally {
        await client.end();
    }
};

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT) || 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [User],
    synchronize: false, // ⚠️ Use migrations instead
    logging: false,
});

const initializeDatabase = async () => {
    await createDatabaseIfNotExists();

    if (!AppDataSource.isInitialized) {
        AppDataSource.initialize()
            .then(() => console.log("Database connected successfully"))
            .catch((error) =>
                console.error("Database connection failed:", error)
            );
    } else {
        console.log(
            "Database connection already exists, skipping initialization."
        );
    }
};

initializeDatabase();
