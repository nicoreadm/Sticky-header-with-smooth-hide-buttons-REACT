"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../styles/Header.css";

export function Header() {
  const [hideButtons, setHideButtons] = useState(false);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHideButtons(true);
      } else if (currentScrollY < lastScrollY.current) {
        setHideButtons(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link href="/" className="header-logo">
          SHAMSIEL
        </Link>

        {/* Navigation Buttons */}
        <nav className="header-nav">
          <div
            className={`header-nav-buttons ${hideButtons ? "buttons-hidden" : ""}`}
          >
            <Link href="/comprar" className="header-nav-button">
              Comprar
            </Link>
            <Link href="/alquilar" className="header-nav-button">
              Alquilar
            </Link>
            <Link href="/vender" className="header-nav-button">
              Vender
            </Link>
          </div>
          {/* -------------------------------------- */}

          {/* Login Button */}
          <Link href="/login" className="header-login-button">
            Iniciar Sesión
          </Link>
        </nav>
      </div>
    </header>
  );
}
