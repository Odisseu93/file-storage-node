import type { Request, Response } from "express";
import { GetFileByIdService } from "../services/get-file-by-id-service";

export const getFileController = (req: Request, res: Response,) => {
  const service = new GetFileByIdService()
  service.execute({ fileId: req.params.fileId })
    .then(response => {
      if ("error" in response) {
        return res.status(response.statusCode).json(response.error)
      }
      return res.status(response.statusCode).redirect(response.data.url)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' })
    });
} 