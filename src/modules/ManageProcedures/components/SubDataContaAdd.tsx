"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { api } from "@/lib/api";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { ChevronDownIcon } from "lucide-react";
import SubTableContaAdd from "./subTableContaAdd";


interface FieldType {
  id: number;
  fieldProcessStepId: number;
  order: number;
  name: string;
  initial: string;
  validate: boolean;
  tableDisplay: boolean;
  clientDisplay: boolean;
  lockEdition: boolean;
  type: string;
  label: string;
  unique: boolean;
  url: string;
  allowModification: boolean;
  format: string;
  autoGenerated: boolean;
  color: string;
  fatherFieldId: number | null;
  fatherField: string | null;
  dataSets: any[];
}

interface PayloadData {
  Description: string;
  Description2: string;
  Label: string;
  NumberValue: number;
  isNew: boolean;
  observation: number;
}

interface SubDataContaAddProps {
  idcompany: number;
  field: FieldType;
  handleInputChange: (name: string, value: any) => void;
}

const SubDataContaAdd = ({
  idcompany,
  field,
  handleInputChange,
}: SubDataContaAddProps) => {
  const [monto, setMonto] = useState("");
  const [query, setQuery] = useState("");
  const token = localStorage.getItem("token");

  const {
    data: optionsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<any[]>({
    queryKey: [field.url],
    queryFn: async () => {
      const response = await api.get(`Dropdown/${field.url}/options`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  const filteredOptions = useCallback(
    () =>
      optionsData?.filter((option) =>
        option.name.toLowerCase().includes(query.toLowerCase())
      ) ?? [],
    [optionsData, query]
  );

  const queryClient = useQueryClient();
  const newUserMutation = useMutation({
    mutationFn: async (data: PayloadData) => {
      await api.post(
        `/dataSet/procedure/${idcompany}/field/${field.id}/subdata`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onError: (error) => {
      console.log(error);
      toast.error("Hubo un error al crear");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tablecontaadd"] });
      toast.success("Añadido");
    },
  });

  const newOptionMutation = useMutation({
    mutationFn: async (name: string) => {
      await api.post(
        `Dropdown/Option`,
        {
          DropdownListLabel: field.url,
          Name: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onError: (error) => {
      console.log(error);
      toast.error("Hubo un error al crear la nueva opción");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [field.url] });
      toast.success("Nueva opción añadida");
      refetch();
    },
  });

  const handleSave = async () => {
    const existingOption = optionsData?.find((option) => option.name === query);
    if (!existingOption) {
        await newOptionMutation.mutateAsync(query);
      }
    const payload = {
      Description: monto,
      Description2: monto,
      Label: query, 
      NumberValue: 0,
      isNew: !existingOption, 
      observation: 0,
    };
    newUserMutation.mutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [field.url] }); 
          toast.success("Añadido");
        },
      });
  };

  if (isLoading) {
    return <div>Cargando opciones...</div>;
  }

  if (isError) {
    return <div>Error al cargar: {error.message}</div>;
  }

  return (
    <div className="bg-gray-100 p-10 rounded-md">
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              placeholder={field.label}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full"
            />
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 " />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput
              placeholder="Buscar..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              {filteredOptions().length > 0 ? (
                filteredOptions().map((option) => (
                  <CommandItem key={option.id} onSelect={() => setQuery(option.name)}>
                    {option.name}
                  </CommandItem>
                ))
              ) : (
                <CommandEmpty>No hay opciones disponibles</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        type="text"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        placeholder="Monto"
        className="mt-2"
      />
      <Button onClick={handleSave} className="mt-2">
        Guardar
      </Button>
      <div>
       <SubTableContaAdd idcompany={idcompany} field={field}/>
      </div>
    </div>

  );
};

export default SubDataContaAdd;
