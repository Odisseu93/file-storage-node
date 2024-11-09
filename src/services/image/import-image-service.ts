import type { ImportImageServiceInput, ImportImageServiceInterface, ImportImageServiceOutput } from "../../interfaces/services/image/import-image-service-interface";
import { FirebaseStorageRepository } from "../../repositories/files/cloud/firebase-storage/firebase-storage-repository";
import { FileDataBaseRepository } from "../../repositories/files/database/file-database-repository";
import { generateHash } from "../../utils/generateHash";



export class ImportImageService implements ImportImageServiceInterface {
  public async execute(input: ImportImageServiceInput): Promise<ImportImageServiceOutput> {
    const databaseFileRepo = new FileDataBaseRepository()
    const cloudRepo = new FirebaseStorageRepository()


    const FILE_SIZE_LIMIT = 250 // 250KB
    const fileZizeInKB = input.size / 1024  // convert value in KB to MB

    if (fileZizeInKB > Number(FILE_SIZE_LIMIT)) {
      return {
        statusCode: 413,
        error: `The file size exceeds the ${FILE_SIZE_LIMIT}KB limit. Please upload a smaller file.`
      }
    }

    const ALLOWED_EXTENSIONS = ["jpg", "png", "webp", "jpeg", "svg"]
    const fileExtension = input.originalFileName.split(".").pop()?.toLowerCase()

    if (!fileExtension || !ALLOWED_EXTENSIONS.includes(fileExtension)) {
      return {
        statusCode: 400,
        error: `Invalid file extension. Only the following formats are allowed: ${ALLOWED_EXTENSIONS.join(', ')}.`
      }
    }

    const savedFileCloud = await cloudRepo.import({
      fileName: input.fileName,
      category: input.category,
      refId: input.refId,
      data: input.data,
      metadata: {
        contentType: input.mimeType,
      }
    })

    if (!savedFileCloud) return {
      statusCode: 503,
      error: "Failed to import file to cloud storage"
    }

    try {
      const savedFileDatabase = await databaseFileRepo.import({
        id: `${input.mimeType.split('/')[0]}-${generateHash()}`,
        category: input.category,
        fileName: input.fileName,
        mimeType: input.mimeType,
        createdAt: new Date(savedFileCloud.timeCreated),
        originalFileName: input.originalFileName, 
        refId: input.refId
      })

      return {
        statusCode: 200,
        data: savedFileDatabase
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          statusCode: 500,
          error: error?.message

        }
      }
      return {
        statusCode: 500,
        error: "Failed to save file to database"
      }
    }

  }
}
