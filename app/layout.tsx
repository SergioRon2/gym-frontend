"use client";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import layoutStyle from "../styles/layout.module.css";
import HeadLinks from "../components/head-links";
import LoadingSpinner from "@/components/loading";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  // Simular un tiempo de carga ficticio para propósitos de demostración
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <HeadLinks />
      <body className={inter.className}>
        <div className={layoutStyle.container}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className={layoutStyle.navbar}>
                <Navbar />
              </div>
              <div className={layoutStyle.flex}>{children}</div>
            </>
          )}
        </div>
      </body>
    </html>
  );
}
