"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "../ui/modetoggle";
import { Button } from "../ui/button";

export const Header = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
   <header className="w-full bg-blue-600 shadow-md">
  <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">

    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/front/logoatt.png"
        alt="Fundação Mirim Araçatuba"
        width={60}
        height={60}
        priority
        className="object-contain"
      />

      <div className="flex flex-col leading-tight">
        <h1 className="text-lg sm:text-2xl font-bold text-white whitespace-nowrap">
          Fundação Mirim
        </h1>
        <span className="text-sm text-blue-100">
          Araçatuba
        </span>
      </div>
    </Link>

    <nav className="hidden md:block">
      <ul className="flex gap-8 text-white font-semibold text-lg">
        <li>
          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>
        </li>
        <li>
          <Link href="/Sobre" className="hover:text-gray-300 transition">
            Sobre
          </Link>
        </li>
        <li>
          <Link href="/Blog" className="hover:text-gray-300 transition">
            Blog
          </Link>
        </li>
        <li>
          <Link href="/Contatos" className="hover:text-gray-300 transition">
            Contato
          </Link>
        </li>
      </ul>
    </nav>

    <button
      className="md:hidden text-white"
      onClick={() => setOpen(!open)}
      aria-label="Abrir menu"
      aria-expanded={open}
    >
      {open ? <X size={28} /> : <Menu size={28} />}
    </button>
  </div>

 {open && (
  <div
    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
    onClick={closeMenu}
  />
)}

<div
  className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
    open ? "translate-x-0" : "translate-x-full"
  }`}
>

  <div className="flex items-center justify-between p-4 border-b">
    <h2 className="font-bold text-lg text-blue-600">
      Menu
    </h2>

    <button onClick={closeMenu}>
      <X size={26} className="text-gray-600 hover:text-red-500 transition" />
    </button>
  </div>


  <nav className="flex flex-col p-6 gap-6 text-gray-700 font-medium text-lg">
    <Link
      href="/"
      onClick={closeMenu}
      className="hover:text-blue-600 hover:translate-x-2 transition-all duration-200"
    >
      Home
    </Link>

    <Link
      href="/Sobre"
      onClick={closeMenu}
      className="hover:text-blue-600 hover:translate-x-2 transition-all duration-200"
    >
      Sobre
    </Link>

    <Link
      href="/Blog"
      onClick={closeMenu}
      className="hover:text-blue-600 hover:translate-x-2 transition-all duration-200"
    >
      Blog
    </Link>

    <Link
      href="/Contatos"
      onClick={closeMenu}
      className="hover:text-blue-600 hover:translate-x-2 transition-all duration-200"
    >
      Contato
    </Link>
  </nav>
</div>
</header>

  );
};
