// app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";
import NavbarWrapper from "./components/NavbarWrapper"; // Import NavbarWrapper
import Footer from "./components/Footer";
import FloatingDonateButton from "./components/FloatingDonateButton";
import { AuthProvider } from "./lib/firebase/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kawaragi Fansbase",
  description: "Tempat berkumpulnya penggemar Kawaragi Senju",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          <NavbarWrapper /> {/* Gunakan NavbarWrapper di sini */}
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingDonateButton />
        </AuthProvider>
      </body>
    </html>
  );
}
