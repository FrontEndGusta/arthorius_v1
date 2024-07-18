import DialogEditAvatarForm from "@/components/forms/form-edit-avatar/DialogEditAvatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export const DialogEditAvatar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span
          className="text-[#7C3AED] dark:text-[#F9FAFB] text-sm/[14px] "
          style={{ cursor: "pointer" }}
        >
          Editar foto
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atualize sua foto de perfil</DialogTitle>
        </DialogHeader>
        <DialogEditAvatarForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditAvatar;
