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
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Procedure } from '../../../lib/types';

export const registerProceduresSchema = z.object({
  name: z.string().min(2).max(50),

});
//const token = localStorage.getItem("token");
type RegisterProceduresForm = z.infer<typeof registerProceduresSchema>;

const NewProcedures = () => {

  let token: string | null = null;
  let id: string | null = null;

  if(typeof window !== "undefined"){
    token = localStorage.getItem("token");
    id = localStorage.getItem("id");
  }

  const registerProceduresForm = useForm<RegisterProceduresForm>({
    resolver: zodResolver(registerProceduresSchema),
    defaultValues: {
      name: ""
    },
  });
  const getProceduresQuery = useQuery({
    queryKey: ["Rols"],
    queryFn: async (): Promise<Procedure[]> => {
      const response = await api.get("/rol", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  const procedures = getProceduresQuery.data;
  const queryClient = useQueryClient();
  const router = useRouter();

  const newUserMutation :any = useMutation({
    mutationFn: async (data: RegisterProceduresForm) => {
      const response = await api.post("/procedureType", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Hubo un error al crear el procedimiento");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Rols"] });
      toast.success("Procedimiento creado exitosamente");
      
    },
  });

  function onSubmit(values: RegisterProceduresForm) {
    console.log(values);
    newUserMutation.mutate(values);
  }

  if (getProceduresQuery.isLoading || getProceduresQuery.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Crear Procedimiento</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Procedimiento</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[170px]">
          <Form {...registerProceduresForm}>
            <form onSubmit={registerProceduresForm.handleSubmit(onSubmit)}>
              
              
              <FormField
                control={registerProceduresForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Procedimiento</FormLabel>
                    <FormControl>
                      <Input placeholder="Introduzca el nombre del menú" {...field} />
                    </FormControl>
                    {/* <FormDescription>Tu nombre de usuario</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              
              
              <div className="mt-4 flex justify-end" >

              <Button  type="submit">Crear Procedimiento</Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default NewProcedures;
