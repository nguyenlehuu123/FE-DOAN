import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "@firebase/storage";

interface UseFirebase {
  handleUploadFile: (file: File) => Promise<string | null>;
  handleDeleteFile: (file: string) => void;
}

const UseFirebase: UseFirebase = {
  handleUploadFile: (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          reject(error)
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          });
        }
      );
    })
  },
  handleDeleteFile: async (downloadUrl: string) => {
    const storage = getStorage();
    const imageRef = ref(storage, downloadUrl);

    try {
      await deleteObject(imageRef);
    } catch (error) {
      // TODO: Handle error
    }
  }
}

export {
  UseFirebase
}
