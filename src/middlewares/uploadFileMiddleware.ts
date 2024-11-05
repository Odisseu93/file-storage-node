import type { Request, Response, NextFunction } from "express";
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage }).single("file")

export const uploadFileMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      // 413: 'Payload Too Large', 400: 'Bad Request'
      const error413: Array<typeof error.code> = ["LIMIT_PART_COUNT", "LIMIT_FILE_SIZE", "LIMIT_FILE_COUNT"]
      const statusCode = error413.includes(error.code) ? 413 : 400

      return res.status(statusCode).json({
        error: {
          code: error.code,
          message: error.message,
        }
      })
    } else if (error) {
      // An unknown error occurred when uploading.
      return res.status(500).json({ error: "Failed to upload file" });
    }
    // Everything went fine.
    next()
  })
}