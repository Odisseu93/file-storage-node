import type { FileEntity } from "../../entities/FileEntity";
import type { FileInterface } from "../../file/file-interface";

export type ImportImageServiceInput = Omit<FileEntity, "id" | "createdAt"> & Omit<FileInterface, "metadata"> & { size: number }
export type ImportImageServiceOutput = { statusCode: number, data: FileEntity } | { statusCode: number, error: unknown }

export interface ImportImageServiceInterface {
  execute(input: ImportImageServiceInput): Promise<ImportImageServiceOutput>
}