import { FilePlus, FolderPlus, Home, HomeIcon, LayoutList, List, MenuIcon, UserCog, Users } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { IconProfile } from "./iconProfile";



const items = [
  {
    title: "Menu principal",
    url: "/admin",
    icon: MenuIcon,
  },
  {
    title: "Criar post",
    url: "/admin/criar-post",
    icon: FilePlus,
  },
  {
    title: "Listar posts",
    url: "/admin/listar-post",
    icon: List,
  },
  {
    title: "Criar categoria",
    url: "/admin/categorias",
    icon: FolderPlus,
  },
  {
    title: "Listar categorias",
    url: "/admin/listar-categorias",
    icon: LayoutList,
  },
  {
    title: "Administradores",
    url: "/admin/administradores",
    icon: Users,
  },
  {
    title: "Voltar ao site",
    url: "/",
    icon: HomeIcon
  }
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-10 mt-10">
            <Image src={"/front/logoatt.png"} alt={""} width={70} height={70}/>
            <h1 className="text-xl">Fundação Mirim</h1>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator/>
      <div className="p-3">
           <IconProfile />   
      </div>
    </Sidebar>
  );
}
