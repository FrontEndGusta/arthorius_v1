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
import useResetPassword from "./hooks/useResetPassword";

interface ResetPasswordFormProps {
  onTabChange: (value: string) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onTabChange }) => {
  const { formResetPassword, isLoading, onSubmitResetPassword } = useResetPassword((changeTab) =>
    onTabChange(changeTab)
  );

  return (
    <Card>
      <CardHeader>
      <CardTitle>Digite a sua nova senha</CardTitle>
        <CardDescription>
          A senha deve conter pelo menos 6 caracteres.
        </CardDescription>
      </CardHeader>
      <CardHeader>
        <Form {...formResetPassword}>
          <form
            onSubmit={formResetPassword.handleSubmit(onSubmitResetPassword)}
            className="space-y-6"
          >

            <FormField
              control={formResetPassword.control}
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
              control={formResetPassword.control}
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
      </CardHeader>
    </Card>
  );
};

export default ResetPasswordForm;
