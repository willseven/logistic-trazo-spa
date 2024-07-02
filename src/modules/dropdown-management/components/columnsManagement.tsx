import { ColumnDef, SortDirection } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { ArrowUpDown, ChevronDownIcon, ChevronUpIcon, Pencil } from "lucide-react"
import { Trash2 } from "lucide-react"
import { FolderUp  } from "lucide-react";
import { IManagement } from '../interface/managements';

const SortedIcon = ({isSorted}: {isSorted: false | SortDirection}) => {
  if (isSorted === "asc"){
    return <ChevronUpIcon className=" h-4 w-4"/>;
  }
  if (isSorted === "desc"){
    return <ChevronDownIcon className=" h-4 w-4"/>;
  }
  return null;
}

export const columnsManagement: ColumnDef<IManagement>[] = [
    // {
    //   accessorKey:"id" ,
    //   header:"id" ,
    // },
    {
      accessorKey:"name" ,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre
            <SortedIcon isSorted={column.getIsSorted()}/>
          </Button>
        )
      },
    },
    {
      accessorKey:"category" ,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Categoria
            <SortedIcon isSorted={column.getIsSorted()}/>
          </Button>
        )
      },
    },
    {
      accessorKey:"description" ,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Descripción
            <SortedIcon isSorted={column.getIsSorted()}/>
          </Button>
        )
      },
    },
    { 
      accessorKey:"actions" ,
      header:"Acciones" ,
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
  
        return (
        <div className="flex gap-2 justify-center">
            <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
        )
      },
    },
  ]
  

