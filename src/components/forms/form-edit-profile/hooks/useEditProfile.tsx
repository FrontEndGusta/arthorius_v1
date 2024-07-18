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
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const FormSchemaEditProfile = z.object({
  name: z.string().min(2, dialogLexicon.ERROR_MESSAGES.firstName),
  email: z.string().email(dialogLexicon.ERROR_MESSAGES.email),
});

const useEditProfile = () => {
  const { data: session, update } = useSession();
  const [email, setEmail] = useState(session?.user?.email || "");
  const [name, setName] = useState(session?.user?.name || "");

  const formEditProfile = useForm({
    resolver: zodResolver(FormSchemaEditProfile),
    defaultValues: {
      name: name,
      email: email,
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({ mutationFn: onSubmitEditProfile });

  async function onSubmitEditProfile(
    values: z.infer<typeof FormSchemaEditProfile>
  ) {
    try {
      const updatedValues = {
        ...values,
        email: email,
        newEmail: values.email,
      };
      const response = await axios.post(
        "/api/auth/edit-profile",
        updatedValues
      );
      const statusCode = response?.data?.status || response?.status;

      if (statusCode === 201 || statusCode === 200) {
        setEmail(updatedValues.newEmail);
        setName(updatedValues.name);
        await update({
          ...session,
          user: {
            ...session?.user,
            email: updatedValues.newEmail,
            name: updatedValues.name
          },
        });
        // formEditProfile.reset({ ...values, email: updatedValues.newEmail });
        toast({
          title: "dados atualizados com sucesso.",
        });
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
        "Ocorreu um erro ao atualizar os dados. Por favor, tente novamente.";
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
    name,
    data: mutation.data,
    formEditProfile,
    isLoading: mutation.isPending,
    onSubmitEditProfile,
  };
};

export default useEditProfile;
