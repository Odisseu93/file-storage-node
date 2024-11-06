import type { DeleteFileServiceInputType, DeleteFileServiceInterface, DeleteFileServiceOutputType } from "../../interfaces/services/file/delete-file-sevice-interface";
import { FirebaseStorageRepository } from "../../repositories/files/cloud/firebase-storage/firebase-storage-repository";
import { FileDataBaseRepository } from "../../repositories/files/database/file-database-repository";

export class DeleteFileService implements DeleteFileServiceInterface {
  public async execute(input: DeleteFileServiceInputType): Promise<DeleteFileServiceOutputType> {
    const cloudStorageRepo = new FirebaseStorageRepository()
    const dataBaseFileRepository = new FileDataBaseRepository()

    const file = await dataBaseFileRepository.get({ fileId: input?.fileId })

    if (!file) return {
      statusCode: 404,
      error: 'File not found'
    }

    return cloudStorageRepo.delete({ imagePath: `${file.category}/${file.refId}/${file.fileName}` })
      .then(async () => {
        await dataBaseFileRepository.Delete({ fileId: file.id })
        return {
          statusCode: 200,
          data: file
        }
      })
      .catch(error => {
        console.log(error)
        return {
          statusCode: 500,
          error: {
            message: "Error deleting file"
          }
        }
      })
  }

}