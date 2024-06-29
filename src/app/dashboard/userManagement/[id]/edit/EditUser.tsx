"use client"

import { fetchUserById } from "@/lib/data";
import { useQuery } from "@tanstack/react-query"
import EditUserForm from "./EditUserForm";

export default function EditUser({id}: {id:string}) {

  const getSingleUserQuery = useQuery({
    queryKey: ["User", id],
    queryFn: () => fetchUserById(id)
  })

  if (getSingleUserQuery.isLoading || getSingleUserQuery.isPending) {
    return <div>Cargando...</div>
  }

  return (
    <EditUserForm userResponse={getSingleUserQuery.data!}/>
  )
}
