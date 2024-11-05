import type { Request, Response } from "express-serve-static-core";
import { GetFileByReferenceIdService } from "../services/get-file-by-reference-id-service";

export const getFilesByReferenceIdController = (req: Request, res: Response) => {
  const service = new GetFileByReferenceIdService
  service.execute({ refId: req.params.refId })
    .then(response => {
      if ("error" in response) {
        return res.status(response.statusCode).json(response.error)
      }
      return res.status(response.statusCode).json(response.data)
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ error: 'Internal Server Error' })
    })
} 