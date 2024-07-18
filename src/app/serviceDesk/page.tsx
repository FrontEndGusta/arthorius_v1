"use client";
import ServiceDeskForm from "@/components/forms/form-service-desk/ServiceDesk";
import LayoutAdmin from "@/components/LayoutAdmin";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Page() {
  return (
    <LayoutAdmin>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Criar</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] sm:max-h-[700px] overflow-hidden	overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500">
            <DialogHeader>
              <DialogTitle>Criar chamado</DialogTitle>
              <DialogDescription>Make changes</DialogDescription>
            </DialogHeader>
            <ServiceDeskForm />
          </DialogContent>
        </Dialog>
      </div>
    </LayoutAdmin>
  );
}
