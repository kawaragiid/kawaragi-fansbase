// app/admin/news/page.js
"use client";

import { useSearchParams } from "next/navigation";
import NewsTable from "../components/NewsTable";
import NewsForm from "../components/NewsForm";

export default function AdminNewsManagementPage() {
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const articleId = searchParams.get("id");

  return (
    <div className="py-8">
      {" "}
      {/* <<< Hapus pt-28, biarkan py-8 saja */}
      {action === "add" && (
        <>
          <h1 className="text-4xl font-bold text-white mb-10 border-b-4 border-pink-500 pb-4 inline-block">Tambah Berita Baru</h1>
          <NewsForm />
        </>
      )}
      {action === "edit" && articleId && (
        <>
          <h1 className="text-4xl font-bold text-white mb-10 border-b-4 border-pink-500 pb-4 inline-block">Edit Artikel Berita</h1>
          <NewsForm articleId={articleId} />
        </>
      )}
      {!action && (
        <>
          <h1 className="text-4xl font-bold text-white mb-10 border-b-4 border-pink-500 pb-4 inline-block">Daftar Berita</h1>
          <NewsTable />
        </>
      )}
    </div>
  );
}
