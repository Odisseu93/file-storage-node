import express from "express";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";
import { uploadFileController } from "../controllers/file/upload-file-controller";
import { getFileController } from "../controllers/file/get-file-controller";
import { getFilesByReferenceIdController } from "../controllers/file/get-files-by-reference-id-controller";
import { deleteFileController } from "../controllers/file/delete-file-controller";

const router = express.Router();

router.get("/get/by-reference/:refId", getFilesByReferenceIdController)
router.get("/get/:fileId", getFileController)
router.post('/upload/:category/:refId', uploadFileMiddleware, uploadFileController);
router.delete("/delete/:fileId", deleteFileController)

export default router