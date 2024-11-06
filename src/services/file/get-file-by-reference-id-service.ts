import type { GetFileByRefIdServiceInterface, GetFileByRefIdSeviceInputType, GetFileByRefIdSeviceOutputType } from "../../interfaces/services/file/get-file-by-reference-id-service-interface";
import { FileDataBaseRepository } from "../../repositories/files/database/file-database-repository";

export class GetFileByReferenceIdService implements GetFileByRefIdServiceInterface {
  async execute(input: GetFileByRefIdSeviceInputType): Promise<GetFileByRefIdSeviceOutputType> {
    const databaseRepository = new FileDataBaseRepository()
    const filesFound = await databaseRepository.getByRefenceId({ refId: input.refId })

    if (!filesFound?.[0]) return {
      statusCode: 404,
      error: 'Files not found'
    }

    return {
      statusCode: 200,
      data: filesFound.map(file => ({
        fileId: file.id,
        fileName: file.fileName,
        mimeType: file.mimeType,
        url: `${process.env.API_URL}/file/get/${file.id}`
      }))
    }
  }
}