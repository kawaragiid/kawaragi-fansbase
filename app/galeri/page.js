// app/galeri/page.js
"use client"; // Tetap Client Component

import Image from "next/image";
import { useAuth } from "../lib/firebase/authContext"; // Pastikan path ini benar
import { getGalleryImages } from "../lib/firebase/firestore"; // Pastikan path ini benar
import { useState, useEffect } from "react";

// HAPUS ATAU KOMENTARI BAGIAN METADATA INI
// export const metadata = {
//   title: 'Galeri Foto - Kawaragi Fansbase',
//   description: 'Kumpulan foto dan artwork eksklusif Soya Kurokawa & Hinata Hiiragi.',
// };

export default function GaleriPage() {
  const { user, loading: authLoading } = useAuth();
  const [images, setImages] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(""); // Tambahkan state error untuk penanganan loading

  useEffect(() => {
    async function fetchImages() {
      setDataLoading(true);
      setError(""); // Reset error
      try {
        const fetchedImages = await getGalleryImages();

        const processedImages = fetchedImages.map((img) => {
          let imageUrl = img.src;
          if (!imageUrl || typeof imageUrl !== "string" || imageUrl.trim() === "") {
            imageUrl = "/placeholder.jpg"; // Menggunakan placeholder global
          }
          if (imageUrl && !imageUrl.startsWith("http") && !imageUrl.startsWith("/")) {
            imageUrl = `/${imageUrl}`;
          }

          let formattedUploadedAt = img.uploadedAt;
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
            uploadedAt: formattedUploadedAt,
          };
        });

        setImages(processedImages);
      } catch (err) {
        console.error("Failed to fetch gallery images:", err);
        setError("Gagal memuat galeri. Pastikan ada data atau cek koneksi."); // Set error
      } finally {
        setDataLoading(false);
      }
    }
    fetchImages();
  }, []);

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-xl">Memuat galeri...</p>
      </div>
    );
  }

  if (error) {
    // Tampilkan pesan error jika ada
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 pt-28">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-5xl font-bold text-center text-white mb-16 border-b-4 border-yellow-300 pb-4 inline-block animate-fade-in-up">Galeri Foto & Artwork</h1>

        <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Jelajahi koleksi gambar pilihan yang menampilkan momen terbaik dari Soya Kurokawa dan Hinata Hiiragi, termasuk foto di balik layar film "Monster" dan proyek lainnya.
        </p>

        {images.length === 0 ? ( // Tampilkan pesan jika tidak ada gambar
          <div className="text-center text-gray-400 text-lg py-10">
            <p>Belum ada gambar di galeri. Silakan login sebagai admin untuk menambahkannya!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {images.map((img, index) => (
              <div
                key={img.id}
                className="relative group bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-800
                            transform hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
              >
                <Image
                  src={img.isExclusive && !user ? img.lowResSrc || "/placeholder.jpg" : img.src || "/placeholder.jpg"}
                  alt={img.alt || "Gambar Galeri"}
                  width={500}
                  height={350}
                  objectFit="cover"
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay dengan deskripsi dan ikon (opsional) */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-6
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <p className="text-white text-lg font-medium mb-2">{img.description}</p>
                  <div className="flex items-center text-pink-300 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Lihat Detail
                  </div>
                </div>

                {/* Overlay Eksklusif jika user belum login dan gambar eksklusif */}
                {img.isExclusive && !user && (
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent flex items-center justify-center text-center p-4">
                    <div className="text-white text-xl font-bold animate-pulse">
                      Konten Eksklusif <br /> Login untuk Melihat
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tombol Load More */}
        <div className="flex justify-center mt-20">
          <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-lg transition-colors">Muat Lebih Banyak</button>
        </div>
      </div>
    </div>
  );
}
