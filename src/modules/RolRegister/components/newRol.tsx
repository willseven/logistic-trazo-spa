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
  label: z.string().min(2).max(20),
  menuList: z.array(
    z.object({
      id: z.number(),
    })
  ),
});
const token = localStorage.getItem("token");
type RegisterRolForm = z.infer<typeof registerRolSchema>;

const NewRol = () => {
  const registerRolForm = useForm<RegisterRolForm>({
    resolver: zodResolver(registerRolSchema),
    defaultValues: {
      name: "",
      label: "",
      menuList: [],
    },
  });
  const getRolesQuery = useQuery({
    queryKey: ["Rols"],
    queryFn: async (): Promise<Rol[]> => {
      const response = await api.get("/rol", {
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

  const newUserMutation :any = useMutation({
    mutationFn: async (data: RegisterRolForm) => {
      const response = await api.post("/rol", data, {
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

  if (getRolesQuery.isLoading || getRolesQuery.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Crear Rol</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Rol</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px]">
          <Form {...registerRolForm}>
            <form onSubmit={registerRolForm.handleSubmit(onSubmit)}>
              <FormField
                control={registerRolForm.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etiqueta</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Introduzca el nombre del menú"
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del rol</FormLabel>
                    <FormControl>
                      <Input placeholder="Introduzca el rol" {...field} />
                    </FormControl>
                    {/* <FormDescription>Tu nombre de usuario</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={registerRolForm.control}
                name="menuList"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Roles</FormLabel>
                      <FormDescription>
                        Selecciona los roles que quieres asignar al usuario
                      </FormDescription>
                    </div>
                    {roles!.map((role) => (
                      <FormField
                        key={role.id}
                        control={registerRolForm.control}
                        name="menuList"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={role.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value.some(
                                    (value) => value.id === role.id
                                  )}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          { ...role },
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value.id !== role.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {role.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Crear</Button>
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default NewRol;
