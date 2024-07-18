"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { dialogLexicon } from "@/components/forms/lexicon/pt";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const FormSchemaDialogResetPassword = z
  .object({
    password: z.string().min(6, dialogLexicon.ERROR_MESSAGES.password),
    confirmPassword: z
      .string()
      .min(6, dialogLexicon.ERROR_MESSAGES.confirmPassword),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const useDialogResetPassword = () => {
  const formDialogResetPassword = useForm({
    resolver: zodResolver(FormSchemaDialogResetPassword),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { toast } = useToast();
  const { reset } = formDialogResetPassword;
  const router = useRouter();
  const { data: session } = useSession();
  const mutation = useMutation({ mutationFn: onSubmitDialogResetPassword });
  const email = session?.user?.email;
   


  async function onSubmitDialogResetPassword(
    values: z.infer<typeof FormSchemaDialogResetPassword>
  ) {
    try {

      const response = await axios.post("/api/auth/reset-password", {
        ...values,
        email,
      });

      const statusCode = response?.data?.status || response?.status;
      if (statusCode === 201 || statusCode === 200) {
        toast({
          title: dialogLexicon.SUCCESS_MESSAGES.resetPasswordSuccess,
        });
      } else {
        const errorMessage = response?.data?.message;
        toast({
          variant: "destructive",
          title: errorMessage,
        });
      }
      reset();
      
    } catch (err: any) {
      let errorMessage =
        err.response?.data?.error ||
        "Ocorreu um erro ao redefinir a senha. Por favor, tente novamente.";
      toast({
        variant: "destructive",
        title: dialogLexicon.ERROR_MESSAGES.resetPasswordError,
        description: errorMessage,
      });
    }
    reset();
  }

  return {
    isPending: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    formDialogResetPassword,
    isLoading: mutation.isPending,
    onSubmitDialogResetPassword,
  };
};

export default useDialogResetPassword;
