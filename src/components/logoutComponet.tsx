"use client"

import { LogOut } from "lucide-react"
import { DropdownMenuItem } from "./ui/dropdown-menu"
import { logout } from "@/actions/logout"

export const LogoutComponent = () => {
  return (
    <DropdownMenuItem
      onClick={() => logout()}
      className="text-red-600 flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      Deslogar
    </DropdownMenuItem>
  )
}
