import stream from "node:stream"

import {
  getDownloadURL,
  ref,
  list,
  deleteObject,
} from "firebase/storage";
import { bucket, } from "../../../../libs/firebase";
import type { FileInterface } from "../../../../interfaces/file/file-interface";

type GetImageInput = {
  imagePath: string;
};

type GetImageOutPut = { url: string }
// | { error: Error };

type ImportFileInput = {
  category: string
  refId: string
  fileName: string
} & FileInterface


type GetFileByRefIdInput = {
  ref: string;
};

type DeleteFileInput = {
  imagePath: string;
};

export class FirebaseStorageRepository {
  /**
   * Retrieves the URL of an image from Firebase storage
   * @see {@link https://firebase.google.com/docs/storage/web/upload-files?hl=pt-br}
   */
  public get(input: GetImageInput): Promise<GetImageOutPut> {
    const file = bucket.file(input.imagePath);

    return new Promise((resolve, reject) => {
      // Generates a signed download URL (valid for a specific period)
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1); // Adds 1 day

      file.getSignedUrl({
        action: 'read', // Allows reading of the file
        expires: expirationDate
      })
        .then((urls: string[]) => {
          const url = urls[0];
          console.log({ url })
          resolve({ url });
        })
        .catch((error: unknown) => {
          console.error("Failed to get download URL:", error);
          reject(error);
        })
    })
  }

  /**
   * Imports an image into Firebase storage
   * @see {@link https://firebase.google.com/docs/storage/web/upload-files?hl=pt-br }
   */
  public async import(input: ImportFileInput) {
    const destFileName = `${input.category}/${input.refId}/${input.fileName}`;

    const file = bucket.file(destFileName)

    async function blobToBuffer(blob: Blob) {
      return await blob.arrayBuffer().then(buffer => Buffer.from(buffer));
    }

    const dataBuffer = input.data instanceof Buffer ? input.data : await blobToBuffer(input.data as Blob);

    // Create a pass through stream from a string
    const passthroughStream = new stream.PassThrough();
    passthroughStream.end(dataBuffer);


    const execute = (): Promise<{ name: string, timeCreated: string }> => {
      return new Promise((resolve, reject) => {
        passthroughStream.pipe(file.createWriteStream({ ...input.metadata })).on('finish', async () => {
          console.log(`${destFileName} uploaded to ${bucket.name}`);

          try {
            const [metadata] = await file.getMetadata();
            resolve({ name: metadata.name as string, timeCreated: metadata.timeCreated as string })
          } catch (error) {
            reject(error);
          }
        }).on("error", (error) => {
          console.error(`An error occurred during the file upload: ${error}`);
          reject(error);
        })
      })
    }

    return execute()
  }

  public getRefId(input: GetFileByRefIdInput) {
    const listRef = ref(storageRef, input.ref);
    return list(listRef, { maxResults: 100 })
      .then((list) => {
        const hasItems = !!list?.items;

        if (!hasItems) return { files: [] };

        return {
          files: list.items.map(async (item) => ({
            url: await getDownloadURL(ref(storageRef, item.fullPath))
          })),
        };
      })
      .catch((error) => {
        return { error };
      });
  }

  public delete(input: DeleteFileInput): Promise<{ message: string }> {
    const imagesRef = ref(storageRef);

    return new Promise((resolve, reject) => {
      deleteObject(ref(imagesRef, input.imagePath))
        .then(() => resolve({
          message: `
          The file ${input.imagePath.split("/").pop()} was deleted successfully!
          ` }))
        .catch((error) => reject(error));
    });
  }
}
