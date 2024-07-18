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
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import useDialogResetPassword from "./hooks/useDialogResetPassword";

const DialogResetPasswordForm: React.FC = () => {
  const { formDialogResetPassword, isLoading, onSubmitDialogResetPassword } = useDialogResetPassword();

  return (
    <>
        <Form {...formDialogResetPassword}>
          <form
            onSubmit={formDialogResetPassword.handleSubmit(onSubmitDialogResetPassword)}
            className="space-y-6"
          >

            <FormField
              control={formDialogResetPassword.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <Input
                    type="password"
                    required
                    placeholder="senha"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formDialogResetPassword.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmação de senha</FormLabel>
                  <Input
                    type="password"
                    required
                    placeholder="confirme a senha"
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
                  Redefinindo...
                </Button>
              ) : (
                <Button type="submit">Redefinir senha</Button>
              )}
            </div>
          </form>
        </Form>
        </>
  );
};

export default DialogResetPasswordForm;
