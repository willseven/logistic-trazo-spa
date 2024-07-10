"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const registerMatrizSchema = z.object({
  origen: z.string().min(2).max(20),
  destino: z.string().min(2).max(20),
  terrestre: z.string().optional(),
  maritimo: z.string().optional(),
  aereo: z.string().optional(),
  lcl: z.string().optional(),
}).refine(data => data.terrestre || data.maritimo || data.aereo || data.lcl, {
  message: "Debe llenar al menos uno de los campos: Terrestre, Marítimo, Aéreo o LCL",
  path: ["terrestre"], // Esto muestra el mensaje en el campo "terrestre", pero puede ser cualquier otro
});
//const token = localStorage.getItem("token");
type RegisterMatrizForm = z.infer<typeof registerMatrizSchema>;

const NewTarifa = () => {
  let token: string | null = null;
  let id: string | null = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    id = localStorage.getItem("id");
  }

  const registerMatrizForm = useForm<RegisterMatrizForm>({
    resolver: zodResolver(registerMatrizSchema),
    defaultValues: {

      origen: "",
      destino: "",
      terrestre: "",  
      maritimo: "",  
      aereo: "",    
      lcl: "", 
    },
  });

  const getRolesQuery = useQuery({
    queryKey: ["matriz"],
    queryFn: async () => {
      const response = await api.get("/Dropdown/matrizCotizaciones/options", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  const roles = getRolesQuery.data;
  const queryClient = useQueryClient();
  const router = useRouter();

  const newUserMutation: any = useMutation({
    mutationFn: async (data: RegisterMatrizForm) => {
      const response = await api.post("/Dropdown/Option", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Hubo un error al crear la cotizacion");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matriz"] });
      toast.success("Cotización creada exitosamente");
      router.push("/dashboard/matrizCotizaciones");
    },
  });

  function onSubmit(values: RegisterMatrizForm) {
    // console.log("Valores del formulario:", values);
    const { origen, destino, terrestre, maritimo, aereo, lcl } = values;
    const formattedData = {
      name: `${origen} a ${destino}`,
      data: JSON.stringify({
        origen, 
        destino,
        terrestre,
        maritimo,
        aereo,
        lcl,
      }),
      type: "cotizacion",
      DropdownListLabel:"matrizCotizaciones"
    };
    console.log("Datos formateados:", formattedData);
    newUserMutation.mutate(formattedData);
  }

  if (getRolesQuery.isLoading || getRolesQuery.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Crear nueva cotización</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear nueva Cotización</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px]">
          <form onSubmit={registerMatrizForm.handleSubmit(onSubmit)}>
            <Form {...registerMatrizForm}>
              <FormField
                control={registerMatrizForm.control}
                name="origen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origen</FormLabel>
                    <FormControl>
                      <Input placeholder="Introduzca el Origen" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerMatrizForm.control}
                name="destino"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destino</FormLabel>
                    <FormControl>
                      <Input placeholder="Introduzca el Destino" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerMatrizForm.control}
                name="terrestre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Costo Terrestre</FormLabel>
                    <FormControl>
                      <Input placeholder="Costo terrestre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerMatrizForm.control}
                name="maritimo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Costo Marítimo</FormLabel>
                    <FormControl>
                      <Input placeholder="Costo marítimo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerMatrizForm.control}
                name="aereo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Costo Aéreo</FormLabel>
                    <FormControl>
                      <Input placeholder="Costo Aéreo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerMatrizForm.control}
                name="lcl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Costo LCL</FormLabel>
                    <FormControl>
                      <Input placeholder="Costo LCL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-2 flex justify-end">
                <Button type="submit">Crear nueva cotización</Button>
              </div>
            </Form>
          </form>
        </ScrollArea>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default NewTarifa;
