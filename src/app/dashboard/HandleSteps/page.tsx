"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ListStep } from "@/modules/HandleSteps/components/ListStep";

interface ProcedureType {
  id: number;
  name: string;
}

const HandleSteps = () => {

  let token: string | null = null;
  let id: string | null = null;

  if(typeof window !== "undefined"){
    token = localStorage.getItem("token");
    id = localStorage.getItem("id");
  }
  const [procedureTypeId, setProcedureTypeId] = useState<number | null>(null);

  const { data, isLoading, isError, error } = useQuery<ProcedureType[]>({
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

  useEffect(() => {
    if (data && data.length > 0) {
      setProcedureTypeId(data[0].id);
    }
  }, [data]);

  return (
    <>
      <div className="flex  items-center gap-2">
        <div>Lista de pasos para:</div>
        <Select
          value={procedureTypeId?.toString() || ""}
          onValueChange={(value) => {
            setProcedureTypeId(Number(value));
            console.log(value);
          }}
        >
          <SelectTrigger className="bg-secondary border w-2/3 md:w-1/3 text-prim text-md rounded-lg block px-2.5 py-2"  hideIcon>
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Pasos</SelectLabel>
              {data?.map((value) => (
                <SelectItem key={value.id} value={String(value.id)}>
                  {value.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {procedureTypeId && 
      <ListStep procedureTypeId={procedureTypeId} />
      }
    </>
  );
};

export default HandleSteps;
