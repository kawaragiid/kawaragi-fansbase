// app/admin/components/GalleryTable.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getGalleryImages, deleteGalleryImage } from "../../lib/firebase/firestore";
import { deleteFile } from "../../lib/firebase/storage";
import { Timestamp } from "firebase/firestore"; // Import Timestamp

const DEFAULT_PLACEHOLDER_IMAGE = "/placeholder.jpg";

export default function GalleryTable() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    setError("");
    try {
      const fetchedImages = await getGalleryImages(50);

      const processedImages = fetchedImages.map((img) => {
        let imageUrl = img.src;
        if (!imageUrl || typeof imageUrl !== "string" || imageUrl.trim() === "") {
          imageUrl = DEFAULT_PLACEHOLDER_IMAGE;
        }
        if (imageUrl && !imageUrl.startsWith("http") && !imageUrl.startsWith("/")) {
          imageUrl = `/${imageUrl}`;
        }

        let formattedUploadedAt = img.uploadedAt;
        // Cek jika img.uploadedAt adalah objek Timestamp, lalu konversi
        if (img.uploadedAt && typeof img.uploadedAt.toDate === "function") {
          formattedUploadedAt = img.uploadedAt.toDate().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
        } else if (typeof img.uploadedAt === "string") {
          try {
            formattedUploadedAt = new Date(img.uploadedAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
          } catch (e) {
            // Biarkan saja jika string tidak valid tanggal
          }
        }

        return {
          ...img,
          src: imageUrl.trim(),
          uploadedAt: formattedUploadedAt, // Gunakan tanggal yang sudah diformat
        };
      });

      setImages(processedImages);
    } catch (err) {
      console.error("Failed to fetch gallery images:", err);
      setError("Gagal memuat gambar galeri.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, imageUrl, altText) => {
    if (window.confirm(`Anda yakin ingin menghapus gambar "${altText}"?`)) {
      try {
        await deleteGalleryImage(id);
        if (imageUrl && typeof imageUrl === "string" && imageUrl.startsWith("http")) {
          await deleteFile(imageUrl);
        }
        await fetchImages();
        alert("Gambar berhasil dihapus!");
      } catch (err) {
        console.error("Error deleting image:", err);
        setError("Gagal menghapus gambar.");
      }
    }
  };

  if (loading) {
    return <p className="text-xl text-center">Memuat daftar gambar...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center text-xl">{error}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <Link href="/admin/gallery?action=add" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Tambah Gambar Baru
        </Link>
        <button onClick={fetchImages} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Refresh Data
        </button>
      </div>

      {images.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">Belum ada gambar di galeri. Mulai tambahkan yang baru!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-900 p-6 rounded-lg shadow-xl">
          {images.map((imageItem) => (
            <div key={imageItem.id} className="relative group rounded-lg overflow-hidden border border-gray-800 shadow-md">
              <Image src={imageItem.src} alt={imageItem.alt || "Gambar Galeri"} width={300} height={200} objectFit="cover" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <p className="text-sm font-semibold truncate">{imageItem.alt}</p>
                <p className="text-xs text-gray-400">{imageItem.description}</p>
                {/* Tambahkan tanggal upload di sini jika mau */}
                <p className="text-xs text-gray-500 mt-1">Upload: {imageItem.uploadedAt}</p>
              </div>
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => handleDelete(imageItem.id, imageItem.src, imageItem.alt)} className="bg-red-600 p-2 rounded-full text-white hover:bg-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
