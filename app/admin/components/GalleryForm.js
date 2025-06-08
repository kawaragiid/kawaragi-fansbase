// app/admin/components/GalleryForm.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // <--- TAMBAHKAN BARIS INI
import { addGalleryImage, getGalleryImageById, updateGalleryImage } from "../../lib/firebase/firestore";
import { uploadFile } from "../../lib/firebase/storage";
import { useAuth } from "../../lib/firebase/authContext";
import Image from "next/image";

export default function GalleryForm({ imageId = null }) {
  const { user, loading: authLoading, userRole } = useAuth();
  const router = useRouter();

  const [alt, setAlt] = useState("");
  const [description, setDescription] = useState("");
  const [isExclusive, setIsExclusive] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [formLoading, setFormLoading] = useState(imageId ? true : false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  useEffect(() => {
    if (imageId && !authLoading) {
      async function fetchImageData() {
        setFormLoading(true);
        try {
          const imageDoc = await getGalleryImageById(imageId);
          if (imageDoc) {
            setAlt(imageDoc.alt || "");
            setDescription(imageDoc.description || "");
            setIsExclusive(imageDoc.isExclusive || false);
            setCurrentImageUrl(imageDoc.src || "");
          } else {
            setError("Gambar tidak ditemukan.");
          }
        } catch (err) {
          console.error("Error fetching image for edit:", err);
          setError("Gagal memuat data gambar.");
        } finally {
          setFormLoading(false);
        }
      }
      fetchImageData();
    }
  }, [imageId, authLoading]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!user || userRole !== "admin") {
      setError("Akses ditolak: Anda bukan admin.");
      setIsSubmitting(false);
      return;
    }

    try {
      let finalSrc = currentImageUrl;
      let finalLowResSrc = currentImageUrl;

      if (imageFile) {
        const filePath = `gallery-images/${Date.now()}_${imageFile.name}`;
        const downloadURL = await uploadFile(imageFile, filePath, (progress) => {
          setUploadProgress(progress);
        });
        finalSrc = downloadURL;
        finalLowResSrc = downloadURL;
      } else if (imageId && !currentImageUrl) {
        setError("Harap upload gambar atau pastikan URL gambar utama tidak kosong.");
        setIsSubmitting(false);
        return;
      }

      const imageData = {
        alt: alt,
        description: description,
        isExclusive: isExclusive,
        src: finalSrc,
        lowResSrc: finalLowResSrc,
        uploadedBy: user.uid,
        uploadedAt: imageId ? undefined : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (imageId) {
        await updateGalleryImage(imageId, imageData);
        alert("Gambar galeri berhasil diperbarui!");
      } else {
        await addGalleryImage(imageData);
        alert("Gambar galeri berhasil ditambahkan!");
      }
      router.push("/admin/gallery");
    } catch (err) {
      console.error("Failed to save image to gallery:", err);
      setError(`Gagal menyimpan gambar: ${err.message}`);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
      setPreviewImage(null);
      setImageFile(null);
    }
  };

  if (authLoading || formLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-xl">Memuat formulir...</p>
      </div>
    );
  }

  if (!user || userRole !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 pt-28">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-white mb-10 border-b-4 border-yellow-300 pb-4 inline-block">{imageId ? "Edit Gambar Galeri" : "Tambah Gambar Baru"}</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-800 space-y-6">
          <div>
            <label htmlFor="imageFile" className="block text-gray-300 text-sm font-bold mb-2">
              Pilih Gambar:
            </label>
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
            {previewImage && (
              <div className="mt-4">
                <p className="text-gray-400 text-sm mb-2">Preview Gambar Baru:</p>
                <Image src={previewImage} alt="Preview" width={200} height={150} className="rounded-md object-cover" />
              </div>
            )}
            {currentImageUrl && !imageFile && (
              <div className="mt-4">
                <p className="text-gray-400 text-sm mb-2">Gambar saat ini:</p>
                <Image src={currentImageUrl} alt="Current Image" width={200} height={150} className="rounded-md object-cover" />
              </div>
            )}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            )}
            <p className="text-gray-400 text-xs mt-2">*Jika mengubah gambar, gambar lama tidak otomatis terhapus dari storage. Harap hapus manual jika perlu.</p>
          </div>

          <div>
            <label htmlFor="alt" className="block text-gray-300 text-sm font-bold mb-2">
              Teks Alternatif (Alt Text):
            </label>
            <input
              type="text"
              id="alt"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-600"
              required
              placeholder="Contoh: Soya Kurokawa di balik layar Monster"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-300 text-sm font-bold mb-2">
              Deskripsi Gambar:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-600 h-24"
              placeholder="Deskripsi singkat tentang gambar ini."
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="isExclusive" checked={isExclusive} onChange={(e) => setIsExclusive(e.target.checked)} className="form-checkbox h-5 w-5 text-yellow-600 bg-gray-800 border-gray-700 rounded focus:ring-yellow-500" />
            <label htmlFor="isExclusive" className="ml-2 text-gray-300 text-sm">
              Gambar Eksklusif (membutuhkan login)
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/admin/gallery" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Batal
            </Link>
            <button type="submit" disabled={isSubmitting} className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? "Mengupload..." : imageId ? "Perbarui Gambar" : "Tambah Gambar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
