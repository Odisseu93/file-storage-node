import type { Request, Response } from "express";
import { DeleteFileService } from "../../services/file/delete-file-service";

export const deleteFileController = (req: Request, res: Response,) => {
  const service = new DeleteFileService()
  service.execute({ fileId: req.params.fileId })
    .then(response => {
      if ("error" in response) {
        return res.status(response.statusCode).json(response.error)
      }
      return res.status(response.statusCode).json(response.data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' })
    });
} 