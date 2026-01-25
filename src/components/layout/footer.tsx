import Image from "next/image";
import { Separator } from "../ui/separator";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-blue-500 dark:bg-blue-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-3">
            <h2 className="text-xl font-bold">Fundação Mirim</h2>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Links</h3>
            <ul className="flex flex-col gap-2 text-sm text-white/80">
              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/Sobre" className="hover:text-white">
                  Sobre
                </a>
              </li>
              <li>
                <a href="/Noticias" className="hover:text-white">
                  Noticias
                </a>
              </li>
              <li>
                <a href="/Contatos" className="hover:text-white">
                  Contatos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Contato</h3>
            <p className="text-sm text-white/80">email@exemplo.com</p>
            <p className="text-sm text-white/80">+55 (11) 99999-9999</p>

            <div className="flex gap-4 mt-4">
              <Link href={"/facebook.com"} className="hover:text-blue-950">
                <Image
                  src={"/front/facebookk.png"}
                  alt={""}
                  width={25}
                  height={25}
                />
              </Link>

              <Link href={"/instagram.com"} className="hover:text-blue-950">
                <Image
                  src={"/front/instagram-white.png"}
                  alt={""}
                  width={25}
                  height={25}
                />
              </Link>
              <Link href={"/whatsapp.com"} className="hover:text-blue-950">
                <Image
                  src={"/front/whatsapp-white.png"}
                  alt={""}
                  width={25}
                  height={25}
                />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="bg-white/30" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/70 gap-3">
          <p>
            © {new Date().getFullYear()} Fundação Mirim Araçatuba. Todos os direitos
            reservados.
          </p>
          <div className="flex items-start gap-3">
            <Link
              href="https://www.google.com/maps/place/Funda%C3%A7%C3%A3o+Mirim+de+Ara%C3%A7atuba/@-21.2078587,-50.4540556,17z/data=!3m1!4b1!4m6!3m5!1s0x9496438d48022205:0xef04667461496182!8m2!3d-21.2078637!4d-50.4514807!16s%2Fg%2F1tp30gp0?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
              aria-label="Ver endereço no Google Maps"
            >
              <Image
                src="/front/local.png"
                alt="Localização"
                width={22}
                height={22}
              />
              <span>
                R. Tibiriçá, 186 - Vila Industrial, Araçatuba - SP, 16072-005
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
