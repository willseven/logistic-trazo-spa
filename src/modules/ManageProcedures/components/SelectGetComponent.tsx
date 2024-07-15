import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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

interface SelectGetComponentProps {
    field: FieldType;
    handleInputChange: (name: string, value: any) => void;
  }
  
const SelectGetComponent = ({
    field,
    handleInputChange,
  }: SelectGetComponentProps) => {
    const [selectedOption, setSelectedOption] = useState("");
    const token = localStorage.getItem("token");
    const { data, isLoading, isError, error, refetch } = useQuery<any[]>({
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
  
    if (isLoading) {
      return <div>Cargando opciones</div>;
    }
  
    if (isError) {
      return <div>Error al cargar: {error.message}</div>;
    }
    const handleSelectChange = (value: string) => {
        // console.log(value)
        setSelectedOption(value);
      };
    return (
      <Select value={selectedOption} onValueChange={handleSelectChange}>
        <SelectTrigger>
          <SelectValue placeholder={`${field.label}`} />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup >

          {data?.map((option) => (
              <SelectItem key={option.id} value={option.name}>
              {option.name}
            </SelectItem>
          ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };
  

export default SelectGetComponent;  