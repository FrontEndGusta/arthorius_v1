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
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ReloadIcon } from "@radix-ui/react-icons";
import useForgotPassword from "./hooks/useForgotPassword";

interface ForgotPasswordFormProps {
  onTabChange: (value: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onTabChange,
}) => {
  const { formForgotPassword, isLoading, onSubmitForgotPassword } = useForgotPassword(
    (changeTab) => onTabChange(changeTab)
  );

  return (
    <>
      <TabsContent value="recuperarSenha">
        <Card>
          <CardHeader>
            <CardTitle>Recuperar senha</CardTitle>
            <CardDescription>
              Insira seu e-mail para receber o código de confirmação.
            </CardDescription>
          </CardHeader>
          <CardHeader>
            <Form {...formForgotPassword}>
              <form
                onSubmit={formForgotPassword.handleSubmit(onSubmitForgotPassword)}
                className="space-y-6"
              >
                <FormField
                  control={formForgotPassword.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
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
                    <Button type="submit">Enviar</Button>
                  )}
                </div>
                <CardDescription>
                  Voltar para{" "}
                  <span className="text-[#7C3AED] dark:text-[#F9FAFB]"
                    onClick={() => onTabChange("entrar")}
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </span>
                </CardDescription>
              </form>
            </Form>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
};

export default ForgotPasswordForm;
