import type { FileEntity } from "../../entities/FileEntity"

export type DeleteFileServiceInputType = {
  fileId: string
}

export type DeleteFileServiceOutputType = { statusCode: number, data: FileEntity } | { statusCode: number, error: unknown }

export interface DeleteFileServiceInterface {
  execute(input: DeleteFileServiceInputType): Promise<DeleteFileServiceOutputType>
}