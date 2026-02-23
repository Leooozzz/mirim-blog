import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";

const anoFundacao = 1949;
const anoAtual = new Date().getFullYear();

const anosFundacao = anoAtual - anoFundacao;
export const Footer = () => {
  return (
    <footer className="w-full bg-blue-600  text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Fundação Mirim</h2>
            <p className="text-sm text-white/80">
              Há mais de {anosFundacao} anos capacitando e inserindo adolescentes no mercado
              de trabalho. Uma instituição filantrópica dedicada ao futuro dos
              jovens de Araçatuba.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Links</h3>
            <ul className="flex flex-col gap-2 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/Sobre" className="hover:text-white transition">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/Blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/Contatos" className="hover:text-white transition">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Contato</h3>
            <p className="text-sm text-white/80">fundacaomirimata@terra.com</p>
            <p className="text-sm text-white/80">+55 (18) 99203-3059</p>

            <div className="flex gap-4 mt-4">
              <Link
                href="https://www.facebook.com/fundacaomirimdearacatubaoficial"
                target="_blank"
                aria-label="Facebook"
              >
                <Image
                  src="/front/facebookk.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </Link>

              <Link
                href="https://www.instagram.com/fundacaomirimaracatuba/"
                target="_blank"
                aria-label="Instagram"
              >
                <Image
                  src="/front/instagram-white.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </Link>

              <Link
                href="https://wa.me/5518992033059"
                target="_blank"
                aria-label="WhatsApp"
              >
                <Image
                  src="/front/whatsapp-white.png"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="bg-white/30" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Fundação Mirim Araçatuba. Todos os
            direitos reservados.
          </p>

          <Link
            href="https://www.google.com/maps/place/Funda%C3%A7%C3%A3o+Mirim+de+Ara%C3%A7atuba/@-21.2078637,-50.4514807,17z/data=!3m1!4b1!4m6!3m5!1s0x9496438d48022205:0xef04667461496182!8m2!3d-21.2078637!4d-50.4514807!16s%2Fg%2F1tp30gp0?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/80 hover:text-white transition text-center md:text-left"
            aria-label="Ver endereço no Google Maps"
          >
            <Image
              src="/front/local.png"
              alt="Localização"
              width={20}
              height={20}
            />
            <span>R. Tibiriçá, 186 - Vila Industrial, Araçatuba - SP</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
