"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store";
import { UserResponse } from "@/lib/types";
import { api } from "@/lib/api";
import Image from "next/image";

const loginFormSchema = z.object({
  usernameOrEmail: z.string(),
  password: z.string(),
});

type LoginForm = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { setUserResponse } = useUserStore();
  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginForm) {
    console.log(values);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/login`,
        values
      );
      const user: UserResponse = response.data;
      const id = user.user.id;
      console.log(user.rols);

      //poner la store

      useUserStore.getState().setUserResponse(user);
      useUserStore.getState().setRoles(user.rols);
      localStorage.setItem("token", user.token);
      localStorage.setItem("id", id.toString());
      const firstRole = user.rols[0];
      useUserStore.getState().setCurrentRole(firstRole);

      const roleMenuResponse = await api.get(`/Rol/${firstRole.id}/Menu`, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Ejemplo de un header adicional
        },
      });

      useUserStore.getState().setMenuList(roleMenuResponse.data.menuList);
      // router.push(`../dashboard/${roleMenuResponse.data.menuList[0].name}`);
      router.push(`../cards`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-primary rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary-foreground">
          Trazo Logistico
        </h1>
        <div>
          <Image src="/images/noxun.jpg" width={200} height={100} alt="logo" />
        </div>
      </div>
      <Form {...loginForm}>
        <form className="space-y-4" onSubmit={loginForm.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={loginForm.control}
              name="usernameOrEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-foreground">
                    Nombre de Usuario
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-primary-foreground text-primary rounded-md"
                      placeholder="Introduzca su nombre de usuario"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Su nombre de usuario</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-foreground">
                    Contraseña
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-primary-foreground text-primary rounded-md"
                      type="password"
                      placeholder="Introduzca su nombre contraseña"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Su contraseña</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="w-full bg-primary-foreground text-primary hover:bg-accent hover:text-accent-foreground"
            type="submit"
          >
            Ingresar
          </Button>
        </form>
      </Form>
    </div>
  );
}

function MountainIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
