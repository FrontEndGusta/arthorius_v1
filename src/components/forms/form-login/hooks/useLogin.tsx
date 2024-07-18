"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { dialogLexicon } from "@/components/forms/lexicon/pt";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const FormSchemaLogin = z.object({
  email: z.string().email(dialogLexicon.ERROR_MESSAGES.email),
  password: z.string().min(6, dialogLexicon.ERROR_MESSAGES.password),
});

const useLogin = (onTabChange?: (changeTab: string) => void) => {

  const formLogin = useForm({
    resolver: zodResolver(FormSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({ mutationFn: onSubmitLogin })

  async function onSubmitLogin(values: z.infer<typeof FormSchemaLogin>) {
    try {
      const response = await signIn("Credentials", {
        ...values,
        redirect: false,
      });
      toast({
        title: dialogLexicon.SUCCESS_MESSAGES.loginSuccess,
      });
      if (response && !response.error) {
        router.push("dashboard");
      } else {
        toast({
          variant: "destructive",
          title: dialogLexicon.ERROR_MESSAGES.loginError,
          description: response?.error || "Ocorreu um erro inesperado.",
          
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ocorreu um erro inesperado.";
      toast({
        variant: "destructive",
        title: dialogLexicon.ERROR_MESSAGES.loginError,
        description: errorMessage,
      });
    }
  }

  return {
    isPending: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    formLogin,
    isLoading: mutation.isPending,
    onSubmitLogin,
  };
};

export default useLogin;
