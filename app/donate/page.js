// app/donate/page.js
"use client";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  // Metadata ini di Server Component, tapi page ini client, jadi bisa diabaikan
  title: "Dukung Kami - Kawaragi Fansbase",
  description: "Bantu kami mengembangkan Kawaragi Fansbase dan mendukung proyek-proyek terkait Soya Kurokawa & Hinata Hiiragi.",
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 pt-28">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h1 className="text-5xl font-bold text-white mb-16 border-b-4 border-yellow-300 pb-4 inline-block animate-fade-in-up">Dukung Kawaragi Fansbase!</h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
          Dukungan Anda sangat berarti bagi kami. Setiap kontribusi membantu kami untuk terus menyediakan konten berkualitas, menyelenggarakan event, dan menjaga komunitas ini tetap hidup dan berkembang.
        </p>

        {/* Ilustrasi Donasi (Opsional) */}
        <div className="mb-12">
          <Image
            src="/images/donate-illustration.png" // Ganti dengan path gambar ilustrasi donasi kamu
            alt="Dukung Kami"
            width={300}
            height={300}
            className="mx-auto rounded-full shadow-lg border-2 border-purple-500 animate-fade-in delay-200"
            priority
          />
        </div>

        {/* Opsi Donasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Opsi 1: Donasi Langsung (Misal: QRIS/Bank Transfer) */}
          <div
            className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800
                          transform hover:scale-[1.03] transition-transform duration-300 group cursor-pointer"
          >
            <div className="text-7xl mb-6 flex justify-center text-pink-400">💖</div> {/* Icon */}
            <h2 className="text-3xl font-bold text-white mb-4">Donasi Langsung</h2>
            <p className="text-gray-300 mb-6">Berikan dukungan Anda melalui transfer bank atau QRIS. Informasi detail akan ditampilkan setelah Anda klik.</p>
            <Link
              href="#bank-transfer-info" // Link ke bagian info transfer di halaman ini
              className="inline-flex items-center bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md"
            >
              Transfer Bank/QRIS
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Opsi 2: Dukung Melalui Platform Eksternal (Misal: Saweria/Trakteer) */}
          <div
            className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800
                          transform hover:scale-[1.03] transition-transform duration-300 group cursor-pointer"
          >
            <div className="text-7xl mb-6 flex justify-center text-yellow-300">☕</div> {/* Icon */}
            <h2 className="text-3xl font-bold text-white mb-4">Dukung Via Platform</h2>
            <p className="text-gray-300 mb-6">Dukung kami dengan &quot;traktir&quot; atau &quot;sawer&quot; melalui platform dukungan kreator favorit Anda.</p> {/* <--- PERBAIKAN: "traktir" dan "sawer" */}
            <Link
              href="https://saweria.co/kawaragifans" // Ganti dengan link Saweria/Trakteer kamu
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md"
            >
              Dukung di Saweria/Trakteer
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Informasi Detail Transfer Bank / QRIS */}
        <section id="bank-transfer-info" className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-700 mb-16 text-left">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Detail Donasi Langsung</h2>
          <div className="prose prose-invert prose-lg text-gray-300 mx-auto">
            <p>Untuk donasi langsung melalui transfer bank atau QRIS, Anda dapat mengirimkan kontribusi Anda ke rekening berikut:</p>
            <ul className="list-none p-0 space-y-4 text-center">
              <li>
                <strong>Bank:</strong> Bank Central Asia (BCA)
              </li>
              <li>
                <strong>Nomor Rekening:</strong> 1234567890
              </li>
              <li>
                <strong>Atas Nama:</strong> Kawaragi Fansbase Official
              </li>
              <li>
                Atau scan QRIS ini: <br />
                <Image src="/images/qris-dummy.png" alt="QRIS Code" width={200} height={200} className="mx-auto my-4 rounded-md shadow-md" /> {/* Ganti dengan QRIS asli kamu */}
              </li>
            </ul>
            <p className="mt-6 text-center text-gray-400 text-sm">
              Mohon konfirmasi setelah melakukan transfer ke email:{" "}
              <Link href="mailto:donasi@kawaragifans.com" className="text-pink-400 hover:underline">
                donasi@kawaragifans.com
              </Link>
            </p>
          </div>
        </section>

        {/* Section FAQ Donasi (Opsional) */}
        <section className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-700 text-left">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">FAQ Donasi</h2>
          <div className="prose prose-invert text-gray-300">
            <h3>Untuk apa donasi ini digunakan?</h3>
            <p>Donasi akan digunakan untuk biaya operasional website (hosting, domain), pengembangan konten baru, event komunitas, dan mendukung kegiatan promosi terkait Soya Kurokawa &amp; Hinata Hiiragi.</p> {/* <--- PERBAIKAN: &amp; */}
            <h3>Apakah donasi ini wajib?</h3>
            <p>Tentu tidak. Donasi adalah sukarela. Kehadiran dan partisipasi Anda di komunitas sudah merupakan dukungan yang sangat berharga bagi kami.</p>
            <h3>Bagaimana saya bisa melihat laporan penggunaan donasi?</h3>
            <p>Kami berkomitmen untuk transparansi. Laporan singkat penggunaan donasi akan kami publikasikan secara berkala di halaman ini atau melalui newsletter kami.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
