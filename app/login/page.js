// app/login/page.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/firebase/authContext";
import Link from "next/link";
import Image from "next/image";

// HAPUS ATAU KOMENTARI BAGIAN METADATA INI
// export const metadata = {
//   title: 'Login - Kawaragi Fansbase',
//   description: 'Login untuk mengakses konten eksklusif dan fitur admin.',
// };

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  // Redirect jika user sudah login
  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-xl">Memuat...</p>
      </div>
    );
  }

  // Tampilkan halaman login hanya jika user belum login
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
        <div className="bg-gray-900 p-10 rounded-xl shadow-2xl border border-gray-800 text-center max-w-md w-full">
          <Image src="/kawaragi-logo.png" alt="Kawaragi Fansbase Logo" width={80} height={80} className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Login ke Kawaragi Fansbase</h1>
          <p className="text-gray-300 text-lg mb-8">Masuk untuk membuka akses penuh ke konten eksklusif dan fitur komunitas.</p>

          <button onClick={signInWithGoogle} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-3 text-xl shadow-lg">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.24 10.27v2.4h3.1c-0.2 1.3-1.1 2.9-3.1 2.9-2.2 0-3.9-1.9-3.9-4.2s1.7-4.2 3.9-4.2c1.1 0 2.2 0.5 2.9 1.2l2.1-2.1c-1.3-1.2-3.2-1.9-5-1.9-4.2 0-7.7 3.5-7.7 7.7s3.5 7.7 7.7 7.7c4.4 0 7.3-3.1 7.3-7.5 0-0.5-0.1-1.1-0.2-1.6h-7.1zm-0.03-6.52c-2.3 0-4.2 1.9-4.2 4.2s1.9 4.2 4.2 4.2 4.2-1.9 4.2-4.2-1.9-4.2-4.2-4.2z" />
            </svg>
            <span>Login dengan Google</span>
          </button>

          <p className="text-gray-400 text-sm mt-8">
            Dengan login, Anda menyetujui{" "}
            <Link href="/privacy" className="text-pink-400 hover:underline">
              Kebijakan Privasi
            </Link>{" "}
            kami.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
