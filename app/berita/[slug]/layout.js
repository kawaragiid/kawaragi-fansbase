// app/berita/[slug]/layout.js
// Ini adalah Server Component secara default.
import { getNewsArticles, getArticleBySlug } from "../../lib/firebase/firestore"; // Path ke root lib

// Fungsi untuk menghasilkan metadata dinamis (berjalan di server)
export async function generateMetadata({ params }) {
  const article = await getArticleBySlug(params.slug); // Ambil artikel dari Firestore

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan",
      description: "Artikel berita yang Anda cari tidak ditemukan.",
    };
  }
  return {
    title: `${article.title} - Kawaragi Fansbase`,
    description: article.excerpt,
    openGraph: {
      images: [article.imageUrl],
    },
  };
}

// Fungsi untuk menghasilkan parameter (slug) untuk pre-rendering (berjalan di server)
export async function generateStaticParams() {
  const articles = await getNewsArticles(); // Ambil semua slug dari Firestore
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticleDetailLayout({ children }) {
  // Layout ini hanya sebagai pembungkus. Konten halaman akan dirender di children.
  return <>{children}</>;
}
