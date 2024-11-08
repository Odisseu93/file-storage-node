import express from "express";
import fileRoutes from "./routes/fileRoutes";
import imageRoutes from "./routes/imageRoutes";

const app = express();

app.use("/file", fileRoutes)
app.use("/image", imageRoutes)

export { app };
