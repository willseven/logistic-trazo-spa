"use client";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Menu } from "@/lib/types";
import { Pencil } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editMenu } from "@/lib/data";
import { toast } from "sonner";

const editMenuSchema = z.object({
  id: z.number(),
  name: z.string(),
  label: z.string(),
});

export type EditMenu = z.infer<typeof editMenuSchema>;

export default function EditMenu({ menu }: { menu: Menu }) {
  const editMenuForm = useForm({
    resolver: zodResolver(editMenuSchema),
    defaultValues: {
      id: menu.id,
      name: menu.name,
      label: menu.label,
    },
  });

  const queryClient = useQueryClient()

  const editMenuMutation = useMutation({
    mutationFn: editMenu,
    onError: (error) => {
      console.log(error)
      toast.error("Hubo un error al editar el menu")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["Menus"]})
      toast.success("Menu editado correctamente");
    }
  })

  function onSubmit(values: EditMenu) {
    editMenuMutation.mutate(values);
    editMenuForm.reset()
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...editMenuForm}>
            <form onSubmit={editMenuForm.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={editMenuForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="nombre" {...field} />
                    </FormControl>
                    <FormDescription>
                      Nombre clave del menu
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editMenuForm.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etiqueta</FormLabel>
                    <FormControl>
                      <Input placeholder="etiqueta" {...field} />
                    </FormControl>
                    <FormDescription>
                      Etiqueta del menu
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogClose>
                <Button type="submit">Guardar</Button>
              </DialogClose>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
