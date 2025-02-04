import express from "express";
import userRoutes from "./route";

const userModule = express.Router();

userModule.use("/user", userRoutes);

export default userModule;
