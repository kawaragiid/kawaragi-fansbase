// app/admin/gallery/page.js
"use client";

import { useSearchParams } from "next/navigation";
import GalleryTable from "../components/GalleryTable";
import GalleryForm from "../components/GalleryForm";

export default function AdminGalleryManagementPage() {
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const imageId = searchParams.get("id");

  return (
    <div className="py-8">
      {" "}
      {/* <<< Hapus pt-28, biarkan py-8 saja */}
      {action === "add" && (
        <>
          <h1 className="text-4xl font-bold text-white mb-10 border-b-4 border-yellow-300 pb-4 inline-block">Tambah Gambar Galeri Baru</h1>
          <GalleryForm />
        </>
      )}
      {action === "edit" && imageId && (
        <>
          <h1 className="text-4xl font-bold text-white mb-10 border-b-4 border-yellow-300 pb-4 inline-block">Edit Gambar Galeri</h1>
          <GalleryForm imageId={imageId} />
        </>
      )}
      {!action && (
        <>
          <h1 className="text-4xl font-bold text-white mb-10 border-b-4 border-yellow-300 pb-4 inline-block">Daftar Galeri</h1>
          <GalleryTable />
        </>
      )}
    </div>
  );
}
