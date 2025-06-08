// app/components/Navbar.js
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const DynamicImage = dynamic(() => import("./DynamicImage"), { ssr: false });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Perhitungan ambang batas scroll yang lebih dinamis atau set ke nilai pixel yang jelas
      const isScrolled = window.scrollY > 80; // Amang batas scroll 80px
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    // Navbar kini fixed, background berubah tergantung scroll
    // Transisi lebih spesifik untuk background, shadow, dan padding
    <nav
      className={`fixed w-full top-0 z-50
      ${
        scrolled ? "bg-gradient-to-r from-purple-800 via-pink-600 to-red-600 shadow-xl py-4" : "bg-transparent py-5 md:py-6" // Padding sedikit lebih besar saat transparan
      }
      transition-all duration-500 ease-in-out`}
    >
      {" "}
      {/* Durasi transisi lebih panjang dan jenis ease */}
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* Logo/Nama Fansbase */}
        <Link
          href="/"
          className="flex items-center space-x-3 text-white text-3xl font-extrabold font-sans tracking-wide drop-shadow-md
                     cursor-default focus:outline-none"
        >
          <DynamicImage src="/kawaragi-logo.png" alt="Kawaragi Fansbase Logo" width={48} height={48} priority />
          <span className="text-white">Kawaragi</span>
          <span className="text-yellow-200">Fans</span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-6">
          <NavLink href="/berita" scrolled={scrolled}>
            Berita
          </NavLink>
          <NavLink href="/galeri" scrolled={scrolled}>
            Galeri
          </NavLink>
          <NavLink href="/karakter" scrolled={scrolled}>
            Karakter
          </NavLink>
          <NavLink href="/komunitas" scrolled={scrolled}>
            Komunitas
          </NavLink>
        </div>

        {/* Tombol Hamburger untuk Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition duration-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />}
            </svg>
          </button>
        </div>
      </div>
      {/* Menu Mobile yang muncul saat hamburger diklik */}
      {isOpen && (
        <div
          className={`md:hidden mt-4 px-4 py-3 rounded-lg mx-4 transition-all duration-300 ease-in-out
          ${scrolled ? "bg-red-700" : "bg-black bg-opacity-70"}`}
        >
          <MobileNavLink href="/berita" onClick={() => setIsOpen(false)}>
            Berita
          </MobileNavLink>
          <MobileNavLink href="/galeri" onClick={() => setIsOpen(false)}>
            Galeri
          </MobileNavLink>
          <MobileNavLink href="/karakter" onClick={() => setIsOpen(false)}>
            Karakter
          </MobileNavLink>
          <MobileNavLink href="/komunitas" onClick={() => setIsOpen(false)}>
            Komunitas
          </MobileNavLink>
        </div>
      )}
    </nav>
  );
}

// Komponen untuk link Navigasi Desktop
function NavLink({ href, children, scrolled }) {
  return (
    <Link
      href={href}
      className={`text-lg font-medium relative px-3 py-2 rounded-md
                 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                 group
                 ${
                   scrolled
                     ? "text-gray-200 hover:text-white transition-colors duration-300 ease-in-out" // Jika discroll: teks abu, hover putih
                     : "text-white hover:text-yellow-200 transition-colors duration-300 ease-in-out" // Jika di atas hero: teks putih, hover kuning
                 }
                 `}
    >
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute bottom-0 left-0 w-full h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left
                 ${scrolled ? "bg-white" : "bg-yellow-200"}`}
      ></span>
    </Link>
  );
}

// Komponen untuk link Navigasi Mobile
function MobileNavLink({ href, children, onClick }) {
  return (
    <Link href={href} onClick={onClick} className="block text-white text-lg font-medium py-2 px-3 rounded-md hover:bg-white hover:bg-opacity-15 transition duration-200">
      {children}
    </Link>
  );
}
