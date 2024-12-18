import { generateHash } from "../../utils/generateHash";
import { ImportFileService } from "../../services/file/import-file-service";
import type { Request, Response } from "express";


export const uploadFileController = (req: Request, res: Response) => {
  const file = req.file

  if (!file) {
    res.status(404).json({ error: "File not found" })
    return
  }

  const uniquePrefix = generateHash().split('').splice(0, 16).join('');
  const filename = `${uniquePrefix}-${file.originalname}`

  const service = new ImportFileService()
  const buffer = file.buffer;

  // Convertt Buffer to Blob
  const blob = new Blob([buffer], { type: 'application/octet-stream' }); //
  console.log(blob)

  service.execute({
    fileName: filename,
    category: req.params.category,
    mimeType: file.mimetype,
    originalFileName: file.originalname,
    refId: req.params.refId,
    data: blob,
  })
    .then(savedFile => {
      if ("error" in savedFile) {
        return res.status(savedFile.statusCode).json(savedFile.error)
      }

      res.header(["Content-Type", req.file?.mimetype]);
      return res.status(savedFile.statusCode).json(savedFile.data)
    })
    .catch(error => {
      console.error(error)
      return res.status(500).json({ error: 'Internal Server Error' })
    })
}