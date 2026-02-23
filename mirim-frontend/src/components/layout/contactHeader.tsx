import Link from "next/link";
import Image from "next/image";

export const ContactHeader = () => {
  return (
    <header >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <div className="md:flex gap-4 items-center hidden ">
          <Link
            href="https://www.facebook.com/fundacaomirimdearacatubaoficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/front/facebook-black.png"
              alt="Facebook"
              width={15}
              height={15}
              className="dark:hidden"
            />
            <Image
              src="/front/facebookk.png"
              alt="Facebook"
              width={15}
              height={15}
              className="hidden dark:inline"
            />
          </Link>

          <Link
            href="https://www.instagram.com/fundacaomirimaracatuba/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/front/instagram-black.png"
              alt="Instagram"
              width={15}
              height={15}
              className="dark:hidden"
            />
            <Image
              src="/front/instagram-white.png"
              alt="Instagram"
              width={15}
              height={15}
              className="hidden dark:inline"
            />
          </Link>

          <Link
            href="https://wa.me/5518992033059"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/front/whatsapp-black.png"
              alt="WhatsApp"
              width={15}
              height={15}
              className="dark:hidden"
            />
            <Image
              src="/front/whatsapp-white.png"
              alt="WhatsApp"
              width={15}
              height={15}
              className="hidden dark:inline"
            />
          </Link>
        </div>

        <div className="flex items-center gap-2 text-sm transition text-center">
          <Link
            href="https://www.google.com/maps/place/Funda%C3%A7%C3%A3o+Mirim+de+Ara%C3%A7atuba/@-21.2078587,-50.4540556,17z/data=!3m1!4b1!4m6!3m5!1s0x9496438d48022205:0xef04667461496182!8m2!3d-21.2078637!4d-50.4514807!16s%2Fg%2F1tp30gp0?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver endereço no Google Maps"
            className="flex items-center gap-2"
          >
            <Image
              src="/front/pin-black.png"
              alt="Localização"
              width={15}
              height={15}
              className="dark:hidden"
            />
            <Image
              src="/front/local.png"
              alt="Localização"
              width={15}
              height={15}
              className="hidden dark:inline"
            />
            <span className="text-sm">
              R. Tibiriçá, 186 - Vila Industrial, Araçatuba - SP, 16072-005
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
