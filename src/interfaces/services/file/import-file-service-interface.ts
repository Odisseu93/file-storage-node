import type { FileEntity } from "../../entities/FileEntity";
import type { FileInterface } from "../../file/file-interface";

export type ImportFileServiceInput = Omit<FileEntity, "id" | "createdAt"> & Omit<FileInterface, "metadata">
export type ImportFileServiceOutput = { statusCode: number, data: FileEntity } | { statusCode: number, error: unknown }

export interface ImportFileServiceInterface {
  execute(input: ImportFileServiceInput): Promise<ImportFileServiceOutput>
}