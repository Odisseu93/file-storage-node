import express from "express";
import fileRoutes from "./routes/fileRoutes";

const app = express();

app.use("/file", fileRoutes)

export { app };
