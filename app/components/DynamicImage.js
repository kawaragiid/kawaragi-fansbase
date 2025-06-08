// app/components/DynamicImage.js
"use client"; // Penting agar komponen ini hanya di-render di sisi klien

import Image from "next/image";

export default function DynamicImage(props) {
  // Meneruskan semua props yang diterima ke komponen Image dari Next.js
  return <Image {...props} />;
}
