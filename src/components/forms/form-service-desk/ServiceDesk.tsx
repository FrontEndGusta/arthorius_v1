"use client";
import React, { useEffect } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import useServiceDesk from "./hooks/useFormServiceDesk";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ServiceDeskForm: React.FC = () => {
  const { formServiceDesk, isLoading, users, onSubmitServiceDesk } =
    useServiceDesk();

  return (
    <>
      <Form {...formServiceDesk}>
        <form
          onSubmit={formServiceDesk.handleSubmit(onSubmitServiceDesk)}
          className="space-y-6"
        >
          <FormField
            control={formServiceDesk.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu nome" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users && users.length > 0 ? (
                      users.map((user: { _id: any; name: string }) => (
                        <SelectItem key={user._id} value={user.name}>
                          {user.name}
                        </SelectItem>
                      ))
                    ) : (
                      <p>Nenhum usuário encontrado</p>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formServiceDesk.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <Input
                  type="text"
                  required
                  placeholder="digite seu telefone"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formServiceDesk.control}
            name="locale"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a localidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="são joão, n: 899">são joão</SelectItem>
                    <SelectItem value="paulista gouveia, n:33">
                      paulista gouveia
                    </SelectItem>
                    <SelectItem value="jundiai, n:1000">jundiai</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formServiceDesk.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departamento</FormLabel>
                <Input
                  type="text"
                  required
                  placeholder=""
                  disabled
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formServiceDesk.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prioridade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Média">Média</SelectItem>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Crítica">Crítica</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formServiceDesk.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resumo</FormLabel>
                <Input
                  type="text"
                  required
                  placeholder=""
                  disabled
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formServiceDesk.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Sistema">Sistema</SelectItem>
                    <SelectItem value="Contabilidade">Contabilidade</SelectItem>
                    <SelectItem value="TI - Técnico">TI - Técnico</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formServiceDesk.control}
            name="item"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item da base</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Equipamento">Equipamento</SelectItem>
                    <SelectItem value="Whatsapp">Whatsapp</SelectItem>
                    <SelectItem value="Pagamentos">Pagamentos</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formServiceDesk.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Danificado">Danificado</SelectItem>
                    <SelectItem value="Acesso">Acesso</SelectItem>
                    <SelectItem value="Atraso de pagamento">
                      Atraso de pagamento
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            {isLoading ? (
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Criando...
              </Button>
            ) : (
              <Button type="submit">Criar</Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};

export default ServiceDeskForm;
