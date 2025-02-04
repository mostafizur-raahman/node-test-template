import { Client } from "pg"; // Only needed for PostgreSQL
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../modules/user/entities/User";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Function to create the database if it doesn't exist (PostgreSQL only)
const createDatabaseIfNotExists = async () => {
    const client = new Client({
        host: DB_HOST,
        port: Number(DB_PORT) || 5432,
        user: DB_USER,
        password: DB_PASSWORD,
        database: "postgres", // Connect to default DB first
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
    username: DB_USER,
    password: String(DB_PASSWORD || "root"),
    database: DB_NAME,
    entities: [User],
    synchronize: true, // Creates tables automatically, use migrations in production
    logging: false,
});

createDatabaseIfNotExists().then(() => {
    AppDataSource.initialize()
        .then(() => console.log("Database connected successfully"))
        .catch((error) => console.error("Database connection failed:", error));
});
