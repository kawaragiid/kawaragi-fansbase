// app/admin/layout.js
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // <<< TAMBAHKAN usePathname
import Link from "next/link";
import { useAuth } from "../lib/firebase/authContext";
import AdminNavbar from "./components/AdminNavbar";

// Pindahkan definisi AdminSidebarLink ke sini
function AdminSidebarLink({ href, children }) {
  const pathname = usePathname(); // <<< GUNAKAN usePathname DI SINI
  const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href + "/"));

  return (
    <Link
      href={href}
      className={`block p-3 rounded-lg text-lg font-medium transition-colors duration-200
                 ${isActive ? "bg-purple-700 text-white shadow-md" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
    >
      {children}
    </Link>
  );
}

export default function AdminRootLayout({ children }) {
  const { user, loading: authLoading, userRole, roleLoading, signInWithGoogle, signOutUser } = useAuth();
  const router = useRouter(); // Tetap pakai useRouter untuk redirect

  useEffect(() => {
    if (!authLoading && !roleLoading) {
      if (!user) {
        router.push("/admin");
      } else if (userRole !== "admin") {
        router.push("/");
      }
    }
  }, [user, authLoading, userRole, roleLoading, router]);

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-xl">Memuat Admin Panel (Layout)...</p>
      </div>
    );
  }

  if (!user || userRole !== "admin") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <AdminNavbar />
      <aside className="w-64 bg-gray-900 p-6 shadow-lg flex flex-col justify-between pt-24">
        <div>
          <h2 className="text-3xl font-bold text-pink-500 mb-8">Admin Panel</h2>
          <nav>
            <ul className="space-y-4">
              <li>
                <AdminSidebarLink href="/admin">Dashboard</AdminSidebarLink>
              </li>
              <li>
                <AdminSidebarLink href="/admin/news">Berita</AdminSidebarLink>
              </li>
              <li>
                <AdminSidebarLink href="/admin/gallery">Galeri</AdminSidebarLink>
              </li>
              <li>
                <AdminSidebarLink href="/admin/users">Pengguna</AdminSidebarLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-8">{/* Logout button di AdminNavbar sudah cukup, atau bisa tetap ada di sidebar juga */}</div>
      </aside>
      <main className="flex-grow p-8 bg-gray-950 pt-24">{children}</main>
    </div>
  );
}
