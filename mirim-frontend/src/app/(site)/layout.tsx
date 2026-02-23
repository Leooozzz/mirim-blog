import { ContactHeader } from "@/components/layout/contactHeader";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ContactHeader />
      <header>
        <Header />
      </header>
      <main className="w-full mx-auto">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
