"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { TableUsers } from "@/modules/usersManagement/components/TableUsers";
import { IUser } from "@/modules/usersManagement/interface/users";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

const UserManagement = () => {
  let token: string | null = null;
  let id: string | null = null;

  if(typeof window !== "undefined"){
    token = localStorage.getItem("token");
    id = localStorage.getItem("id");
  }
  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 1,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["usersAll", page, pageSize],
    queryFn: async () => {
      const response = await api.get(`/users/ListUsers?userId=${id}&page=${page}&pageSize=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const paginationHeader = JSON.parse(response.headers.pagination);
      setPagination(paginationHeader);

      return response.data;
    },
    enabled: true,
    staleTime: 1000 * 60 * 10, // Volver a hacer fetch luego de 10 min
  });

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div>
      <h1 className="flex items-center justify-center font-bold text-xl">Gestión de Usuarios</h1>
      <section>
        <Button asChild><Link href="/dashboard/userManagement/new">Crear Usuario</Link></Button>
        <TableUsers 
          data={data} 
          pagination={pagination} 
          setPagination={setPage} 
        />
      </section>
    </div>
  );
};

export default UserManagement;
