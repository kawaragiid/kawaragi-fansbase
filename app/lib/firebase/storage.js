// app/lib/firebase/storage.js
// Ini adalah file helper untuk interaksi dengan Firebase Cloud Storage

import { storage } from "./firebase"; // Import objek storage dari inisialisasi Firebase
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

/**
 * Mengunggah file ke Firebase Storage dan mengembalikan URL unduhan.
 * @param {File} file Objek File yang akan diunggah.
 * @param {string} path Jalur di Storage tempat file akan disimpan (misal: 'news-images/filename.jpg').
 * @param {function(number): void} [onProgress] Callback opsional untuk melacak progres upload (0-100).
 * @returns {Promise<string>} URL unduhan file yang diunggah.
 */
export async function uploadFile(file, path, onProgress = () => {}) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Hitung progres upload
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress); // Panggil callback progres
        // console.log('Upload is ' + progress + '% done'); // Untuk debugging
      },
      (error) => {
        // Handle error upload
        console.error("Error during upload:", error);
        reject(error);
      },
      () => {
        // Upload berhasil, dapatkan URL unduhan
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            // console.log('File available at', downloadURL); // Untuk debugging
            resolve(downloadURL); // Mengembalikan URL unduhan file
          })
          .catch(reject);
      }
    );
  });
}

/**
 * Menghapus file dari Firebase Storage berdasarkan URL-nya.
 * @param {string} url URL unduhan file yang akan dihapus.
 * @returns {Promise<void>} Promise yang akan diselesaikan jika penghapusan berhasil.
 */
export async function deleteFile(url) {
  try {
    // Firebase Storage butuh referensi dari URL
    const fileRef = ref(storage, url);
    await deleteObject(fileRef);
    console.log("File deleted successfully:", url);
  } catch (error) {
    // Tangani error (misal: file tidak ditemukan)
    console.error("Error deleting file:", error);
    throw error; // Lemparkan error agar bisa ditangani di komponen pemanggil
  }
}
