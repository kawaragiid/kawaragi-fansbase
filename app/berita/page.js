// app/berita/page.js
// Ini adalah Server Component (async function)
import Link from "next/link";
import Image from "next/image";
import { getNewsArticles } from "../lib/firebase/firestore"; // Import fungsi getNewsArticles
import { Timestamp } from "firebase/firestore"; // <<< Import Timestamp

export const metadata = {
  title: "Berita Terbaru - Kawaragi Fansbase",
  description: "Dapatkan berita dan update terbaru tentang Soya Kurokawa & Hinata Hiiragi.",
};

// Fungsi ini akan dieksekusi di server saat build atau request (SSR/SSG)
export default async function BeritaPage() {
  const articles = await getNewsArticles(10); // Ambil 10 artikel terbaru dari Firestore

  // --- LOGIKA KONVERSI TIMESTAMP UNTUK SEMUA ARTIKEL ---
  const processedArticles = articles.map((article) => {
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

    // Pastikan imageUrl juga valid untuk prerendering
    let imageUrl = article.imageUrl;
    if (!imageUrl || typeof imageUrl !== "string" || imageUrl.trim() === "") {
      imageUrl = "/placeholder.jpg";
    }
    if (imageUrl && !imageUrl.startsWith("http") && !imageUrl.startsWith("/")) {
      imageUrl = `/${imageUrl}`;
    }

    // Pastikan category adalah array dan dijoin
    let formattedCategory = Array.isArray(article.category) ? article.category.join(", ") : article.category || "";

    return {
      ...article,
      date: formattedDate, // Gunakan tanggal yang sudah diformat
      imageUrl: imageUrl.trim(), // Pastikan URL gambar valid
      category: formattedCategory,
    };
  });
  // --- AKHIR LOGIKA KONVERSI TIMESTAMP ---

  const featuredArticle = processedArticles.length > 0 ? processedArticles[0] : null;
  const otherArticles = processedArticles.slice(1);

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 pt-28">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-5xl font-bold text-center text-white mb-16 border-b-4 border-pink-500 pb-4 inline-block animate-fade-in-up">Berita & Update Terbaru</h1>

        {/* Bagian Artikel Unggulan */}
        {featuredArticle && (
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-8 text-center md:text-left">Artikel Unggulan</h2>
            <article
              className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700
                                 flex flex-col md:flex-row gap-8 items-start
                                 transform hover:scale-[1.005] transition-transform duration-300 group cursor-pointer"
            >
              <div className="relative w-full md:w-2/5 h-64 md:h-80 overflow-hidden rounded-lg flex-shrink-0">
                <Image
                  src={featuredArticle.imageUrl || "/placeholder.jpg"} // Sudah diproses di atas
                  alt={featuredArticle.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-4xl font-extrabold text-yellow-300 mb-4 leading-tight">
                    <Link href={`/berita/${featuredArticle.slug}`} className="hover:text-pink-400 transition-colors">
                      {featuredArticle.title}
                    </Link>
                  </h3>
                  <p className="text-gray-400 text-base mb-4">
                    Dipublikasikan: {featuredArticle.date} | Kategori: {featuredArticle.category} {/* Sudah diproses */}
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-6 line-clamp-4">{featuredArticle.excerpt}</p>
                </div>
                <Link href={`/berita/${featuredArticle.slug}`} className="mt-auto text-pink-400 hover:text-pink-300 font-semibold text-lg flex items-center group">
                  Baca Selengkapnya
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          </section>
        )}

        {/* Bagian Artikel Lainnya */}
        {otherArticles.length > 0 && <h2 className="text-4xl font-bold text-white mb-10 text-center md:text-left">Artikel Terbaru Lainnya</h2>}
        <div className="space-y-12">
          {otherArticles.map((article) => (
            <article
              key={article.id}
              className={`bg-gray-900 p-6 sm:p-8 rounded-lg shadow-xl border border-gray-800
                         flex flex-col md:flex-row gap-6 md:gap-8 items-start
                         transform hover:scale-[1.01] transition-transform duration-300 group cursor-pointer
                         ${article.id % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`} // Ganti index%2 jadi article.id % 2 jika ID numerik
            >
              <div className="relative w-full md:w-1/3 h-48 md:h-auto overflow-hidden rounded-md flex-shrink-0">
                <Image
                  src={article.imageUrl || "/placeholder.jpg"} // Sudah diproses di atas
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-3xl font-semibold text-yellow-300 mb-2 leading-tight">
                  <Link href={`/berita/${article.slug}`} className="hover:text-pink-400 transition-colors">
                    {article.title}
                  </Link>
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  Dipublikasikan: {article.date} | Kategori: {article.category} {/* Sudah diproses */}
                </p>
                <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3">{article.excerpt}</p>
                <Link href={`/berita/${article.slug}`} className="text-pink-400 hover:text-pink-300 font-semibold flex items-center group">
                  Baca Selengkapnya
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Tombol Pagination Sederhana */}
        <div className="flex justify-center mt-20 space-x-6">
          <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg transition-colors">Sebelumnya</button>
          <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg transition-colors">Selanjutnya</button>
        </div>
      </div>
    </div>
  );
}
