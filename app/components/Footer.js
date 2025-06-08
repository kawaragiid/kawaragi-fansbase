// app/components/Footer.js
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Pastikan ini tetap ada untuk menghindari hydration error
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative w-full bg-black text-gray-300 py-16 px-6 sm:px-12 lg:px-24 overflow-hidden"> {/* PY ditingkatkan */}
      {/* Background Gambar di bagian bawah dengan Opacity */}
      <div className="absolute inset-x-0 bottom-0 h-full">
        <Image
          src="/kawaragi-footer-bg.jpg" // Ganti dengan nama file gambar footer kamu
          alt="Kawaragi Senju background"
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
          quality={70}
          className="opacity-75"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Konten Utama Footer */}
      <div className="relative z-10 container mx-auto grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-10"> {/* Gap X & Y ditingkatkan */}
        {/* Kolom 1: Logo, Deskripsi, Newsletter */}
        <div className="flex flex-col space-y-6"> {/* space-y ditingkatkan */}
          <Link href="/" className="flex items-center space-x-3 text-white text-3xl font-extrabold font-sans tracking-wide"> {/* space-x logo ditingkatkan */}
            <Image
              src="/kawaragi-logo.png"
              alt="Kawaragi Fansbase Logo"
              width={48} // Lebar logo sedikit diperbesar
              height={48} // Tinggi logo sedikit diperbesar
              priority
            />
            <span className="text-white">Kawaragi</span><span className="text-yellow-200">Fans</span>
          </Link>
          <p className="text-base leading-relaxed"> {/* ukuran teks & line-height ditingkatkan */}
            Tempat berkumpulnya para penggemar Kawaragi Senju, berbagi informasi dan keseruan.
            Bergabunglah bersama kami untuk update terbaru dan konten eksklusif!
          </p>
          <div className="pt-6"> {/* padding-top ditingkatkan */}
            <h4 className="text-xl font-semibold text-white mb-4">Join our newsletter</h4> {/* ukuran teks & margin-bottom ditingkatkan */}
            <div className="flex flex-col sm:flex-row gap-3"> {/* gap ditingkatkan */}
              <input
                type="email"
                placeholder="name@email.com"
                className="flex-grow p-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600" // padding ditingkatkan
              />
              <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-4 px-7 rounded-lg transition-colors"> {/* padding ditingkatkan */}
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Kolom 2: Links */}
        <div className="md:pl-6"> {/* Tambahan padding kiri untuk penataan kolom */}
          <h4 className="text-xl font-semibold text-white mb-5">Links</h4> {/* margin-bottom ditingkatkan */}
          <ul className="space-y-3"> {/* space-y ditingkatkan */}
            <li><FooterLink href="/berita">Berita</FooterLink></li>
            <li><FooterLink href="/galeri">Galeri</FooterLink></li>
            <li><FooterLink href="/karakter">Karakter</FooterLink></li>
            <li><FooterLink href="/timeline">Timeline Cerita</FooterLink></li>
            <li><FooterLink href="/faq">FAQ</FooterLink></li>
            <li><FooterLink href="/kebijakan-privasi">Kebijakan Privasi</FooterLink></li>
          </ul>
        </div>

        {/* Kolom 3: Pages */}
        <div className="md:pl-6"> {/* Tambahan padding kiri untuk penataan kolom */}
          <h4 className="text-xl font-semibold text-white mb-5">Pages</h4> {/* margin-bottom ditingkatkan */}
          <ul className="space-y-3"> {/* space-y ditingkatkan */}
            <li><FooterLink href="/">Home</FooterLink></li>
            <li><FooterLink href="/tentang">Tentang Kami</FooterLink></li>
            <li><FooterLink href="/kontak">Kontak</FooterLink></li>
            <li><FooterLink href="/sitemap">Sitemap</FooterLink></li>
            <li><FooterLink href="/events">Events</FooterLink></li>
          </ul>
        </div>

        {/* Kolom 4: Socials + Button */}
        <div className="flex flex-col justify-between md:pl-6"> {/* Tambahan padding kiri */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-5">Socials</h4> {/* margin-bottom ditingkatkan */}
            <ul className="space-y-3"> {/* space-y ditingkatkan */}
              <li><FooterLink href="https://instagram.com/kawaragi" target="_blank" rel="noopener noreferrer">Instagram</FooterLink></li>
              <li><FooterLink href="https://facebook.com/kawaragi" target="_blank" rel="noopener noreferrer">Facebook</FooterLink></li>
              <li><FooterLink href="https://twitter.com/kawaragi" target="_blank" rel="noopener noreferrer">Twitter</FooterLink></li>
              <li><FooterLink href="https://discord.gg/kawaragi" target="_blank" rel="noopener noreferrer">Discord</FooterLink></li>
            </ul>
          </div>
          <div className="mt-10 md:mt-0 self-start md:self-end"> {/* Margin top ditingkatkan, dan self-start di mobile */}
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3"> {/* padding & gap ditingkatkan */}
              Join The Community
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Copyright di bagian paling bawah */}
      <div className="relative z-10 text-center mt-16 pt-8 border-t border-gray-700"> {/* margin-top & padding-top ditingkatkan */}
        <p className="text-base text-gray-500"> {/* ukuran teks ditingkatkan */}
          &copy; {currentYear} Kawaragi Fansbase. All rights reserved. Built with ❤️ for Fans.
        </p>
      </div>
    </footer>
  );
}

function FooterLink({ href, children, target, rel }) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className="text-gray-400 text-base hover:text-pink-300 transition-colors duration-200" 
    >
      {children}
    </Link>
  );
}