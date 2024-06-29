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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRoles } from "@/hooks/useRoles";
import { api } from "@/lib/api";
import { useUserStore } from "@/lib/store";
import { UpdateUserResponse } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const updateUserSchema = z.object({
  id: z.number(),
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
  accountNumber: z.string().optional(),
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

type UpdateUserForm = z.infer<typeof updateUserSchema>;

export default function EditUserForm({
  userResponse,
}: {
  userResponse: UpdateUserResponse;
}) {

  const { token } = useUserStore((state) => ({
    token: state.userResponse.token,
  }));

  const updateUserForm = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: userResponse.userToReturn.id,
      username: userResponse.userToReturn.username,
      password: "",
      email: userResponse.userToReturn.email,
      name: userResponse.userToReturn.name,
      fatherLastName: userResponse.userToReturn.fatherLastName,
      motherLastName: userResponse.userToReturn.motherLastName,
      ci: userResponse.userToReturn.ci,
      status: userResponse.userToReturn.status,
      phoneNumber: userResponse.userToReturn.phoneNumber,
      cellphoneNumber: userResponse.userToReturn.cellphoneNumber,
      city: userResponse.userToReturn.city,
      //accountNumber: userResponse.userToReturn.accountNumber,
      rol: userResponse.rolsUserToReturn,
    },
  });

  const getRolesQuery = useRoles();
  const roles = getRolesQuery.data;
  const queryClient = useQueryClient();
  const router = useRouter();

  const updateUserMutation = useMutation({
    mutationFn: async (data: UpdateUserForm) => {
      const response = await api.put(`/Users/${data.id}/UpdateUser`,data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    },
    onError: (error) => {
      console.log(error)
      toast.error("Hubo un error al actualizar el usuario")
    },
    onSuccess: () => {
      toast.success("Usuario actualizado correctamente");
      queryClient.invalidateQueries({queryKey: ["usersAll"]})
      router.push("/dashboard/userManagement")
    },
  });

  function onSubmit(values: UpdateUserForm) {
    console.log(values);
    updateUserMutation.mutate(values)
  }

  console.log(updateUserForm.formState.errors)

  if (getRolesQuery.isLoading || getRolesQuery.isPending) {
    return <div>Cargando...</div>;
  }

  return (
    <Form {...updateUserForm}>
      <form onSubmit={updateUserForm.handleSubmit(onSubmit)}>
        <FormField
          control={updateUserForm.control}
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
          control={updateUserForm.control}
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
          control={updateUserForm.control}
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
          control={updateUserForm.control}
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
          control={updateUserForm.control}
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
          control={updateUserForm.control}
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
          control={updateUserForm.control}
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
          control={updateUserForm.control}
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
          control={updateUserForm.control}
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
          control={updateUserForm.control}
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
          control={updateUserForm.control}
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
          control={updateUserForm.control}
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
                  control={updateUserForm.control}
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
