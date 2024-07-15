"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { postMenu } from "@/lib/data";
import React, { Suspense } from 'react';

const newMenuSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  label: z.string().min(1, "La etiqueta es requerida"),
});

export type NewMenu = z.infer<typeof newMenuSchema>;

function CreateNewMenuForm() {
  const newMenuForm = useForm<NewMenu>({
    resolver: zodResolver(newMenuSchema),
    defaultValues: {
      name: "",
      label: "",
    }
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const newMenuMutation = useMutation({
    mutationFn: postMenu,
    onError: (error) => {
      console.log(error);
      toast.error("Hubo un error al crear el menú");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Menus"] });
      toast.success("Menú creado exitosamente");
      router.push('/dashboard/MenuRegister');
    }
  });

  function onSubmit(values: NewMenu) {
    console.log(values);
    newMenuMutation.mutate(values);
  }

  return (
    <Form {...newMenuForm}>
      <form onSubmit={newMenuForm.handleSubmit(onSubmit)}>
        <FormField
          control={newMenuForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormDescription>Nombre clave del Menú</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={newMenuForm.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Etiqueta</FormLabel>
              <FormControl>
                <Input placeholder="Etiqueta" {...field} />
              </FormControl>
              <FormDescription>Etiqueta del Menú</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateNewMenuForm />
    </Suspense>
  );
}
