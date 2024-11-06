import express from "express";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";
import { uploadImageController } from "../controllers/image/uploadImageController";

const router = express.Router();


router.post('/upload/:category/:refId', uploadFileMiddleware, uploadImageController);

export default router