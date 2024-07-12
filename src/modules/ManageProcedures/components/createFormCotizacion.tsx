"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectGetComponent from "./SelectGetComponent";
import SubDataContaAdd from "./SubDataContaAdd";
import { CalendarPick } from "./calendarpick";

interface ProcedureType {
  id: number;
  name: string;
  step: number;
  pending: number;
  procedureId: number;
  optional: boolean;
  emailCompany: string;
  procedureNumber: number;
  fields: FieldType[];
}

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

let token: string | null = null;

if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}
const CreateFormCotizacion = ({ idcompany }: { idcompany: number }) => {

  const { data, isLoading, isError, error, refetch } = useQuery<ProcedureType>({
    queryKey: ["procedure", idcompany],
    queryFn: async () => {
      const response = await api.get(
        `processstep/96/procedure/${idcompany}?type=2`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    enabled: false,
  });

  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});

  useEffect(() => {
 
      refetch();
   
  }, [idcompany, refetch]);

  const handleInputChange = (name: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formValues);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div >

    <form onSubmit={handleSubmit}>
      <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      
      {data?.fields.map((field) => (
        <div key={field.id} className={`mb-4 ${field.type === 'subDataContaAdd' ? 'col-span-full' : ''}`}>
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          {field.type === "requestSerialNumber" && (
            <div className="mt-1 p-2 text-xl px-3 bg-gray-50">{`${field.initial}`} </div>
          )}
          {field.type === "text" && (
            <Input
              type="text"
              value={formValues[field.name] || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
            />
          )}
          {field.type === "date" && (
            <CalendarPick/>
          )}
          {field.type === "selectGet" && (
            <SelectGetComponent
              field={field}
              handleInputChange={handleInputChange}
              
            />
          )}
          {field.type === "subDataContaAdd" && (
            <SubDataContaAdd idcompany={idcompany} field={field} handleInputChange={handleInputChange} />
          )}
        </div>
      ))}
      </div>
      <Button type="submit">Guardar</Button>
    </form>
    </div>
  );
};


export default CreateFormCotizacion;

