// app/page.js
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden animate-fade-in-up">
        <Image
          src="/kawaragi-hero.jpg" // Ganti dengan path gambar hero kamu (bisa gambar Soya/Hinata)
          alt="Soya Kurokawa &amp; Hinata Hiiragi Hero Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={80}
          priority
          className="opacity-40 transition-opacity duration-700 ease-out transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-black/30 to-black/60"></div>

        <div className="relative z-10 px-4 max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight animate-slide-in-right">
            Menyelami Kedalaman Emosi <br />
            Bersama <span className="text-yellow-300">Soya Kurokawa</span> <span className="text-pink-400">&amp;</span> <span className="text-pink-400">Hinata Hiiragi</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto animate-slide-in-left delay-200">
            Terinspirasi dari nuansa film &quot;Monster&quot;, kami hadir untuk mengupas tuntas setiap sisi dari bintang-bintang muda penuh bakat ini.
          </p>
          <button className="mt-10 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 animate-fade-in delay-500">
            Jelajahi Sekarang
          </button>
        </div>
      </section>

      {/* About Soya & Hinata Section */}
      <section className="py-20 px-6 sm:px-10 lg:px-20 bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold text-center text-white mb-12 border-b-4 border-pink-500 pb-4 inline-block">Tentang Kawaragi Senju</h2>
          <div className="text-lg leading-relaxed text-gray-300 space-y-6">
            <p>
              Film &quot;Monster&quot; (2023) berhasil menyajikan narasi kompleks dari berbagai sudut pandang, mengungkap lapisan-lapisan emosi yang tersembunyi. Di tengah alur yang memukau, performa{" "}
              <strong className="text-white hover:text-yellow-300 transition-colors cursor-pointer">Soya Kurokawa sebagai Minato</strong> dan{" "}
              <strong className="text-white hover:text-yellow-300 transition-colors cursor-pointer">Hinata Hiiragi sebagai Yori</strong>
              adalah jantung dari penceritaan tersebut. Keduanya berhasil menghidupkan karakter yang rumit, membuat penonton ikut merasakan kebingungan, kesendirian, dan ikatan persahabatan yang unik.
            </p>
            <p>
              Soya Kurokawa membawa Minato dengan kedalaman emosional yang luar biasa, menampilkan pergulatan batin seorang anak yang mencari tempatnya di dunia dan mencoba memahami realitas di sekitarnya. Sementara itu, Hinata Hiiragi
              sebagai Yori mampu memerankan sosok yang misterius namun rentan, menarik simpati sekaligus pertanyaan dari setiap perspektif yang disajikan film. Keduanya tidak hanya berakting, mereka <em>ada</em> dalam setiap adegan, mengisi
              ruang dengan kehadiran yang tak terlupakan.
            </p>
            <p>
              Fansbase ini didedikasikan untuk mengapresiasi dan mengkaji lebih jauh bakat luar biasa Soya Kurokawa dan Hinata Hiiragi. Kami akan menyelami detail-detail akting mereka, bagaimana mereka mampu mengekspresikan
              &quot;monster&quot; di balik topeng kesalahan dan kesalahpahaman, serta bagaimana chemistry mereka di layar menjadi jembatan bagi narasi yang kuat. Kami mengundang Anda untuk bergabung dalam diskusi mendalam tentang perjalanan
              artistik mereka dan momen-momen ikonik yang mereka ciptakan.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 sm:px-10 lg:px-20 bg-gray-950">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-5xl font-bold text-center text-white mb-12 border-b-4 border-yellow-300 pb-4 inline-block">Apa yang Bisa Kamu Temukan di Sini?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard title="Analisis Akting Mendalam" description="Kupas tuntas setiap ekspresi dan nuansa akting Soya Kurokawa &amp; Hinata Hiiragi." icon="🎭" />
            <FeatureCard title="Galeri Peran &amp; Potret" description='Kumpulan gambar dari film "Monster" dan proyek-proyek lainnya.' icon="📸" />
            <FeatureCard title="Berita &amp; Proyek Terbaru" description="Ikuti jejak karir mereka, dari film, drama, hingga wawancara eksklusif." icon="🎬" />
            <FeatureCard title="Teori &amp; Diskusi Fans" description='Bagikan pandanganmu tentang karakter mereka dan makna di balik kisah "Monster".' icon="💡" />
            <FeatureCard title="Dukungan untuk 'Hetriosk'" description="Informasi dan persiapan untuk proyek misterius yang akan datang." icon="🌌" />
            <FeatureCard title="Komunitas Aktif" description="Terhubung dengan penggemar lain, berbagi ide, dan merayakan bakat mereka." icon="🤝" />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-purple-800 to-red-600 text-white text-center">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md animate-fade-in-up">Siap untuk Menjelajah Lebih Jauh?</h2>
          <p className="text-xl md:text-2xl mb-10 animate-fade-in-up delay-200">Bergabunglah dengan komunitas kami dan mulai perjalanan Anda dalam mengapresiasi seni!</p>
          <button className="mt-10 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 animate-fade-in delay-500">
            Join to Train!
          </button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 border-2 border-gray-700 hover:border-pink-500 cursor-pointer">
      <div className="text-5xl mb-4 text-center transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-3 text-center group-hover:text-yellow-300 transition-colors duration-300">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </div>
  );
}
