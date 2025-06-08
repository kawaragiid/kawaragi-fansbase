// app/karakter/page.js
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Profil Aktor & Aktris - Kawaragi Fansbase",
  description: 'Kenali lebih dekat profil Soya Kurokawa dan Hinata Hiiragi, bintang film "Monster".',
};

export default function KarakterPage() {
  const characters = [
    {
      id: "soya",
      name: "Soya Kurokawa",
      role: "Aktor (Minato di &quot;Monster (2023)&quot;)", // <--- PERBAIKAN: &quot;Monster (2023)&quot;
      image: "/karakter/soya-profile-full.jpg",
      bgImage: "/karakter/soya-bg.jpg",
      bio: `
        <strong>Soya Kurokawa</strong> adalah aktor muda Jepang yang mulai dikenal luas melalui perannya sebagai <em>Minato</em> dalam film &quot;Monster&quot; (2023) garapan sutradara Hirokazu Kore-eda. Lahir pada tahun 2009, Soya menunjukkan bakat akting yang luar biasa sejak usia dini. Performa intensnya di &quot;Monster&quot; berhasil mencuri perhatian kritikus film dan penonton internasional, membawanya meraih berbagai penghargaan dan nominasi, termasuk pengakuan di Festival Film Cannes.
        <br/><br/>
        Sebelum &quot;Monster&quot;, Soya telah tampil di beberapa produksi film dan drama televisi, meskipun perannya di &quot;Monster&quot; adalah titik balik besar dalam karirnya. Ia dikenal memiliki kemampuan untuk mendalami karakter yang kompleks dan menyampaikan emosi dengan sangat jujur. Masa depannya di industri perfilman sangat cerah, dengan banyak proyek menarik yang sudah menanti.
      `,
      highlights: ["Peraih Penghargaan Aktor Terbaik (Nominasi)", "Bintang Muda Paling Menjanjikan", "Spesialis Peran Dramatis"],
      filmographyPreview: [
        { title: "Monster (2023)", role: "Minato", type: "Film" },
        { title: "Rintangan Hati (Tentatif)", role: "Pemeran Utama", type: "Drama TV" },
      ],
      instagram: "https://www.instagram.com/kurokawa.soya_official/",
      x: "https://twitter.com/kurokawa_soya",
      imdb: "https://www.imdb.com/name/nm9530462/",
    },
    {
      id: "hinata",
      name: "Hinata Hiiragi",
      role: "Aktris (Yori di &quot;Monster (2023)&quot;)", // <--- PERBAIKAN: &quot;Monster (2023)&quot;
      image: "/karakter/hinata-profile-full.jpg",
      bgImage: "/karakter/hinata-bg.jpg",
      bio: `
        <strong>Hinata Hiiragi</strong> adalah aktris cilik berbakat yang memukau penonton dengan perannya sebagai <em>Yori</em> di film &quot;Monster&quot; (2023). Lahir pada tahun 2011, Hinata berhasil menghidupkan karakter yang penuh misteri, kerentanan, dan daya tarik. Aktingnya yang alami dan ekspresif membuatnya mendapatkan pujian tinggi dari para kritikus dan penggemar film.
        <br/><br/>
        Perannya di &quot;Monster&quot; adalah debut layar lebar yang sangat mengesankan bagi Hinata. Ia mampu berkolaborasi dengan Soya Kurokawa dan jajaran aktor senior lainnya, menciptakan chemistry yang kuat yang menjadi salah satu kekuatan utama film tersebut. Hinata Hiiragi dianggap sebagai salah satu bintang muda paling menjanjikan di industri hiburan Jepang, dengan potensi besar untuk karir yang panjang dan sukses.
      `,
      highlights: ["Debut Akting yang Mengesankan", "Penghayatan Karakter yang Dalam", "Senyum Penuh Pesona"],
      filmographyPreview: [
        { title: "Monster (2023)", role: "Yori", type: "Film" },
        { title: "The Silent Forest (2022)", role: "Peran Pendukung", type: "Drama TV" },
      ],
      instagram: "https://www.instagram.com/hinata_hiiragi_official/",
      x: "https://twitter.com/hiiragi_hinata",
      imdb: "https://www.imdb.com/name/nm14500996/",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <div className="container mx-auto px-6 max-w-6xl py-12 pt-28">
        <h1 className="text-5xl font-bold text-center text-white mb-16 border-b-4 border-yellow-300 pb-4 inline-block animate-fade-in-up">Profil Bintang &quot;Monster&quot; {/* <--- PERBAIKAN: &quot;Monster&quot; */}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {characters.map((char, index) => (
            <section
              key={char.id}
              className={`relative rounded-xl overflow-hidden shadow-2xl mb-24
                          ${index % 2 === 0 ? "bg-gradient-to-br from-purple-900 to-red-800" : "bg-gradient-to-br from-blue-900 to-teal-800"}
                          `}
              style={{ minHeight: "600px" }}
            >
              {/* Background Image (Parallax-like effect) */}
              <div
                className="absolute inset-0 z-0 bg-fixed bg-center bg-cover opacity-30
                           transition-opacity duration-500 group-hover:opacity-40"
                style={{ backgroundImage: `url(${char.bgImage})` }}
              ></div>

              {/* Content Overlay */}
              <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-10 items-center justify-center h-full">
                {/* Gambar Profil */}
                <div
                  className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-lg
                                transform transition-transform duration-500 hover:scale-105"
                >
                  <Image src={char.image} alt={char.name} layout="fill" objectFit="cover" />
                </div>

                {/* Detail Profil */}
                <div className="flex-grow text-center md:text-left max-w-2xl">
                  <h2
                    className="text-5xl md:text-6xl font-extrabold text-white mb-2 drop-shadow-md
                                 group-hover:text-yellow-300 transition-colors duration-300"
                  >
                    {char.name}
                  </h2>
                  <p className="text-xl text-yellow-300 font-semibold mb-6 group-hover:text-pink-300 transition-colors duration-300">{char.role}</p>

                  <div className="prose prose-invert prose-lg text-gray-200 leading-relaxed mb-8">
                    <div dangerouslySetInnerHTML={{ __html: char.bio }} />
                  </div>

                  {/* Highlights */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-300 transition-colors duration-300">Sorotan Karir:</h3>
                  <ul className="list-disc list-inside text-gray-300 text-lg mb-8 space-y-2">
                    {char.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex items-center group-hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-pink-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Filmografi Preview */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-300 transition-colors duration-300">Filmografi Singkat:</h3>
                  <ul className="text-gray-300 text-lg mb-8 space-y-2">
                    {char.filmographyPreview.map((film, fIndex) => (
                      <li key={fIndex} className="group-hover:text-white transition-colors duration-300">
                        <strong>{film.title}</strong> - {film.role} ({film.type})
                      </li>
                    ))}
                  </ul>

                  {/* Social Media/Link Profile */}
                  <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                    {char.instagram && <SocialIconLink href={char.instagram} icon="/icons/instagram.svg" label="Instagram" />}
                    {char.x && <SocialIconLink href={char.x} icon="/icons/x.svg" label="X" />}
                    {char.imdb && <SocialIconLink href={char.imdb} icon="/icons/imdb.svg" label="IMDb" />}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

// Komponen Pembantu untuk Link Sosial Media dengan Ikon
function SocialIconLink({ href, icon, label }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center bg-gray-800 p-3 rounded-lg shadow-md
                 hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
      title={label}
    >
      <Image src={icon} alt={label} width={24} height={24} className="mr-2" />
      <span className="text-white font-medium hidden sm:inline">{label}</span>
    </Link>
  );
}
