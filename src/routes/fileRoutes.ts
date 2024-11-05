import express from "express";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";
import { uploadFileController } from "../controllers/uploadFileController";
import { getFileController } from "../controllers/getFileController";
import { getFilesByReferenceIdController } from "../controllers/getFilesByReferenceIdController";
import { deleteFileController } from "../controllers/deleteFileController";

const router = express.Router();

router.get("/get/by-reference/:refId", getFilesByReferenceIdController)
router.get("/get/:fileId", getFileController)
router.post('/upload/:category/:refId', uploadFileMiddleware, uploadFileController);
router.delete("/delete/:fileId", deleteFileController)

export default router