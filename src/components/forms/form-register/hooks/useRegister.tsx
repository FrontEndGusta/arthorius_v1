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

const FormSchemaRegister = z
  .object({
    name: z.string().min(2, dialogLexicon.ERROR_MESSAGES.firstName),
    lastname: z.string().min(2, dialogLexicon.ERROR_MESSAGES.lastName),
    department: z.string({
      required_error: "Please select an locale to display.",
    }),
    email: z.string().email(dialogLexicon.ERROR_MESSAGES.email),
    password: z.string().min(6, dialogLexicon.ERROR_MESSAGES.password),
    confirmPassword: z
      .string()
      .min(6, dialogLexicon.ERROR_MESSAGES.confirmPassword),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const useRegister = (onTabChange?: (changeTab: string) => void) => {
  const formRegister = useForm({
    resolver: zodResolver(FormSchemaRegister),
    defaultValues: {
      name: "",
      lastname: "",
      department: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({ mutationFn: onSubmitRegister });

  async function onSubmitRegister(values: z.infer<typeof FormSchemaRegister>) {
    try {
      const response = await axios.post("/api/auth/register", values);
      const statusCode = response?.data?.status || response?.status;
      if (statusCode === 201 || statusCode === 200) {
        toast({
          title: dialogLexicon.SUCCESS_MESSAGES.registerSuccess,
        });

        if (onTabChange) onTabChange(changeTab?.registerOrresetPasswordToLogin);
      } else {
        const errorMessage = response?.data?.message || dialogLexicon.ERROR_MESSAGES.registerError
        toast({
          variant: "destructive",
          title: errorMessage,
        });
      }
    } catch (err: any) {
        let errorMessage =
        err.response?.data?.error ||
        "Ocorreu um erro ao enviar ao registro. Por favor, tente novamente.";

      toast({
        variant: "destructive",
        title: dialogLexicon.ERROR_MESSAGES.registerError,
        description: errorMessage,
      });
    }
  }

  return {
    isPending: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    formRegister,
    isLoading: mutation.isPending,
    onSubmitRegister,
  };
};

export default useRegister;
