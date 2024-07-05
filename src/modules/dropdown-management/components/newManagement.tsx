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
import { Rol } from "@/lib/types";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

export const registerRolSchema = z.object({
  name: z.string().min(2).max(20),
  description: z.string().min(2).max(20),
  urlLabel: z.string().min(2).max(20),
  category: z.string().min(2).max(20),
  
});
//const token = localStorage.getItem("token");
type RegisterRolForm = z.infer<typeof registerRolSchema>;

const NewManagement = () => {

  let token: string | null = null;
  let id: string | null = null;

  if(typeof window !== "undefined"){
    token = localStorage.getItem("token");
    id = localStorage.getItem("id");
  }

  const registerRolForm = useForm<RegisterRolForm>({
    resolver: zodResolver(registerRolSchema),
    defaultValues: {
        name:"",
        description:"",
        urlLabel:"",
        category:""
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const newUserMutation :any = useMutation({
    mutationFn: async (data: RegisterRolForm) => {
      const response = await api.post("/rol", data, {//direccionar post
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Hubo un error al crear el rol");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Rols"] });
      toast.success("Rol creado exitosamente");
      router.push("/dashboard/RolRegister");
    },
  });

  function onSubmit(values: RegisterRolForm) {
    console.log(values);
    newUserMutation.mutate(values);
  }



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Crear Rol</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Rol</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px]">
          <Form {...registerRolForm}>
            <form onSubmit={registerRolForm.handleSubmit(onSubmit)}>
              <FormField
                control={registerRolForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la lista</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Introduzca su nombre de la lista"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>Tu nombre de usuario</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerRolForm.control}
                name="urlLabel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Palabra clave</FormLabel>
                    <FormControl>
                      <Input placeholder="Introduzca una palabra clave" {...field} />
                    </FormControl>
                    {/* <FormDescription>Tu nombre de usuario</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerRolForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <FormControl>
                      <Input placeholder="Introduzca una categoría" {...field} />
                    </FormControl>
                    {/* <FormDescription>Tu nombre de usuario</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerRolForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input placeholder="Introduzca la descripción de la lista" {...field} />
                    </FormControl>
                    {/* <FormDescription>Tu nombre de usuario</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-2 flex justify-end" >

              <Button  type="submit">Crear</Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default NewManagement;
