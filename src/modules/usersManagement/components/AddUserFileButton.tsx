"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FolderUp } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

const MAX_FILE_SIZE = 500000;
const userFileSchema = z.object({
  Name: z.string(),
  File: z.instanceof(File).refine((file) => file.size < MAX_FILE_SIZE, {
    message: "Tu archivo debe pesar menos de 5MB",
  }),
});

type UserFileSchema = z.infer<typeof userFileSchema>;

export default function AddUserFileButton({ id }: { id: string }) {
  const addUserFileForm = useForm<UserFileSchema>({
    resolver: zodResolver(userFileSchema),
    defaultValues: {
      Name: "",
      File: undefined,
    },
  });

  console.log(addUserFileForm.formState.errors);

  function onSubmit(values: UserFileSchema) {
    console.log(values);
    const userFileFormData = new FormData();

    userFileFormData.append("Name", values.Name);
    userFileFormData.append("File", values.File);
    userFileFormData.append("originalName", values.File.name);
    userFileFormData.append("Type", values.File.type);
    userFileFormData.append("UserId", id);
    //Name: string, File: blob, originalName: string, Type: string, UserId: string
    addUserFileMutation.mutate(userFileFormData);
  }

  const addUserFileMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post("/files", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="icon">
          <FolderUp className="h-4 w-4" />
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
          <Form {...addUserFileForm}>
            <form
              onSubmit={addUserFileForm.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={addUserFileForm.control}
                name="Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Archivo</FormLabel>
                    <FormControl>
                      <Input placeholder="nombre" {...field} />
                    </FormControl>
                    <FormDescription>El nombre del archivo</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addUserFileForm.control}
                name="File"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Adjuntar un Archivo</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        type="file"
                        onChange={(event) =>
                          onChange(event.target.files && event.target.files[0])
                        }
                      />
                    </FormControl>
                    <FormDescription>El archivo</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
