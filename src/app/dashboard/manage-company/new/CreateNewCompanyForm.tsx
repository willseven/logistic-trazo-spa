// CreateNewCompanyForm.js
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { postCompany } from "@/lib/data";

const newCompanySchema = z.object({
  ci: z.string(),
  direccion: z.string(),
  email: z.string().email(),
  gps: z.string(),
  nit: z.string(),
  num: z.string().optional(),
  phone: z.string(),
  razonSocial: z.string(),
  categoria: z.enum(['AA', 'A', 'B', 'C']),
});

export type NewCompany = z.infer<typeof newCompanySchema>;

export default function CreateNewCompanyForm() {
  const newCompanyForm = useForm<NewCompany>({
    resolver: zodResolver(newCompanySchema),
    defaultValues: {
      ci: "",
      direccion: "",
      email: "",
      gps: "",
      nit: "",
      phone: "",
      razonSocial: "",
      categoria: undefined,
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const newCompanyMutation = useMutation({
    mutationFn: postCompany,
    onError: (error) => {
      console.log(error);
      toast.error("Hubo un error al crear la compañía");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Companies"] });
      toast.success("Compañía creada exitosamente");
      router.push('/dashboard/manage-company');
    },
  });

  function onSubmit(values: NewCompany) {
    console.log(values);
    newCompanyMutation.mutate(values);
  }

  return (
    <Form {...newCompanyForm}>
      <form onSubmit={newCompanyForm.handleSubmit(onSubmit)}>
        <FormField
          control={newCompanyForm.control}
          name="ci"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carnet de Identidad</FormLabel>
              <FormControl>
                <Input placeholder="Carnet de Identidad" {...field} />
              </FormControl>
              <FormDescription>Carnet de Identidad del Usuario</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={newCompanyForm.control}
          name="direccion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder="Dirección" {...field} />
              </FormControl>
              <FormDescription>Dirección de la Empresa</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={newCompanyForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Correo Electrónico" {...field} />
              </FormControl>
              <FormDescription>Correo Electrónico de la Empresa</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={newCompanyForm.control}
          name="gps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GPS</FormLabel>
              <FormControl>
                <Input placeholder="GPS" {...field} />
              </FormControl>
              <FormDescription>Coordenadas GPS de la Empresa</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={newCompanyForm.control}
          name="nit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIT</FormLabel>
              <FormControl>
                <Input placeholder="NIT" {...field} />
              </FormControl>
              <FormDescription>NIT de la Empresa</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={newCompanyForm.control}
          name="num"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Id de Compañía</FormLabel>
              <FormControl>
                <Input placeholder="Id" {...field} />
              </FormControl>
              <FormDescription>Id de la Empresa (opcional)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={newCompanyForm.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="Teléfono" {...field} />
              </FormControl>
              <FormDescription>Teléfono de la Empresa</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={newCompanyForm.control}
          name="razonSocial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razón Social</FormLabel>
              <FormControl>
                <Input placeholder="Razón Social" {...field} />
              </FormControl>
              <FormDescription>Razón Social de la Empresa</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={newCompanyForm.control}
          name="categoria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una categoría" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="AA">AA</SelectItem>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Seleccione la categoría de la Empresa
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
