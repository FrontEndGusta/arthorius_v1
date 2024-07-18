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

const FormSchemaCode = z.object({
  code: z.string().min(6, dialogLexicon.ERROR_MESSAGES.codeError),
});

const useCodigo = (onTabChange?: (changeTab: string) => void) => {
  const formCode = useForm({
    resolver: zodResolver(FormSchemaCode),
    defaultValues: {
      code: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const { email } = useForgotPassword();
  const mutation = useMutation({ mutationFn: onSubmitCode });

  async function onSubmitCode(values: z.infer<typeof FormSchemaCode>) {
    try {
      const response = await axios.post("/api/auth/verify-code", {
        ...values,
        email,
      });
      const statusCode = response?.data?.status || response?.status;

      if (statusCode === 201 || statusCode === 200) {
        toast({
          title: dialogLexicon.SUCCESS_MESSAGES.codeVerifiedSuccess,
        });

        if (onTabChange) onTabChange(changeTab?.codeToResetPassword);
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
        "Ocorreu um erro ao verificar o código. Por favor, tente novamente.";
      toast({
        variant: "destructive",
        title: dialogLexicon.ERROR_MESSAGES.codeSendError,
        description: errorMessage,
      });
    }
  }

  return {
    isPending: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    formCode,
    isLoading: mutation.isPending,
    onSubmitCode,
  };
};

export default useCodigo;
