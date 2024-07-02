"use client"

import { DataTable } from "@/components/ui/data-table"
import { fetchCompanies } from "@/lib/data"
import { useQuery } from "@tanstack/react-query"
import { columns } from "./columns"

export default function ListCompanies() {

  const getCompaniesQuery = useQuery({
    queryKey: ["Companies"],
    queryFn: fetchCompanies
  })

  if (getCompaniesQuery.isLoading || getCompaniesQuery.isPending) {
    return <div>Cargando...</div>
  }

  return (
    <div>
      <DataTable columns={columns} data={getCompaniesQuery.data ?? []}/>
    </div>
  )
}
