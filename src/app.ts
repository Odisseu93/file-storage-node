import express from "express";
import fileRoutes from "./routes/fileRoutes";
import imageRoutes from "./routes/fileRoutes";

const app = express();

app.use("/file", fileRoutes)
app.use("/image", imageRoutes)

export { app };
