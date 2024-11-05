import {
  getDownloadURL,
  uploadBytes,
  ref,
  list,
  deleteObject,
} from "firebase/storage";
import { storageRef } from "../../../../libs/firebase-cloud-storage";
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
    const imagesRef = ref(storageRef);

    return new Promise((resolve, reject) => {
      getDownloadURL(ref(imagesRef, input.imagePath))
        .then((url) => resolve({ url }))
        .catch((error) => reject(error));
    });
  }

  /**
   * Imports an image into Firebase storage
   * @see {@link https://firebase.google.com/docs/storage/web/upload-files?hl=pt-br }
   */
  public import(input: ImportFileInput) {
    const imagesRef = ref(storageRef, `${input.category}/${input.refId}/${input.fileName}`);

    // return uploadBytesResumable
    return uploadBytes(imagesRef, input.data, input.metadata)
      .then((snapshot) => {
        console.log(
          "Uploaded a blob or file!",
          JSON.stringify({ metadata: snapshot.metadata }),

        );
        return snapshot.metadata
      })
      .catch((err) => {
        console.log(err);
      });
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
