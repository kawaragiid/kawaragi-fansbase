// app/components/HeroSection.js
"use client"; // Penting karena menggunakan Image dan potential useState/useEffect jika ada interaksi di hero

import Image from "next/image";
import Link from "next/link"; // Menggunakan Link dari Next.js

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden animate-fade-in-up">
      <Image
        src="/kawaragi-hero.jpg" // Ganti dengan path gambar hero kamu
        alt="Soya Kurokawa &amp; Hinata Hiiragi Hero Background" // <<< PERBAIKAN: &amp;
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={80}
        priority
        className="opacity-40 transition-opacity duration-700 ease-out transform scale-105"
      />
      {/* Overlay gradien, menyesuaikan dari atas ke bawah */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-black/30 to-black/60"></div>

      <div className="relative z-10 px-4 max-w-6xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight animate-slide-in-right">
          Menyelami Kedalaman Emosi <br />
          Bersama <span className="text-yellow-300">Soya Kurokawa</span> <span className="text-pink-400">&amp;</span> <span className="text-pink-400">Hinata Hiiragi</span> {/* <<< PERBAIKAN: &amp; */}
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto animate-slide-in-left delay-200">
          Terinspirasi dari nuansa film &quot;Monster&quot;, kami hadir untuk mengupas tuntas {/* <<< PERBAIKAN: &quot; */}
          setiap sisi dari bintang-bintang muda penuh bakat ini.
        </p>
        <Link href="#about-section">
          <button className="mt-10 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 animate-fade-in delay-500">
            Join to Train!
          </button>
        </Link>
      </div>
    </section>
  );
}
