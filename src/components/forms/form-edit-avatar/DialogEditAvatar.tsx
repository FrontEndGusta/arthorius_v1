"use client";
import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import useDialogEditAvatar from "./hooks/useDialogEditAvatar";

interface DialogEditAvatarFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogEditAvatarForm: React.FC<DialogEditAvatarFormProps> = ({
  setOpen,
}) => {
  const {
    formDialogEditAvatar,
    isLoading,
    handleFileChange,
    onSubmitDialogEditAvatar,
  } = useDialogEditAvatar({ setOpen });

  return (
    <Form {...formDialogEditAvatar}>
      <form
        onSubmit={formDialogEditAvatar.handleSubmit(onSubmitDialogEditAvatar)}
        className="space-y-6"
      >
        <FormField
          control={formDialogEditAvatar.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selecione sua foto de perfil</FormLabel>
              <Input
                type="file"
                required
                placeholder="selecione uma imagem"
                onChange={(e) => {
                  handleFileChange(e);
                  field.onChange(e); // Trigger the form field's onChange
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          {isLoading ? (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </Button>
          ) : (
            <Button type="submit">Enviar</Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default DialogEditAvatarForm;
