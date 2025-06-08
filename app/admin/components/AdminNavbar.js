// app/admin/components/AdminNavbar.js
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/firebase/authContext";

export default function AdminNavbar() {
  const { user, signOutUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOutUser();
    router.push("/"); // Redirect ke homepage setelah logout (keluar dari halaman admin)
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md flex justify-between items-center fixed w-full top-0 z-40">
      <div className="flex items-center">
        {/* Judul/Branding Admin Panel */}
        <h1 className="text-xl font-bold text-white mr-4">
          <Link href="/admin" className="hover:text-pink-300 transition-colors">
            Admin Panel
          </Link>
        </h1>
        {/* Tombol "Kembali ke Website" */}
        <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Website
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {/* Info User yang Login */}
        {user && (
          <span className="text-gray-300 text-sm">
            Logged in as: <span className="font-semibold text-yellow-300">{user.email}</span>
          </span>
        )}
        {/* Tombol Logout */}
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Logout
        </button>
      </div>
    </nav>
  );
}
