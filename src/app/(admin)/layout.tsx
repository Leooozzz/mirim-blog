import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

import { Footer } from "@/components/layout/footer";
import { ModeToggle } from "@/components/ui/modetoggle";
import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/actions/auth.admin";
import AppSidebar from "@/components/app-sidebar";


export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="flex min-h-svh flex-col">
        <header className="w-full bg-blue-500 dark:bg-blue-900 px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-white" />

              <Image
                src="/front/logoatt.png"
                alt="Fundação Mirim"
                width={40}
                height={40}
              />

              <h1 className="text-lg sm:text-2xl font-bold text-white whitespace-nowrap">
                <Link href="/">Administrador</Link>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <ModeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 p-0 overflow-auto">
          {children}
          <Footer />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
