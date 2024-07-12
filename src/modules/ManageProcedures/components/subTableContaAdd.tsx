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
  SortDirection
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
import { Trash2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpDown, ChevronDownIcon, ChevronUpIcon, Pencil } from "lucide-react"
import { api } from "@/lib/api";

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

interface SubTableContaAddProps {
  idcompany: number;
  field: FieldType;
  // handleInputChange: (name: string, value: any) => void;
}
interface datacontaadd {
    id: number,
    label: string,
    description: string,
    description2: string,
    observation:string,
    stringValue: string,
    numberValue: number,
    dataSetId: number,
    procedureId: number,
    recibo: boolean,
    creationDate: string
}
const SortedIcon = ({isSorted}: {isSorted: false | SortDirection}) => {
    if (isSorted === "asc"){
      return <ChevronUpIcon className=" h-4 w-4"/>;
    }
    if (isSorted === "desc"){
      return <ChevronDownIcon className=" h-4 w-4"/>;
    }
    return null;
  }

const SubTableContaAdd = ({ idcompany, field }: SubTableContaAddProps) => {
  const token = localStorage.getItem("token");
  const columns = columnscontaadd;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterValue, setFilterValue] = useState("");
  const [filterColumn, setFilterColumn] = useState("name");
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["tablecontaadd"],
    queryFn: async () => {
      const response = await api.get(
        `/dataSet/procedure/${idcompany}/field/${field.id}/subdata`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },

    enabled: true,
    staleTime: 1000 * 60 * 10, // Volver a hacer fetch luego de 10 min
  });
  useEffect(() => {
    refetch();
  }, [idcompany, refetch]);

  console.log(data);
  const table = useReactTable({
    data: data ?? [],
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
        {/* <div className="flex justify-between items-center py-4">
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
              </SelectGroup>
            </SelectContent>
          </Select> */}

          {/* <Button asChild><Link href="/dashboard/userManagement/new">Crear Rol</Link></Button> */}
        {/* </div>
         */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Sin resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div> */}
      </div>
    );
};

export default SubTableContaAdd;

const columnscontaadd: ColumnDef<datacontaadd>[] = [
  // {
  //   accessorKey:"id" ,
  //   header:"id" ,
  // },
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Campo
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Proforma
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "description2",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Planilla
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "observation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Diferencia
          <SortedIcon isSorted={column.getIsSorted()} />
        </Button>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="flex gap-2 justify-center">
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
