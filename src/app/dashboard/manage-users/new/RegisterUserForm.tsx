"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { api } from "@/lib/api";
import { useUserStore } from "@/lib/store";
import { Rol } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const registerUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  name: z.string(),
  fatherLastName: z.string(),
  motherLastName: z.string(),
  rol: z.array(
    z.object({
      id: z.number(),
    })
  ),
  ci: z.string(),
  status: z.enum(["Activo", "Inactivo"]),
  phoneNumber: z.string(),
  cellphoneNumber: z.string(),
  city: z.enum([
    "Santa cruz",
    "La paz",
    "Cochabamba",
    "Sucre",
    "Oruro",
    "Tarija",
    "Beni",
    "Pando",
    "Potosi",
  ]),
});

type RegisterUserForm = z.infer<typeof registerUserSchema>;

export default function RegisterUserForm() {
  const { token } = useUserStore((state) => ({
    token: state.userResponse.token,
  }));

  const registerUserForm = useForm<RegisterUserForm>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      name: "",
      fatherLastName: "",
      motherLastName: "",
      ci: "",
      status: "Activo",
      phoneNumber: "",
      cellphoneNumber: "",
      city: "La paz",
      rol: [],
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

  //console.log(registerUserForm.formState.errors);

  const newUserMutation = useMutation({
    mutationFn: async (data: RegisterUserForm) => {
      const response = await api.post("/Auth/register", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    },
    onError: (error) => {
      console.log(error);
      toast.error("Hubo un error al crear el usuario")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["usersAll"]})
      toast.success("Usuario creado exitosamente");
      router.push('/dashboard/userManagement');
    }
  })

  function onSubmit(values: RegisterUserForm) {
    console.log(values);
    newUserMutation.mutate(values);
  }

  if (getRolesQuery.isLoading || getRolesQuery.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...registerUserForm}>
      <form onSubmit={registerUserForm.handleSubmit(onSubmit)}>
        <FormField
          control={registerUserForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de Usuario</FormLabel>
              <FormControl>
                <Input placeholder="nombre de usuario" {...field} />
              </FormControl>
              <FormDescription>Tu nombre de usuario</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerUserForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="Contraseña" {...field} />
              </FormControl>
              <FormDescription>La Contraseña del usuario</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerUserForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electronico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>Correo Electronico del Usuario</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerUserForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="nombre" {...field} />
              </FormControl>
              <FormDescription>Nombre del Usuario</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerUserForm.control}
          name="fatherLastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido Paterno</FormLabel>
              <FormControl>
                <Input placeholder="apellido paterno" {...field} />
              </FormControl>
              <FormDescription>Apellido Paterno del Usuario</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerUserForm.control}
          name="motherLastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido Materno</FormLabel>
              <FormControl>
                <Input placeholder="apellido materno" {...field} />
              </FormControl>
              <FormDescription>Apellido Materno del Usuario</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerUserForm.control}
          name="ci"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carnet de Identidad</FormLabel>
              <FormControl>
                <Input placeholder="carnet de identidad" {...field} />
              </FormControl>
              <FormDescription>Carnet de Identidad del Usuario</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerUserForm.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Seleccione el estado del usuario
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerUserForm.control}
          name="cellphoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero de celular</FormLabel>
              <FormControl>
                <Input placeholder="numero de celular" {...field} />
              </FormControl>
              <FormDescription>Numero de celular del Usuario</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerUserForm.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero de Telefono</FormLabel>
              <FormControl>
                <Input placeholder="numero de Telefono" {...field} />
              </FormControl>
              <FormDescription>Numero de Telefono del Usuario</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerUserForm.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ciudad</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una ciudad" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="La paz">La paz</SelectItem>
                  <SelectItem value="Santa cruz">Santa cruz</SelectItem>
                  <SelectItem value="Cochabamba">Cochabamba</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Seleccione la ciudad de residencia
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerUserForm.control}
          name="rol"
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
                  control={registerUserForm.control}
                  name="rol"
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
                                ? field.onChange([...field.value, { ...role }])
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
        <Button>Enviar</Button>
      </form>
    </Form>
  );
}
