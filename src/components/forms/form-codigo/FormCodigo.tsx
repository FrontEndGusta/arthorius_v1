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
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useCodigo from "./hooks/useCodigo";

interface FormCodigoProps {
  onTabChange: (value: string) => void;
}

const FormCodigo: React.FC<FormCodigoProps> = ({ onTabChange }) => {
  const { formCode, isLoading, onSubmitCode } = useCodigo((changeTab) =>
    onTabChange(changeTab)
  );

  return (
    <>
      <TabsContent value="formCodigo">
        <Card>
          <CardHeader>
            <Form {...formCode}>
              <form
                onSubmit={formCode.handleSubmit(onSubmitCode)}
                className="space-y-6"
              >
                <FormField
                  control={formCode.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insira o código</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Digite o código recebido por e-mail
                      </FormDescription>
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
                  <span className="text-[#7C3AED] dark:text-[#F9FAFB]"
                    onClick={() => onTabChange("recuperarSenha")}
                    style={{ cursor: "pointer" }}
                  >
                    Voltar
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

export default FormCodigo;
