import type { ImportFileServiceInput, ImportFileServiceInterface, ImportFileServiceOutput } from "../interfaces/services/files/import-file-service-interface";
import { FirebaseStorageRepository } from "../repositories/files/cloud/firebase-storage/firebase-storage-repository";
import { FileDataBaseRepository } from "../repositories/files/database/file-database-repository";
import { generateHash } from "../utils/generateHash";



export class ImportFileService implements ImportFileServiceInterface {
  public async execute(input: ImportFileServiceInput): Promise<ImportFileServiceOutput> {
    const databaseFileRepo = new FileDataBaseRepository()
    const cloudRepo = new FirebaseStorageRepository()

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
        originalFileName: savedFileCloud.name,
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