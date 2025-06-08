// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      // Tambahkan domain lain jika Anda menggunakan CDN atau host gambar lain
      // Contoh: 'via.placeholder.com'
    ],
    // Anda juga bisa menggunakan remotePatterns untuk kontrol lebih detail
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'firebasestorage.googleapis.com',
    //     port: '',
    //     pathname: '/v0/b/**'
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: '*.appspot.com',
    //   }
    // ],
  },
  // ... sisa konfigurasi nextConfig Anda (jika ada)
};

export default nextConfig; // <<< PERHATIKAN PERUBAHAN DI SINI
