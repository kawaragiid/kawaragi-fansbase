// app/page.js
// Hapus import Image karena sudah di HeroSection
import HeroSection from "./components/HeroSection"; // Import HeroSection

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Hero Section yang sudah dipisah */}
      <HeroSection />

      {/* About Soya & Hinata Section - Tambahkan ID */}
      <section id="about-section" className="py-24 px-6 sm:px-10 lg:px-20 bg-gray-900 overflow-hidden">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold text-center text-white mb-16 border-b-4 border-pink-500 pb-4 inline-block transform translate-y-0 opacity-100 transition-all duration-700 ease-out hover:scale-105">
            Soya Kurokawa & Hinata Hiiragi: Menggali Makna di Balik Peran
          </h2>
          <div className="text-lg leading-relaxed text-gray-300 space-y-8 animate-fade-in-up delay-700">
            <p>
              Film "Monster" (2023) berhasil menyajikan narasi kompleks dari berbagai sudut pandang, mengungkap lapisan-lapisan emosi yang tersembunyi. Di tengah alur yang memukau, performa{" "}
              <strong className="text-white hover:text-yellow-300 transition-colors cursor-pointer">Soya Kurokawa sebagai Minato</strong> dan{" "}
              <strong className="text-white hover:text-yellow-300 transition-colors cursor-pointer">Hinata Hiiragi sebagai Yori</strong>
              adalah jantung dari penceritaan tersebut. Keduanya berhasil menghidupkan karakter yang rumit, membuat penonton ikut merasakan kebingungan, kesendirian, dan ikatan persahabatan yang unik.
            </p>
            <p>
              Soya Kurokawa membawa Minato dengan kedalaman emosional yang luar biasa, menampilkan pergulatan batin seorang anak yang mencari tempatnya di dunia dan mencoba memahami realitas di sekitarnya. Sementara itu, Hinata Hiiragi
              sebagai Yori mampu memerankan sosok yang misterius namun rentan, menarik simpati sekaligus pertanyaan dari setiap perspektif yang disajikan film. Keduanya tidak hanya berakting, mereka *ada* dalam setiap adegan, mengisi ruang
              dengan kehadiran yang tak terlupakan.
            </p>
            <p>
              Fansbase ini didedikasikan untuk mengapresiasi dan mengkaji lebih jauh bakat luar biasa Soya Kurokawa dan Hinata Hiiragi. Kami akan menyelami detail-detail akting mereka, bagaimana mereka mampu mengekspresikan "monster" di
              balik topeng kesalahan dan kesalahpahaman, serta bagaimana chemistry mereka di layar menjadi jembatan bagi narasi yang kuat. Kami mengundang Anda untuk bergabung dalam diskusi mendalam tentang perjalanan artistik mereka dan
              momen-momen ikonik yang mereka ciptakan.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 sm:px-10 lg:px-20 bg-gray-950 overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-5xl font-bold text-center text-white mb-16 border-b-4 border-yellow-300 pb-4 inline-block transform translate-y-0 opacity-100 transition-all duration-700 ease-out hover:scale-105">Selami Dunia Mereka</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard title="Analisis Akting Mendalam" description="Kupas tuntas setiap ekspresi dan nuansa akting Soya Kurokawa & Hinata Hiiragi." icon="🎭" />
            <FeatureCard title="Galeri Peran & Potret" description="Kumpulan gambar dari film 'Monster' dan proyek-proyek lainnya." icon="📸" />
            <FeatureCard title="Berita & Proyek Terbaru" description="Ikuti jejak karir mereka, dari film, drama, hingga wawancara eksklusif." icon="🎬" />
            <FeatureCard title="Teori & Diskusi Fans" description="Bagikan pandanganmu tentang karakter mereka dan makna di balik kisah 'Monster'." icon="💡" />
            <FeatureCard title="Dukungan untuk 'Hetriosk'" description="Informasi dan persiapan untuk proyek misterius yang akan datang." icon="🌌" />
            <FeatureCard title="Komunitas Aktif" description="Terhubung dengan penggemar lain, berbagi ide, dan merayakan bakat mereka." icon="🤝" />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-br from-purple-800 to-red-600 text-white text-center">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 drop-shadow-md animate-fade-in-up">Siap untuk Menjelajah Lebih Jauh?</h2>
          <p className="text-xl md:text-2xl mb-12 animate-fade-in-up delay-200">Bergabunglah dengan komunitas kami dan mulai perjalanan Anda dalam mengapresiasi seni!</p>
          <button className="bg-white text-purple-800 hover:text-purple-900 font-bold py-4 px-12 rounded-full text-xl shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 animate-fade-in-up delay-500">
            Join to Train!
          </button>
        </div>
      </section>
    </div>
  );
}

// Komponen Card untuk Fitur
function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 border-2 border-gray-700 hover:border-pink-500 cursor-pointer">
      <div className="text-5xl mb-4 text-center transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-3 text-center group-hover:text-yellow-300 transition-colors duration-300">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </div>
  );
}
