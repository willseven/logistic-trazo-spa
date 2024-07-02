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

import { useState, useEffect } from 'react';
import { columnsProcedures } from "./ColumnsProcedures";
import { IProcedure } from '../interface/procedures';

export const TableProcedures = (props: { data: IProcedure[], pagination: any, setPagination: (pagination: any) => void }) => {
  const { data, pagination, setPagination } = props;
  const columns = columnsProcedures;
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
    pageCount: pagination.totalPages,
    state: {
      pagination: {
        pageIndex: pagination.currentPage - 1, 
        pageSize: pagination.itemsPerPage,
      },
      sorting,
      columnFilters,
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({
          pageIndex: pagination.currentPage - 1,
          pageSize: pagination.itemsPerPage,
        });
        setPagination({
          ...pagination,
          currentPage: newState.pageIndex + 1,
          itemsPerPage: newState.pageSize,
        });
      } else {
        setPagination({
          ...pagination,
          currentPage: updater.pageIndex + 1,
          itemsPerPage: updater.pageSize,
        });
      }
    },
    manualPagination: true,
    debugTable: true,
  });

  useEffect(() => {
    if (filterColumn === "all") {
      const filterColumns = ["name"];
      const filters = filterColumns.map(column => ({ id: column, value: filterValue }));
      setColumnFilters(filters);
    } else {
      setColumnFilters([{ id: filterColumn, value: filterValue }]);
    }
  }, [filterValue, filterColumn]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
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
              <SelectItem value="name">Procedimientos</SelectItem>

            </SelectGroup>
          </SelectContent>
        </Select>
        <Button asChild><Link href="/dashboard/userManagement/new">Crear Procedimiento</Link></Button>
      </div>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center gap-2 items-center p-4">
        <Button 
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'Primero'}
        </Button>
        <Button 
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'Anterior'}
        </Button>
        <span className="text-black">
          {pagination.currentPage} de {table.getPageCount()}
        </span>
        <Button 
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'Siguiente'}
        </Button>
        <Button 
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'Último'}
        </Button>
        <Select value={pagination.itemsPerPage.toString()} onValueChange={(value) => table.setPageSize(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={`Mostrar ${pagination.itemsPerPage}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Paginación</SelectLabel>
              {[10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  Mostrar {pageSize}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
