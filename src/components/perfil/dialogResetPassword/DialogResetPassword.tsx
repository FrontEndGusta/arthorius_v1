import DialogResetPasswordForm from "@/components/forms/form-dialog-reset-password/DialogResetPassword";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogResetPassword() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">Redefinir senha</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crie uma nova senha</DialogTitle>
          <DialogDescription>
            A senha deve conter pelo menos 6 caracteres.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DialogResetPasswordForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogResetPassword;
