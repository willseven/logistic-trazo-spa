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

const loginFormSchema = z.object({
  usernameOrEmail: z.string(),
  password: z.string(),
});

type LoginForm = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const router = useRouter();
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
      const user = response.data;
      //console.log(response.data);
      //poner la store
      localStorage.setItem("token", user.token);
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="border p-5 rounded-lg">
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)}>
          <FormField
            control={loginForm.control}
            name="usernameOrEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de Usuario</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Introduzca su nombre de usuario"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Su nombre de usuario</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Introduzca su nombre contraseña"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Su contraseña</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Ingresar</Button>
        </form>
      </Form>
    </div>
  );
}
