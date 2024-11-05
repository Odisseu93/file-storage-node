import type { GetFileByIdServiceInterface, GetFileByIdSeviceInputType, GetFileByIdSeviceOutputType } from "../interfaces/services/files/get-file-service-interface";
import { FirebaseStorageRepository } from "../repositories/files/cloud/firebase-storage/firebase-storage-repository";
import { FileDataBaseRepository } from "../repositories/files/database/file-database-repository";

export class GetFileByIdService implements GetFileByIdServiceInterface {
  async execute(input: GetFileByIdSeviceInputType): Promise<GetFileByIdSeviceOutputType> {
    // const databaserepository 
    const cloudRepository = new FirebaseStorageRepository()
    const databaseRepository = new FileDataBaseRepository()
    const fileFound = await databaseRepository.get({ fileId: input.fileId })

    if (!fileFound) return {
      statusCode: 404,
      error: 'File not found'
    }


    try {
      const url = await cloudRepository.get({ imagePath: `${fileFound.category}/${fileFound.refId}/${fileFound.fileName}` })
      return {
        statusCode: 200,
        data: url
      }
    } catch (error: unknown) {
      return {
        statusCode: 500,
        error: error
      }
    }
  }
}