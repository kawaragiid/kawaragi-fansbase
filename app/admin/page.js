// app/admin/page.js
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from '@/lib/firebase/authContext'; // <<< GUNAKAN ALIAS
import Link from "next/link";

export default function AdminDashboardPage() {
  const { user, loading: authLoading, userRole, roleLoading, signInWithGoogle, signOutUser } = useAuth(); // <<< Tambahkan roleLoading
  const router = useRouter();

  console.log("AdminPage: user:", user ? user.email : "none", "authLoading:", authLoading, "roleLoading:", roleLoading, "userRole:", userRole);

  // Periksa loading dari auth DAN role
  if (authLoading || roleLoading) {
    // <<< Menunggu kedua loading selesai
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-xl">Memuat Admin Dashboard...</p>
      </div>
    );
  }

  // Jika user tidak ada ATAU role-nya bukan admin
  if (!user || userRole !== "admin") {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center text-center">
        <div className="p-8 bg-gray-900 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold mb-4">Akses Admin</h1>
          <p className="text-lg mb-6">Silakan login dengan akun admin Anda untuk melanjutkan.</p>
          {!user && ( // Tampilkan tombol login hanya jika belum login
            <button onClick={signInWithGoogle} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Login dengan Google
            </button>
          )}
          {user &&
            userRole !== "admin" && ( // Jika user login tapi role-nya bukan admin
              <>
                <p className="text-red-400 mt-4">Maaf, akun Anda tidak memiliki izin admin.</p>
                <p className="text-gray-400 text-sm mt-2">
                  Status akun: {user.email} (Role: {userRole || "belum ditentukan"})
                </p>
                <button onClick={signOutUser} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors mt-4">
                  Logout
                </button>
              </>
            )}
        </div>
      </div>
    );
  }

  // Jika user adalah admin, render dashboard
  return (
    <div className="py-8">
      <h1 className="text-5xl font-bold text-white mb-10 border-b-4 border-pink-500 pb-4 inline-block">Dashboard Admin</h1>

      <p className="text-xl text-gray-300 mb-10">
        Selamat datang, <span className="font-semibold text-yellow-300">{user.email}</span>. Gunakan navigasi di samping untuk mengelola konten website Kawaragi Fansbase.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AdminDashboardCard title="Kelola Berita" description="Tambah, edit, atau hapus artikel berita." link="/admin/news" />
        <AdminDashboardCard title="Kelola Galeri" description="Upload, atur, atau hapus gambar galeri." link="/admin/gallery" />
        <AdminDashboardCard title="Pengaturan Umum" description="Konfigurasi website dan informasi kontak." link="/admin/settings" />
        <AdminDashboardCard title="Manajemen Pengguna" description="Lihat dan kelola akun pengguna (fitur mendatang)." link="/admin/users" />
      </div>
    </div>
  );
}

function AdminDashboardCard({ title, description, link }) {
  return (
    <Link
      href={link}
      className="block bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800
                                 transform hover:scale-[1.03] transition-transform duration-300 cursor-pointer group"
    >
      <h2 className="text-3xl font-bold text-yellow-300 mb-3 group-hover:text-pink-400 transition-colors">{title}</h2>
      <p className="text-gray-400 mb-6">{description}</p>
      <span className="text-pink-400 hover:text-pink-300 font-semibold flex items-center group-hover:underline">
        Akses
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
