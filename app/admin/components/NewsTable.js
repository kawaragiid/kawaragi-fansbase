// app/admin/components/NewsTable.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getNewsArticles, deleteNewsArticle } from "../../lib/firebase/firestore";
import { deleteFile } from "../../lib/firebase/storage";
import { Timestamp } from "firebase/firestore"; // Import Timestamp untuk cek tipe data

const DEFAULT_PLACEHOLDER_IMAGE = "/placeholder.jpg";

export default function NewsTable() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    setError("");
    try {
      const fetchedArticles = await getNewsArticles(50);

      const processedArticles = fetchedArticles.map((article) => {
        let imageUrl = article.imageUrl;
        if (!imageUrl || typeof imageUrl !== "string" || imageUrl.trim() === "") {
          imageUrl = DEFAULT_PLACEHOLDER_IMAGE;
        }
        if (imageUrl && !imageUrl.startsWith("http") && !imageUrl.startsWith("/")) {
          imageUrl = `/${imageUrl}`;
        }

        let formattedDate = article.date;
        // Cek jika article.date adalah objek Timestamp, lalu konversi
        if (article.date && typeof article.date.toDate === "function") {
          formattedDate = article.date.toDate().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
        } else if (typeof article.date === "string") {
          // Jika sudah string (ISO), coba format ulang jika perlu
          try {
            formattedDate = new Date(article.date).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
          } catch (e) {
            // Biarkan saja jika string tidak valid tanggal
          }
        }

        return {
          ...article,
          imageUrl: imageUrl.trim(),
          date: formattedDate, // Gunakan tanggal yang sudah diformat
        };
      });

      setArticles(processedArticles);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
      setError("Gagal memuat artikel.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title, imageUrl) => {
    if (window.confirm(`Anda yakin ingin menghapus artikel "${title}"?`)) {
      try {
        await deleteNewsArticle(id);
        if (imageUrl && typeof imageUrl === "string" && imageUrl.startsWith("http")) {
          await deleteFile(imageUrl);
        }
        await fetchArticles();
        alert("Artikel berhasil dihapus!");
      } catch (err) {
        console.error("Error deleting article:", err);
        setError("Gagal menghapus artikel.");
      }
    }
  };

  if (loading) {
    return <p className="text-xl text-center">Memuat daftar artikel...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center text-xl">{error}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <Link href="/admin/news?action=add" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Tambah Berita Baru
        </Link>
        <button onClick={fetchArticles} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Refresh Data
        </button>
      </div>

      {articles.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">Belum ada artikel berita. Mulai tambahkan yang baru!</p>
      ) : (
        <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Gambar
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Judul
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Tanggal
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Eksklusif
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16 relative">
                        <Image className="h-16 w-16 rounded-md object-cover" src={article.imageUrl} alt={article.title} layout="fill" objectFit="cover" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">
                    <div className="text-sm font-medium text-white">{article.title}</div>
                    <div className="text-xs text-gray-400">{article.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {article.date} {/* Ini sekarang sudah diformat */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${article.isExclusive ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`}>{article.isExclusive ? "Ya" : "Tidak"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/news?action=edit&id=${article.id}`} className="text-indigo-400 hover:text-indigo-300 mr-4">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(article.id, article.title, article.imageUrl)} className="text-red-400 hover:text-red-300">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
