"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Menu, X } from "lucide-react";
import { ModeToggle } from "../ui/modetoggle";

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-blue-500 dark:bg-blue-800 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/front/logoatt.png"
            alt="Fundação Mirim"
            width={100}
            height={100}
          />
          <h1 className="text-lg sm:text-2xl font-bold text-white whitespace-nowrap">
            <Link href={"/"}>FUNDAÇÃO MIRIM</Link>
          </h1>
        </div>

        <nav className="hidden md:flex">
          <ul className="flex gap-6 text-white font-medium">
            <li className="text-xl">
              <Link href="/" className="hover:text-blue-950">
                HOME
              </Link>
            </li>
            <li className="text-xl">
              <Link href="/Sobre" className="hover:text-blue-950">
                SOBRE
              </Link>
            </li>
            <li className="text-xl">
              <Link href="/Blog" className="hover:text-blue-950">
                BLOG
              </Link>
            </li>
            <li className="text-xl">
              <Link href="/Contatos" className="hover:text-blue-950">
                CONTATOS
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
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col gap-4 bg-blue-600 dark:bg-blue-900 p-4 rounded-lg text-white font-medium">
            <li>
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="/Sobre">SOBRE</Link>
            </li>
            <li>
              <Link href="/Blog">BLOG</Link>
            </li>
            <li>
              <Link href="/Contatos">CONTATOS</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
