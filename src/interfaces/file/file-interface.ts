import type { UploadMetadata } from "firebase/storage";

export interface FileInterface {
  data: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata
} 