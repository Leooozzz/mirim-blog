import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

import { Footer } from "@/components/layout/footer";
import { ModeToggle } from "@/components/ui/modetoggle";
import Link from "next/link";
import { requireAdmin } from "@/actions/authAdmin";
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
              <SidebarTrigger className="text-white md:hidden" />

              <h1 className="text-lg sm:text-2xl font-bold text-white whitespace-nowrap">
                <Link href="/admin">Painel Administrador</Link>
              </h1>
            </div>

           
          </div>
        </header>

        <main className="flex-1 p-0 overflow-auto">
          {children}
          
        </main>
        <footer>
          <Footer/>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
