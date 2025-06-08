// app/components/NavbarWrapper.js
"use client"; // Wajib karena menggunakan usePathname

import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; // Import Navbar utama

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Daftar path yang TIDAK seharusnya menampilkan Navbar utama
  // Ini termasuk semua path di bawah /admin
  const isAdminPath = pathname.startsWith("/admin");

  if (isAdminPath) {
    return null; // Jangan tampilkan Navbar utama di halaman admin
  }

  return <Navbar />; // Tampilkan Navbar utama di halaman non-admin
}
