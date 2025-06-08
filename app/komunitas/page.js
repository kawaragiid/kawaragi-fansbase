// app/komunitas/page.js
import Link from "next/link";
import Image from "next/image"; // Import Image untuk ikon sosial media

export const metadata = {
  title: "Komunitas Fans - Kawaragi Fansbase",
  description: "Bergabunglah dengan komunitas fans Soya Kurokawa dan Hinata Hiiragi.",
};

export default function KomunitasPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 pt-28">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h1 className="text-5xl font-bold text-white mb-16 border-b-4 border-pink-500 pb-4 inline-block animate-fade-in-up">Bergabunglah dengan Komunitas Kami!</h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
          Ini adalah tempat di mana semua penggemar Soya Kurokawa dan Hinata Hiiragi berkumpul. Mari kita berdiskusi, berbagi teori, dan merayakan bakat mereka bersama-sama!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Card Discord Server */}
          <div
            className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800
                          transform hover:scale-[1.03] transition-transform duration-300 group cursor-pointer"
          >
            <div className="text-7xl mb-6 flex justify-center">
              <Image src="/icons/discord.svg" alt="Discord Icon" width={72} height={72} />
            </div>{" "}
            {/* Ikon Discord */}
            <h2 className="text-3xl font-bold text-white mb-4">Discord Server Resmi</h2>
            <p className="text-gray-300 mb-6">Ikuti diskusi real-time, dapatkan update langsung, dan berinteraksi dengan sesama fans.</p>
            <Link
              href="https://discord.gg/your-invite-link" // Ganti dengan link invite Discord kamu
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md"
            >
              Gabung Discord
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Card WhatsApp Channel */}
          <div
            className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800
                          transform hover:scale-[1.03] transition-transform duration-300 group cursor-pointer"
          >
            <div className="text-7xl mb-6 flex justify-center">
              <Image src="/icons/whatsapp.svg" alt="WhatsApp Icon" width={72} height={72} />
            </div>{" "}
            {/* Ikon WhatsApp */}
            <h2 className="text-3xl font-bold text-white mb-4">WhatsApp Channel</h2>
            <p className="text-gray-300 mb-6">Dapatkan berita instan, pengumuman penting, dan konten eksklusif langsung di WhatsApp Anda.</p>
            <Link
              href="https://whatsapp.com/channel/your-channel-link" // Ganti dengan link Channel WhatsApp kamu
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md"
            >
              Ikuti Channel
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bagian Sosial Media Lainnya */}
        <div className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800">
          <h2 className="text-3xl font-bold text-white mb-6">Temukan Kami di Sosial Media</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <SocialLink href="https://instagram.com/kawaragi_fansbase" icon="/icons/instagram.svg" label="Instagram" />
            <SocialLink href="https://www.tiktok.com/@yourtiktokaccount" icon="/icons/tiktok.svg" label="TikTok" /> {/* TikTok */}
            <SocialLink href="https://x.com/kawaragifans" icon="/icons/x.svg" label="X (Twitter)" /> {/* X / Twitter */}
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen bantu untuk link sosial media (menggunakan Image untuk ikon)
function SocialLink({ href, icon, label }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-800 hover:bg-purple-700
                 transition-colors duration-300 transform hover:scale-105 shadow-md w-[140px]" // Lebar tetap untuk konsistensi
      title={label}
    >
      <Image src={icon} alt={`${label} Icon`} width={40} height={40} className="mb-2" />
      <p className="text-white font-medium">{label}</p>
    </Link>
  );
}
