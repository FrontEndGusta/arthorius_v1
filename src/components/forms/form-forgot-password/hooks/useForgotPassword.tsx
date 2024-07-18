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
import { useEmail } from "@/context/EmailContext";

const FormSchemaForgotPassword = z.object({
  email: z.string().email(dialogLexicon.ERROR_MESSAGES.email),
});

const useForgotPassword = (onTabChange?: (changeTab: string) => void) => {
  const formForgotPassword = useForm({
    resolver: zodResolver(FormSchemaForgotPassword),
    defaultValues: {
      email: "",
    },
  });
  const { email, setEmail } = useEmail();
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({ mutationFn: onSubmitForgotPassword });

  async function onSubmitForgotPassword(
    values: z.infer<typeof FormSchemaForgotPassword>
  ) {
    try {
      const response = await axios.post("/api/auth/forgot-password", values);
      const statusCode = response?.data?.status || response?.status;

      if (statusCode === 201 || statusCode === 200) {
        toast({
          title: dialogLexicon.SUCCESS_MESSAGES.forgotPasswordSuccess,
        });

        setEmail(values.email);
        if (onTabChange) onTabChange(changeTab?.forgotPasswordToCode);
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
        "Ocorreu um erro ao enviar o email. Por favor, tente novamente.";
      toast({
        variant: "destructive",
        title: dialogLexicon.ERROR_MESSAGES.codeError,
        description: errorMessage,
      });
    }
  }

  return {
    isPending: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    formForgotPassword,
    isLoading: mutation.isPending,
    email,
    onSubmitForgotPassword,
  };
};

export default useForgotPassword;
