"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { dialogLexicon } from "@/components/forms/lexicon/pt";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const FormSchemaServiceDesk = z.object({
  name: z.string({
    required_error: "O campo precisa ser preenchido.",
  }),
  locale: z.string({
    required_error: "O campo precisa ser preenchido.",
  }),
  priority: z.string({
    required_error: "O campo precisa ser preenchido.",
  }),
  summary: z.string({
    required_error: "O campo precisa ser preenchido.",
  }),
  category: z.string({
    required_error: "O campo precisa ser preenchido.",
  }),
  type: z.string({
    required_error: "O campo precisa ser preenchido.",
  }),
  item: z.string({
    required_error: "O campo precisa ser preenchido.",
  }),
  telephone: z.string().min(6, dialogLexicon.ERROR_MESSAGES.telephoneError),
  department: z.string().min(1),
});

const useServiceDesk = () => {
  
  const formServiceDesk = useForm({
    resolver: zodResolver(FormSchemaServiceDesk),
    defaultValues: {
      name: "",
      locale: "",
      priority: "",
      telephone: "",
      department: "",
      summary: "",
      category: "",
      item: "",
      type: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const { reset, setValue, watch } = formServiceDesk;
  const selectedName = watch("name");
  const selectedItem = watch("item");
  const selectedType = watch("type");

  const mutation = useMutation({ mutationFn: onSubmitServiceDesk });

  async function onSubmitServiceDesk(
    values: z.infer<typeof FormSchemaServiceDesk>
  ) {
    try {
      const response = await axios.post(
        "/api/auth/service-desk-tickets",
        values
      );
      const statusCode = response?.data?.status || response?.status;
      if (statusCode === 201 || statusCode === 200) {
        toast({
          title: dialogLexicon.SUCCESS_MESSAGES.serviceDeskSuccess,
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
        "Ocorreu um erro ao criar o chamado. Por favor, tente novamente.";
      toast({
        variant: "destructive",
        title: dialogLexicon.ERROR_MESSAGES.serviceDesksendError,
        description: errorMessage,
      });
    }
  }

  async function getUsers() {
    try {
      const response = await axios.get("/api/auth/get-users");
      return response.data.data || null;
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
      return null;
    }
  }
  
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    initialData: null,
  });

  //setar o valor de department de acordo com o nome
  useEffect(() => {
    if (users && selectedName) {
      const selectedUser = users.find((user: { name: string; }) => user.name === selectedName);
      if (selectedUser) {
        setValue("department", selectedUser.department);
      }
    }
    if (selectedType && selectedItem) {
      const summaryText = `${selectedItem} / ${selectedType}`
      setValue("summary", summaryText)
    } 
  }, [selectedName, users, selectedType, selectedItem, setValue]);

  return {
    isPending: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    formServiceDesk,
    isLoading: mutation.isPending,
    users,
    onSubmitServiceDesk,
  };
};

export default useServiceDesk;
