// app/components/FloatingDonateButton.js
"use client"; // Penting karena menggunakan efek hover dan mungkin interaksi JS

import Link from "next/link";
import Image from "next/image"; // Jika ingin menggunakan ikon gambar

export default function FloatingDonateButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {" "}
      {/* Posisi fixed di kanan bawah, z-index tinggi */}
      <Link href="/donate">
        <button
          className="bg-gradient-to-br from-pink-600 to-purple-700 text-white
                     rounded-full p-4 md:p-5 shadow-2xl flex items-center justify-center
                     transform transition-all duration-300 ease-in-out
                     hover:scale-110 hover:shadow-glow hover:bg-gradient-to-bl
                     focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-opacity-50
                     group" // Menambahkan 'group' untuk animasi teks
          title="Dukung Kami"
        >
          {/* Ikon Hati (Bisa diganti dengan Image jika punya ikon SVG/PNG) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-9 md:w-9 text-white group-hover:text-yellow-200 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>

          {/* Teks "Dukung Kami" yang muncul saat hover (opsional) */}
          <span
            className="absolute left-full ml-4 whitespace-nowrap
                           bg-gray-800 text-white text-base rounded-md px-3 py-2 shadow-lg
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300
                           pointer-events-none group-hover:pointer-events-auto"
          >
            Dukung Kami!
          </span>
        </button>
      </Link>
    </div>
  );
}
