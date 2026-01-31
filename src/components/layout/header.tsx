"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "../ui/modetoggle";

export const Header = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="w-full bg-blue-500 dark:bg-blue-950">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/front/logoatt.png"
            alt="Fundação Mirim"
            width={60}
            height={60}
            priority
          />
          <h1 className="text-lg sm:text-2xl font-bold text-white whitespace-nowrap">
            Fundação Mirim
          </h1>
        </Link>

        <nav className="hidden md:flex">
          <ul className="flex gap-6 text-white font-bold text-lg">
            <li>
              <Link href="/" className="hover:text-blue-800">
                Home
              </Link>
            </li>
            <li>
              <Link href="/Sobre" className="hover:text-blue-800">
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/Blog" className="hover:text-blue-800">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/Contatos" className="hover:text-blue-800">
                Contato
              </Link>
            </li>
          </ul>
        </nav>

     
        <div className="flex items-center gap-3">
          <ModeToggle />

          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

     
      {open && (
        <nav className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4 bg-blue-600 dark:bg-blue-900 p-4 rounded-lg text-white font-bold text-center">
            <li>
              <Link href="/" onClick={closeMenu}>
                HOME
              </Link>
            </li>
            <li>
              <Link href="/Sobre" onClick={closeMenu}>
                SOBRE
              </Link>
            </li>
            <li>
              <Link href="/Blog" onClick={closeMenu}>
                BLOG
              </Link>
            </li>
            <li>
              <Link href="/Contatos" onClick={closeMenu}>
                CONTATOS
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
