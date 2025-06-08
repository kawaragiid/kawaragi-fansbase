// app/berita/[slug]/page.js
"use client"; // Tetap client component
import Image from "next/image";
import Link from "next/link";
// HAPUS IMPORT INI KARENA SEKARANG SUDAH ADA DI LAYOUT.JS:
// import { getNewsArticles, getArticleBySlug } from '../../lib/firebase/firestore';
import { getArticleBySlug } from "../../lib/firebase/firestore"; // <<< HANYA import yang dibutuhkan di client
import { useAuth } from "../../lib/firebase/authContext";
import { useEffect, useState } from "react"; // Pastikan ini diimport

// HAPUS BAGIAN INI SELURUHNYA:
// export async function generateMetadata({ params }) { ... }
// export async function generateStaticParams() { ... }

export default function ArticleDetailPage({ params }) {
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const [article, setArticle] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      setDataLoading(true);
      const fetchedArticle = await getArticleBySlug(params.slug);
      setArticle(fetchedArticle);
      setDataLoading(false);
    }
    fetchArticle();
  }, [params.slug]);

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-xl">Memuat artikel...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-950 text-white py-20 pt-28 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold mb-4">Artikel Tidak Ditemukan</h1>
        <p className="text-xl text-gray-300 mb-8">Maaf, artikel yang Anda cari tidak ada.</p>
        <Link href="/berita" className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          Kembali ke Berita
        </Link>
      </div>
    );
  }

  const isContentRestricted = article.isExclusive && !user;

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 pt-28">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Breadcrumb sederhana */}
        <nav className="mb-8 text-gray-400 text-sm">
          <Link href="/" className="hover:text-pink-400">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/berita" className="hover:text-pink-400">
            Berita
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{article.title}</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
          {article.title}
          {article.isExclusive && <span className="ml-4 text-sm bg-yellow-600 text-black px-3 py-1 rounded-full font-semibold">Eksklusif</span>}
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Dipublikasikan: {article.date} | Kategori: {article.category.join(", ")}
        </p>

        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image src={article.imageUrl || "/placeholder.jpg"} alt={article.title} layout="fill" objectFit="cover" priority className={isContentRestricted ? "blur-sm" : ""} />
          {isContentRestricted && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-center">
              <div className="text-white text-2xl font-bold animate-pulse">Login untuk Membaca Artikel Lengkap</div>
            </div>
          )}
        </div>

        {isContentRestricted ? (
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-center">
            <p className="text-xl text-gray-300 mb-6">Artikel ini adalah konten eksklusif untuk anggota fansbase. Silakan login untuk membaca selengkapnya.</p>
            <button onClick={signInWithGoogle} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Login Sekarang
            </button>
          </div>
        ) : (
          <div className="prose prose-invert prose-lg text-gray-300 leading-relaxed mb-10">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        )}

        <div className="flex justify-between items-center mt-10 border-t border-gray-800 pt-6">
          <Link href="/berita" className="text-pink-400 hover:text-pink-300 font-semibold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Daftar Berita
          </Link>
        </div>
      </div>
    </div>
  );
}
