"use client";
import { Suspense, useState } from "react";
import { api } from "@/lib/api";
import { TableUsers } from "@/modules/usersManagement/components/TableUsers";
import { useQuery } from "@tanstack/react-query";

const ManageUsersComponent = () => {
  let token: string | null = null;
  let id: string | null = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    id = localStorage.getItem("id");
  }

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 1,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["usersAll", pagination],
    queryFn: async () => {
      const response = await api.get(
        `/users/ListUsers?userId=${id}&page=${pagination.currentPage}&pageSize=${pagination.itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const paginationHeader = JSON.parse(response.headers.pagination);
      setPagination((prev) => ({ ...prev, ...paginationHeader }));

      return response.data;
    },
    enabled: true,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div>
      <h1 className=" flex items-center justify-center font-bold text-xl text-primary">Gestión de Usuarios</h1>
      <section>
        <TableUsers data={data ?? []} pagination={pagination} setPagination={setPagination} />
      </section>
    </div>
  );
};

const ManageUsers = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ManageUsersComponent />
    </Suspense>
  );
};

export default ManageUsers;
