// app/lib/firebase/firestore.js
// Ini adalah file helper untuk interaksi dengan Firebase Firestore Database

import { db } from "./firebase"; // Import objek db dari inisialisasi Firebase
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc, // Digunakan untuk referensi dokumen spesifik
  query,
  where,
  orderBy,
  limit,
  setDoc, // Digunakan untuk membuat dokumen dengan ID spesifik (misal, user profile)
} from "firebase/firestore";

// --- Fungsi untuk News (Berita) ---

/**
 * Mengambil daftar artikel berita dari Firestore.
 * @param {number} [limitCount=10] Jumlah artikel yang akan diambil.
 * @param {string} [category=null] Filter berdasarkan kategori.
 * @returns {Promise<Array<Object>>} Array berisi objek artikel berita.
 */
export async function getNewsArticles(limitCount = 10, category = null) {
  try {
    let q = collection(db, "news");
    if (category) {
      q = query(q, where("category", "array-contains", category));
    }
    q = query(q, orderBy("date", "desc"), limit(limitCount)); // Urutkan berdasarkan tanggal terbaru

    const querySnapshot = await getDocs(q);
    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id, // ID dokumen Firestore
      ...doc.data(),
    }));
    return articles;
  } catch (error) {
    console.error("Error getting news articles:", error);
    return [];
  }
}

/**
 * Mengambil satu artikel berita berdasarkan slug-nya.
 * @param {string} slug Slug artikel.
 * @returns {Promise<Object|null>} Objek artikel atau null jika tidak ditemukan.
 */
export async function getArticleBySlug(slug) {
  try {
    const q = query(collection(db, "news"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error getting article by slug ${slug}:`, error);
    return null;
  }
}

/**
 * Mengambil satu artikel berita berdasarkan ID dokumen Firestore-nya.
 * Digunakan terutama di admin panel untuk editing.
 * @param {string} id ID dokumen Firestore.
 * @returns {Promise<Object|null>} Objek artikel atau null jika tidak ditemukan.
 */
export async function getArticleById(id) {
  try {
    const docRef = doc(db, "news", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error getting article by ID ${id}:`, error);
    return null;
  }
}

/**
 * Menambah artikel berita baru ke Firestore.
 * @param {Object} data Data artikel.
 * @returns {Promise<string>} ID dokumen yang baru dibuat.
 */
export async function addNewsArticle(data) {
  try {
    const docRef = await addDoc(collection(db, "news"), data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding news article:", error);
    throw error;
  }
}

/**
 * Memperbarui artikel berita yang sudah ada di Firestore.
 * @param {string} id ID dokumen artikel yang akan diperbarui.
 * @param {Object} data Data yang akan diperbarui.
 * @returns {Promise<void>}
 */
export async function updateNewsArticle(id, data) {
  try {
    const docRef = doc(db, "news", id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error(`Error updating news article ${id}:`, error);
    throw error;
  }
}

/**
 * Menghapus artikel berita dari Firestore.
 * @param {string} id ID dokumen artikel yang akan dihapus.
 * @returns {Promise<void>}
 */
export async function deleteNewsArticle(id) {
  try {
    const docRef = doc(db, "news", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting news article ${id}:`, error);
    throw error;
  }
}

// --- Fungsi untuk Gallery (Galeri) ---

/**
 * Mengambil daftar gambar galeri dari Firestore.
 * @param {number} [limitCount=20] Jumlah gambar yang akan diambil.
 * @returns {Promise<Array<Object>>} Array berisi objek gambar galeri.
 */
export async function getGalleryImages(limitCount = 20) {
  try {
    const q = query(collection(db, "gallery"), orderBy("uploadedAt", "desc"), limit(limitCount));
    const querySnapshot = await getDocs(q);
    const images = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return images;
  } catch (error) {
    console.error("Error getting gallery images:", error);
    return [];
  }
}

/**
 * Mengambil satu gambar galeri berdasarkan ID dokumen Firestore-nya.
 * Digunakan terutama di admin panel untuk editing.
 * @param {string} id ID dokumen Firestore.
 * @returns {Promise<Object|null>} Objek gambar atau null jika tidak ditemukan.
 */
export async function getGalleryImageById(id) {
  try {
    const docRef = doc(db, "gallery", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error getting gallery image by ID ${id}:`, error);
    return null;
  }
}

/**
 * Menambah gambar galeri baru ke Firestore.
 * @param {Object} data Data gambar.
 * @returns {Promise<string>} ID dokumen yang baru dibuat.
 */
export async function addGalleryImage(data) {
  try {
    const docRef = await addDoc(collection(db, "gallery"), data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding gallery image:", error);
    throw error;
  }
}

/**
 * Memperbarui gambar galeri yang sudah ada di Firestore.
 * @param {string} id ID dokumen gambar yang akan diperbarui.
 * @param {Object} data Data yang akan diperbarui.
 * @returns {Promise<void>}
 */
export async function updateGalleryImage(id, data) {
  try {
    const docRef = doc(db, "gallery", id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error(`Error updating gallery image ${id}:`, error);
    throw error;
  }
}

/**
 * Menghapus gambar galeri dari Firestore.
 * @param {string} id ID dokumen gambar yang akan dihapus.
 * @returns {Promise<void>}
 */
export async function deleteGalleryImage(id) {
  try {
    const docRef = doc(db, "gallery", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting gallery image ${id}:`, error);
    throw error;
  }
}

// --- Fungsi untuk User Roles (Penting untuk Admin Panel) ---

/**
 * Mengambil role pengguna dari koleksi 'users' di Firestore.
 * @param {string} uid UID pengguna.
 * @returns {Promise<string>} Role pengguna ('admin' atau 'member').
 */
export async function getUserRole(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().role || "member"; // Default ke 'member' jika tidak ada role
    }
    return "member"; // Default ke 'member' jika dokumen user tidak ada
  } catch (error) {
    console.error(`Error getting user role for ${uid}:`, error);
    return "member";
  }
}

/**
 * Mengatur role pengguna di koleksi 'users' di Firestore.
 * @param {string} uid UID pengguna.
 * @param {string} role Role yang akan diatur ('admin' atau 'member').
 * @returns {Promise<void>}
 */
export async function setUserRole(uid, role) {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { role: role });
  } catch (error) {
    console.error(`Error setting user role for ${uid}:`, error);
    throw error;
  }
}

/**
 * Membuat profil user baru di koleksi 'users' saat login pertama kali.
 * @param {string} uid UID pengguna.
 * @param {string} email Email pengguna.
 * @returns {Promise<void>}
 */
export async function createUserProfile(uid, email) {
  try {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        email: email,
        role: "member", // Default role saat user baru mendaftar
        createdAt: new Date().toISOString(), // Simpan dalam format ISO string
      });
      console.log(`User profile created for ${email}`);
    }
  } catch (error) {
    console.error(`Error creating user profile for ${email}:`, error);
  }
}

/**
 * Mengambil semua pengguna dari koleksi 'users'.
 * HANYA BOLEH DIAKSES OLEH ADMIN.
 * @returns {Promise<Array<Object>>} Array berisi objek pengguna.
 */
export async function getAllUsers() {
  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, orderBy("createdAt", "asc")); // Urutkan berdasarkan waktu pembuatan
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id, // UID user adalah ID dokumen
      ...doc.data(),
    }));
    return users;
  } catch (error) {
    console.error("Error getting all users:", error);
    return [];
  }
}
