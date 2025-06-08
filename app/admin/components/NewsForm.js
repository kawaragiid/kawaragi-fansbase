// app/admin/components/NewsForm.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // <--- TAMBAHKAN BARIS INI
import { addNewsArticle, updateNewsArticle, getArticleById } from "../../lib/firebase/firestore";
import { uploadFile } from "../../lib/firebase/storage";
import { useAuth } from "../../lib/firebase/authContext";
import Image from "next/image";

export default function NewsForm({ articleId = null }) {
  const { user, loading: authLoading, userRole } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isExclusive, setIsExclusive] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formLoading, setFormLoading] = useState(articleId ? true : false);

  useEffect(() => {
    if (articleId && !authLoading) {
      async function fetchArticleData() {
        setFormLoading(true);
        try {
          const articleDoc = await getArticleById(articleId);
          if (articleDoc) {
            setTitle(articleDoc.title);
            setSlug(articleDoc.slug);
            setDate(articleDoc.date || new Date().toISOString().split("T")[0]);
            setCategory(articleDoc.category ? articleDoc.category.join(", ") : "");
            setImageUrl(articleDoc.imageUrl || "");
            setExcerpt(articleDoc.excerpt);
            setContent(articleDoc.content);
            setIsExclusive(articleDoc.isExclusive || false);
          } else {
            setError("Artikel tidak ditemukan.");
          }
        } catch (err) {
          console.error("Error fetching article for edit:", err);
          setError("Gagal memuat data artikel.");
        } finally {
          setFormLoading(false);
        }
      }
      fetchArticleData();
    }
  }, [articleId, authLoading]);

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
      let finalImageUrl = imageUrl;
      let finalLowResImageUrl = "";

      if (imageFile) {
        const filePath = `news-images/${Date.now()}_${imageFile.name}`;

        const downloadURL = await uploadFile(imageFile, filePath, (progress) => {
          setUploadProgress(progress);
        });
        finalImageUrl = downloadURL;
        finalLowResImageUrl = downloadURL; // Low res sama dengan full res
      } else if (articleId && !imageUrl) {
        setError("Harap upload gambar utama untuk artikel ini.");
        setIsSubmitting(false);
        return;
      }

      const articleData = {
        title,
        slug:
          slug ||
          title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\s-]+/g, ""),
        date: date,
        category: category
          .split(",")
          .map((cat) => cat.trim())
          .filter((cat) => cat),
        imageUrl: finalImageUrl,
        lowResImageUrl: finalLowResImageUrl,
        excerpt,
        content,
        isExclusive: isExclusive,
        authorId: user.uid,
        createdAt: articleId ? article.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (articleId) {
        await updateNewsArticle(articleId, articleData);
        alert("Artikel berhasil diperbarui!");
      } else {
        await addNewsArticle(articleData);
        alert("Artikel berhasil ditambahkan!");
      }
      router.push("/admin/news");
    } catch (err) {
      console.error("Failed to save article:", err);
      setError(`Gagal menyimpan artikel: ${err.message}`);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
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
        <h1 className="text-4xl font-bold text-center text-white mb-10 border-b-4 border-pink-500 pb-4 inline-block">{articleId ? "Edit Artikel Berita" : "Tambah Artikel Baru"}</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-800 space-y-6">
          <div>
            <label htmlFor="title" className="block text-gray-300 text-sm font-bold mb-2">
              Judul Artikel:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-gray-300 text-sm font-bold mb-2">
              Slug (URL Path):
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="biarkan kosong untuk otomatis"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-gray-300 text-sm font-bold mb-2">
              Tanggal:
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-gray-300 text-sm font-bold mb-2">
              Kategori (pisahkan dengan koma):
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Contoh: Drama, Soya Kurokawa"
            />
          </div>

          <div>
            <label htmlFor="imageUpload" className="block text-gray-300 text-sm font-bold mb-2">
              Upload Gambar Utama:
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
            {imageFile && <p className="text-gray-400 text-sm mt-2">File dipilih: {imageFile.name}</p>}
            {imageUrl && !imageFile && (
              <div className="mt-4">
                <p className="text-gray-400 text-sm mb-2">Gambar saat ini:</p>
                <Image src={imageUrl} alt="Current Image" width={150} height={100} className="rounded-md object-cover" />
              </div>
            )}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            )}
            <label htmlFor="lowResImageUpload" className="block text-gray-300 text-sm font-bold mb-2 mt-4">
              Upload Gambar Resolusi Rendah (Opsional):
            </label>
            <input
              type="file"
              id="lowResImageUpload"
              accept="image/*"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
            <p className="text-gray-400 text-xs mt-2">*Jika tidak di-upload, akan menggunakan gambar utama untuk versi low-res.</p>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-gray-300 text-sm font-bold mb-2">
              Ringkasan (Excerpt):
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 h-24"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-gray-300 text-sm font-bold mb-2">
              Konten Lengkap (HTML atau Markdown):
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 h-64"
              required
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="isExclusive" checked={isExclusive} onChange={(e) => setIsExclusive(e.target.checked)} className="form-checkbox h-5 w-5 text-purple-600 bg-gray-800 border-gray-700 rounded focus:ring-purple-500" />
            <label htmlFor="isExclusive" className="ml-2 text-gray-300 text-sm">
              Artikel Eksklusif (membutuhkan login)
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/admin/news" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Batal
            </Link>
            <button type="submit" disabled={isSubmitting} className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? "Menyimpan..." : articleId ? "Perbarui Artikel" : "Tambah Artikel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
