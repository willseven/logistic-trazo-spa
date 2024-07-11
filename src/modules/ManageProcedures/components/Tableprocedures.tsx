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

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { columnsMAnageProcedure } from './columnsManageProcedures';

import { useState, useEffect } from 'react';
import { IManageProcedure } from '../interface/manageprocedure';
import NewCotizacion from './newCotizacion';

export const TableProcedure = (props: { data: IManageProcedure[]}) => {
  const { data } = props;
  const columns = columnsMAnageProcedure;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterValue, setFilterValue] = useState("");
  const [filterColumn, setFilterColumn] = useState("companyName");

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
      sorting
    },
    debugTable: true,
  });
  useEffect(() => {
    if (filterColumn === "all") {
      const filterColumns = ["companyName", "initialDate", "stepDetail", "customsClearance"];
      const filters = filterColumns.map(column => ({ id: column, value: filterValue }));
      setColumnFilters(filters);
    } else {
      setColumnFilters([{ id: filterColumn, value: filterValue }]);
    }
  }, [filterValue, filterColumn]);

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
              <SelectItem value="companyName">Cliente</SelectItem>
              <SelectItem value="initialDate">Fecha de inicio</SelectItem>
              <SelectItem value="stepDetail">Paso Actual</SelectItem>
              <SelectItem value="customsClearance">Aduana</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
    
        <NewCotizacion/>
        {/* <Button asChild><Link href="/dashboard/userManagement/new">Crear Rol</Link></Button> */}
      </div>
      <div className="rounded-md border ">
        <Table>
          <TableHeader className="items-center">
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
      <div className="flex items-center justify-end space-x-2 py-4">
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
      </div>
    </div>
  );
};
