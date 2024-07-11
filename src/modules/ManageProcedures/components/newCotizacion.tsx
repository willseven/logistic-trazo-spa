"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Company } from "@/lib/types";

interface ProcedureType {
  id: number;
  name: string;
}

const registerMatrizSchema = z.object({
    procedureType: z.string().nonempty("Debe seleccionar un tipo de procedimiento"),
    company: z.string().nonempty("Debe seleccionar una compañía"),
  });

//const token = localStorage.getItem("token");
type RegisterMatrizForm = z.infer<typeof registerMatrizSchema>;

const NewCotizacion = () => {
  let token: string | null = null;
  let id: string | null = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    id = localStorage.getItem("id");
  }

  const {
    data: procedureTypesData,
    isLoading: isLoadingProcedureTypes,
    isError: isErrorProcedureTypes,
    error: errorProcedureTypes,
  } = useQuery<ProcedureType[]>({
    queryKey: ["procedureTypes"],
    queryFn: async () => {
      const response = await api.get(`procedureType`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 10, // Volver a hacer fetch luego de 10 min
  });


  const {
    data: companiesData,
    isLoading: isLoadingCompanies,
    isError: isErrorCompanies,
    error: errorCompanies,
  } = useQuery<Company[]>({
    queryKey: ["allCompanies"],
    queryFn: async () => {
      const response = await api.get(`company/getallcompanies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 10, // Volver a hacer fetch luego de 10 min
  });

  const registerMatrizForm = useForm<RegisterMatrizForm>({
    resolver: zodResolver(registerMatrizSchema),
    defaultValues: {
      procedureType: "",
      company: "",
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const newUserMutation: any = useMutation({
    mutationFn: async (data: RegisterMatrizForm) => {
      const response = await api.post("/procedure", data, {
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
      queryClient.invalidateQueries({ queryKey: ["stepprocedure"] });
      toast.success("Cotización creada exitosamente");
      router.refresh();
    },
  });

  function onSubmit(values: RegisterMatrizForm) {
    const { procedureType, company } = values;
    newUserMutation.mutate({
        ProcedureTypeId: procedureTypesData?.find(pt => pt.name === procedureType)?.id,
      CompanyId
: companiesData?.find(c => c.razonSocial === company)?.id,
      btnSecondary: false
    });
  }

  if (isLoadingProcedureTypes || isLoadingCompanies) {
    return <div>Loading...</div>;
  }

  if (isErrorProcedureTypes || isErrorCompanies) {
    return <div>Error loading data</div>;
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
        <ScrollArea className="h-[200px]">
          <form onSubmit={registerMatrizForm.handleSubmit(onSubmit)}>
            <Form {...registerMatrizForm}>
              <FormField
                control={registerMatrizForm.control}
                name="procedureType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Procedimiento</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo de procedimiento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Procedimientos</SelectLabel>
                            {procedureTypesData?.map((procedureType) => (
                              <SelectItem key={procedureType.id} value={procedureType.name}>
                                {procedureType.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerMatrizForm.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compañía</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una compañía" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Compañías</SelectLabel>
                            {companiesData?.map((company) => (
                              <SelectItem key={company.id} value={company.razonSocial}>
                                {company.razonSocial}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-2 flex justify-end">
                <Button type="submit">Guardar</Button>
              </div>
            </Form>
          </form>
        </ScrollArea>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );

};
export default NewCotizacion;
