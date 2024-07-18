"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ReloadIcon } from "@radix-ui/react-icons";
import useEditProfile from "./hooks/useEditProfile";
import DialogResetPassword from "@/components/perfil/dialogResetPassword/DialogResetPassword";

const EditProfileForm: React.FC = () => {
  const { formEditProfile, isLoading, name, onSubmitEditProfile } =
    useEditProfile();

  return (
    <>
      <Form {...formEditProfile}>
        <form
          onSubmit={formEditProfile.handleSubmit(onSubmitEditProfile)}
          className="space-y-6"
        >
          <FormField
            control={formEditProfile.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <Input type="text" required placeholder="nome" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formEditProfile.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  required
                  placeholder="example@example.com"
                  {...field}
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
              <Button type="submit" className="w-full">Enviar</Button>
            )}
          </div>
        </form>
      </Form>
      <div className="flex justify-end"> <DialogResetPassword /></div>
     
    </>
  );
};

export default EditProfileForm;
