"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import EditProfileForm from "../../forms/form-edit-profile/editProfile";
import useSheetMenu from "./hooks/useSheetMenu";
import { Separator } from "@/components/ui/separator";
import DialogEditAvatar from "../dialogEditAvatar/dialogEditAvatar";
import useAvatar from "@/utils/useAvatar";
export function SheetSide() {
  const { avatar } = useAvatar();
  return (
    <div className="grid gap-2 cursor-pointer">
      <Sheet key={"left"}>
        <SheetTrigger asChild>
          <Avatar>
            <AvatarImage
              src={avatar ? avatar : "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className="flex-row gap-2 items-center">
            <Avatar>
              <AvatarImage
                src={avatar ? avatar : "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div>
                <SheetTitle>Editar Perfil</SheetTitle>
                <Separator className="my-1" />
              </div>

              <div>
                <DialogEditAvatar />
              </div>
            </div>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <EditProfileForm />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
