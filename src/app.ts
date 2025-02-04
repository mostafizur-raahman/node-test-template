import express from "express";
// import authModule from "./modules/auth/auth.module";
import userModule from "./modules/user/user.module";

const app = express();

app.use(express.json());

// Register modules
app.use("/api", userModule);
// app.use("/api", authModule);

export default app;
