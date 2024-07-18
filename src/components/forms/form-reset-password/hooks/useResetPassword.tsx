"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { dialogLexicon } from "@/components/forms/lexicon/pt";
import { useRouter } from "next/navigation";
import changeTab from "@/utils/changeTab";
import useForgotPassword from "../../form-forgot-password/hooks/useForgotPassword";
import { useEffect } from "react";
import { useEmail } from "@/context/EmailContext";

const FormSchemaResetPassword = z
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

const useResetPassword = (onTabChange?: (changeTab: string) => void) => {
  const formResetPassword = useForm({
    resolver: zodResolver(FormSchemaResetPassword),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const {email} = useEmail()
  const mutation = useMutation({ mutationFn: onSubmitResetPassword });

  async function onSubmitResetPassword(
    values: z.infer<typeof FormSchemaResetPassword>
  ) {
    try {
      const response = await axios.post("/api/auth/reset-password", {...values, email});
      const statusCode = response?.data?.status || response?.status;

      if (statusCode === 201 || statusCode === 200) {
        toast({
          title: dialogLexicon.SUCCESS_MESSAGES.resetPasswordSuccess,
        });

        if (onTabChange) onTabChange(changeTab?.registerOrresetPasswordToLogin);
      } else {
        const errorMessage = response?.data?.message;
        toast({
          variant: "destructive",
          title: errorMessage,
        });
      }
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
  }

  return {
    isPending: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    formResetPassword,
    isLoading: mutation.isPending,
    onSubmitResetPassword,
  };
};

export default useResetPassword;
