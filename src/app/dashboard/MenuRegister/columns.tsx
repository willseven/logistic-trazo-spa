"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<Menu>[] = [
  {
    accessorKey: "label",
    header: "Etiqueta",
  },
  {
    accessorKey: "name",
    header: "Nombre Clave",
  },
  {
    id: "actions",
    cell: ({row}) => {
      const menu = row.original
      return (
        <Button>Otros</Button>
      )
    }
  }
]
