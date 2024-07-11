"use client";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { columnsTarifa } from "./columnsTarifa";
import { ITarifa } from "../interface/tarifa";
import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import NewTarifa from "./newTarifa";


interface MatrizData {
  terrestre?: string;
  maritimo?: string;
  aereo?: string;
  multimodal?: string;
}

interface FieldWithData {
  key: string;
  value: string;
}

export const TableTarifa = (props: { data: ITarifa[] }) => {
  const { data } = props;
  const columns = columnsTarifa;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterValue, setFilterValue] = useState("");
  const [filterColumn, setFilterColumn] = useState("name");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    debugTable: true,
  });

  const processItemData = (item: any): FieldWithData[] => {
    let data: MatrizData = {};
  
    try {
      // Extrae y parsea los datos JSON de item.data
      data = JSON.parse(item.data || '{}'); // Usa '{}' como valor predeterminado si item.data es undefined o vacío
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // Retorna un array vacío si hay un error en el parseo
      return [];
    }
  
    // Define los campos de interés
    const fieldsToDisplay: (keyof MatrizData)[] = ['terrestre', 'maritimo', 'aereo', 'multimodal'];
    
    // Filtra los campos de interés que tienen datos
    const fieldsWithData = fieldsToDisplay
      .filter(field => data[field] && data[field] !== '')
      .map(field => ({
        key: field.charAt(0).toUpperCase() + field.slice(1), // Capitaliza la primera letra del campo
        value: data[field] || 'No disponible' // Usa un texto predeterminado si el valor está vacío
      }));
  
    return fieldsWithData;
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
    setColumnFilters([{ id: filterColumn, value: event.target.value }]);
  };

  const handleSelectChange = (value: string) => {
    setFilterColumn(value);
    setFilterValue("");
    setColumnFilters([]);
  };

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <Input
          className="max-w-sm"
          placeholder="Filtrar"
          value={filterValue}
          onChange={handleFilterChange}
        />
        <Select value={filterColumn} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtros" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filtros</SelectLabel>
              <SelectItem value="name">Nombre</SelectItem>
              <SelectItem value="origen">Origen</SelectItem>
              <SelectItem value="destino">Destino</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <NewTarifa />
        {/* <Button asChild><Link href="/dashboard/userManagement/new">Crear Rol</Link></Button> */}
      </div>
      <div className="container mx-auto p-4">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {data.map((item, index) => {
      const fieldsWithData = processItemData(item);
      
      return (
        <div key={index} className="rounded-md border border-black">
          <ResizablePanelGroup
            direction="horizontal"
            className="max-w-md rounded-lg border"
          >
            <ResizablePanel defaultSize={60}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={25}>
                  <div className="flex h-full items-center justify-center p-6 gap-2">
                    <span className="font-semibold">{`${item.name}`}</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75}>
                  <div className="flex flex-row h-full items-center justify-center p-6">
                    {fieldsWithData.map(({ key, value }) => (
                      <div key={key} className="mr-4">
                        <span className="font-semibold">{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</span> {value}
                      </div>
                    ))}
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={40}>
              <div className="flex flex-col gap-4 h-[200px] items-center justify-center p-6">
                <Button>
                  <FiEdit className="w-6 h-6 mr-2" /> Editar
                </Button>
                <Button>
                  <MdDelete className="w-6 h-6 mr-2" /> Eliminar
                </Button>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      );
    })}
  </div>
</div>
    </div>
  );
};
