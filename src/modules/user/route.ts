import express from "express";
import { AppDataSource } from "../../config/data-source";
import { UserController } from "./controller";
import { UserRepository } from "./repository";
import { UserService } from "./service";

const router = express.Router();

// Ensure that the DataSource is initialized before using repositories
AppDataSource.initialize()
    .then(() => {
        const userRepository = new UserRepository(AppDataSource); // Pass DataSource
        const userService = new UserService(userRepository);
        const userController = new UserController(userService);

        router.post("/users", (req, res) =>
            userController.createUser(req, res)
        );
        router.get("/users/:email", (req, res) =>
            userController.getUserByEmail(req, res)
        );

        console.log("User routes initialized");
    })
    .catch((error: any) => console.error("Error initializing routes:", error));

export default router;
