"use client"

import { DataTable } from "@/components/ui/data-table"

import { useQuery } from "@tanstack/react-query"
import { fetchMenus } from "@/lib/data"
import { columns } from "./columns"

export default function ListMenus() {

  const getMenusQuery = useQuery({
    queryKey: ["Menus"],
    queryFn: fetchMenus
  })

  if (getMenusQuery.isLoading || getMenusQuery.isPending) {
    return <div>Cargando...</div>
  }

  return (
    <DataTable columns={columns} data={getMenusQuery.data ?? []}/>
  )
}
