"use client"

import { Button } from "@/components/ui/button"
import { CompanyResponse } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<CompanyResponse>[] = [
  {
    accessorKey: "razonSocial",
    header: "Compañia",
  },
  {
    accessorKey: "nit",
    header: "NIT",
  },
  {
    accessorKey: "categoria",
    header: "Categoria",
  },
  {
    accessorKey: "status",
    header: "Categoria",
  },
  {
    id: "actions",
    cell: ({row}) => {
      const company = row.original
      return (
        <Button>Otros</Button>
      )
    }
  }
]
