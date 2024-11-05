import type { FileEntity } from "../../../interfaces/entities/FileEntity";
import { prismaClient } from "../../../libs/prisma";

type FileDatabaseImportInputType = FileEntity
type FileDatabaseGetInputType = { fileId: string }
type FileDatabaseDeleteInputType = { fileId: string }
type FileDatabaseGetByRefIdInputType = { refId: string }

export class FileDataBaseRepository {
  public async import(input: FileDatabaseImportInputType) {

    const createFile = await prismaClient.files.create({
      data: {
        id: input.id,
        fileName: input.fileName,
        originalFileName: input.originalFileName,
        category: input.category,
        createdAt: input.createdAt,
        refId: input.refId,
        mimeType: input.mimeType
      }
    })

    return createFile;
  }
  public async get(input: FileDatabaseGetInputType) {
    const fileFound = await prismaClient.files.findUnique({ where: { id: input.fileId } })
    return fileFound;
  }

  public async getByRefenceId(input: FileDatabaseGetByRefIdInputType) {
    const filesFound = await prismaClient.files.findMany({ where: { refId: input.refId } })
    return filesFound;
  }

  public async Delete(input: FileDatabaseDeleteInputType) {
    const deleteFile = await prismaClient.files.findUnique({ where: { id: input.fileId } })
    await prismaClient.files.delete({ where: { id: deleteFile?.id } })
    return deleteFile;
  }
}