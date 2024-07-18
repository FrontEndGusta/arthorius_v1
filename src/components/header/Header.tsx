"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";

import {
  ExitIcon,
  MoonIcon,
  SunIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { SheetSide } from "../perfil/sheetMenu/SheetMenu";
import { NavigationMenuDemo } from "../navigation/Navigation";

export default function Header() {
  const { data: session } = useSession();
  const { setTheme } = useTheme();

  const userName: string = session?.user?.name
    ? session.user.name.split(" ")[0]
    : "Guest";

  return (
    <div className="flex gap-4 p-2 pr-10 flex-wrap justify-end ">
      {session && (
        <div className="flex-grow px-2 flex items-center gap-2">
          <SheetSide />
          <span className="font-medium	text-sm/[14px]">{`Olá, ${userName}`}</span>
          <NavigationMenuDemo />
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="hidden md:flex">
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Modo claro
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Modo escuro
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {session && (
        <>
          <div className="hidden md:flex">
            <Button variant="outline" size="icon" onClick={() => signOut()}>
              <ExitIcon />
            </Button>
          </div>
          <div className="flex sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <HamburgerMenuIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <span className="flex gap-1 items-center">
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90" />
                    Modo Claro
                  </span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <span className="flex gap-1 items-center">
                    <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-all dark:rotate-0 dark:scale-100" />
                    Modo Escuro
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <span className="flex gap-1 items-center">
                    <ExitIcon /> Sair
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </div>
  );
}
