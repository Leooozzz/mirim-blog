"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { LogoutComponent } from "./logoutComponet"


type Props = {
  user: {
    name: string
    email:string
  }
}

export const IconProfileClient = ({ user }: Props) => {
  const firstName = user.name.split(" ")[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {firstName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm font-medium">{user.name}</span>
            <div className="flex gap-3">
              <span className="text-xs text-muted-foreground">
              {user.email}
            </span>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40">
        <LogoutComponent />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
